import axios from "axios";
import fs from "fs";
import NodeCache from "node-cache";
import { generateGeminiContent } from "../services/googleservices.js";
import { getNutritionData } from "../services/ninjaServices.js";
import imageToBase64 from "../utils/imgconversion.js";
import getMimeType from "../utils/getmemetype.js";
import { parseGeminiJson } from "../utils/parseGeminiJson.js";
import {
  formatErrorResponse,
  logError,
  APIError,
  NetworkError,
  TimeoutError,
  RateLimitError,
  InvalidAPIKeyError,
} from "../utils/apiErrorHandler.js";

// Initialize cache with 24-hour TTL
const foodCache = new NodeCache({
  stdTTL: 86400,  // 24 hours in seconds
  checkperiod: 120  // Check for expired keys every 2 minutes
});

export const analyzeFood = async (req, res) => {
  let imagePath = null;

  try {
    const condition = req.body.condition; 
    const query = req.body.query;
    const existingFoodName = req.body.foodName;
    const ingredientsText = req.body.ingredientsText; // Added for Issue #60

    // Handle follow-up queries without image
    if (!req.file && !ingredientsText && query) {
      if (!existingFoodName) {
        return res.status(400).json({
          success: false,
          error: {
            message: "Food name is required for follow-up queries",
            code: "MISSING_FOOD_NAME",
          },
        });
      }

      const followUpPrompt = `
        Context: The user is asking about ${existingFoodName || "this food"}.
        Health Profile (Conditions): ${condition}
        User's Question: "${query}"
        
        Analyze if this is safe based on the entire health profile provided. 
        Consider potential risks or interactions for EACH condition listed.
        Output ONLY JSON:
        {
          "traffic_light": "green" | "yellow" | "red", 
          "verdict_title": "Follow-up Answer",
          "answer": "Direct answer to the user's question, accounting for all listed health conditions.",
        }
      `;

      try {
        const result = await generateGeminiContent(followUpPrompt);
        const responseText = result.response.candidates[0].content.parts[0].text;
        const parsedData = parseGeminiJson(responseText);
        return res.json({
          success: true,
          food_name: existingFoodName,
          ...parsedData,
        });
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Follow-up Gemini call failed");
          return res.status(error.statusCode).json(formatErrorResponse(error));
        }
        throw error;
      }
    }

    // Validation: Require either an image or manual ingredient text
    if (!req.file && !ingredientsText) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Please provide either a food image or a list of ingredients.",
          code: "MISSING_INPUT",
        },
      });
    }

    if (!condition) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Health profile is required for analysis.",
          code: "NO_CONDITION",
        },
      });
    }

    let foodName = ingredientsText ? "Manual Ingredient List" : "";
    let base64 = "";
    let mimeType = "";

    if (req.file) {
      imagePath = req.file.path;
      base64 = imageToBase64(imagePath);
      mimeType = getMimeType(imagePath);

      // Identify food or product in image
      try {
        const identify = await generateGeminiContent({
          contents: [
            {
              role: "user",
              parts: [
                { inlineData: { data: base64, mimeType } },
                { text: "Identify the food or product in this image. If it's a packaged food item or an ingredient label, output 'packaged_food'. Otherwise, output the specific dish name. Output ONLY the name." },
              ],
            },
          ],
        });
        foodName = identify.response.candidates[0].content.parts[0].text.trim();
      } catch (error) {
        if (error instanceof APIError) {
          logError(error, "[Analyze] Food identification failed");
          return res.status(error.statusCode).json(formatErrorResponse(error));
        }
        throw error;
      }
    }

    const cacheKey = `${(ingredientsText || foodName).toLowerCase()}_${condition.toLowerCase()}`;
    const cachedResult = foodCache.get(cacheKey);

    if (cachedResult) {
      console.log(`✅ Cache HIT for ${cacheKey}`);
      return res.json({ ...cachedResult, fromCache: true });
    }

    let nutritionData = {};
    if (foodName && foodName !== "packaged_food" && foodName !== "Manual Ingredient List") {
      try {
        nutritionData = await getNutritionData(foodName);
      } catch (error) {
        logError(error, "[Analyze] Nutrition data fetch failed");
      }
    }

    // Refined Prompt for Granular Ingredient Classification
    const analysisPrompt = `
      Context: User Health Profile: "${condition}".
      Target: ${ingredientsText ? "Analyze this list: " + ingredientsText : (foodName === "packaged_food" ? "Analyze the label in the image" : "Analyze the dish: " + foodName)}.
      ${nutritionData ? "Nutritional Data: " + JSON.stringify(nutritionData) : ""}

      CRITICAL INSTRUCTIONS:
      1. Extraction: Identify all ingredients. For dishes, estimate based on the name.
      2. Classification: Categorize EACH ingredient as "healthy", "risky", or "harmful" specifically regarding the user's conditions (${condition}).
      3. Traffic Light: Set "red" if any harmful ingredient is found, "yellow" if risky, and "green" only if entirely safe.
      4. Suggest 2-3 specific alternatives for this health profile.

      Output ONLY JSON:
      {
        "traffic_light": "green" | "yellow" | "red",
        "verdict_title": "Safety Breakdown",
        "ingredients_classification": {
          "healthy": [{"name": "string", "reason": "string"}],
          "risky": [{"name": "string", "reason": "string"}],
          "harmful": [{"name": "string", "reason": "string"}]
        },
        "reason": "Unified explanation of safety risks.",
        "suggestion": "Advice on what to avoid/check.",
        "alternatives": [{"name": "string", "why": "string"}]
      }
    `;

    const contents = req.file 
      ? [{ role: "user", parts: [{ inlineData: { data: base64, mimeType } }, { text: analysisPrompt }] }]
      : [{ role: "user", parts: [{ text: analysisPrompt }] }];

    const analysis = await generateGeminiContent({ contents });
    const analysisText = analysis.response.candidates[0].content.parts[0].text || "";
    const cleanJson = parseGeminiJson(analysisText);

    const result = {
      success: true,
      food_name: foodName,
      nutrition: nutritionData,
      ...cleanJson,
    };

    foodCache.set(cacheKey, result);
    res.json({ ...result, fromCache: false });

  } catch (err) {
    logError(err, "[Analyze] Error handler");
    return res.status(500).json({ success: false, error: { message: err.message, code: "SERVER_ERROR" } });
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};

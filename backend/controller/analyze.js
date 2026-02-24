import axios from "axios";
import fs from "fs";
import NodeCache from "node-cache";
import { generateGeminiContent } from "../services/googleservices.js";
import { getNutritionData } from "../services/ninjaServices.js";
import imageToBase64 from "../utils/imgconversion.js";
import getMimeType from "../utils/getmemetype.js";
import { parseGeminiJson } from "../utils/parseGeminiJson.js";
// Import the scoring utility (Ensure you create this file in backend/utils/)
import { calculateNutritionScore } from "../utils/nutritionScore.js"; 
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
    const ingredientsText = req.body.ingredientsText;

    // Handle follow-up queries
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
        logError(error, "[Analyze] Follow-up failed");
        return res.status(500).json({ success: false, error: { message: "AI response failed" } });
      }
    }

    // Validation
    if (!req.file && !ingredientsText) {
      return res.status(400).json({
        success: false,
        error: { message: "Input required", code: "MISSING_INPUT" },
      });
    }

    let foodName = ingredientsText ? "Manual Ingredient List" : "";
    let base64 = "";
    let mimeType = "";

    if (req.file) {
      imagePath = req.file.path;
      base64 = imageToBase64(imagePath);
      mimeType = getMimeType(imagePath);

      const identify = await generateGeminiContent({
        contents: [
          {
            role: "user",
            parts: [
              { inlineData: { data: base64, mimeType } },
              { text: "Identify the food. If packaged/label, output 'packaged_food'. Else, output dish name." },
            ],
          },
        ],
      });
      foodName = identify.response.candidates[0].content.parts[0].text.trim();
    }

    const cacheKey = `${(ingredientsText || foodName).toLowerCase()}_${condition.toLowerCase()}`;
    const cachedResult = foodCache.get(cacheKey);
    if (cachedResult) return res.json({ ...cachedResult, fromCache: true });

    let nutritionData = null;
    if (foodName && foodName !== "packaged_food" && foodName !== "Manual Ingredient List") {
      try {
        nutritionData = await getNutritionData(foodName);
      } catch (error) {
        logError(error, "[Analyze] Nutrition fetch failed");
      }
    }

    // UPDATED PROMPT: Incorporating Issue #62 requirements for additives and scoring
    const analysisPrompt = `
      Context: User Health Profile: "${condition}".
      Target: ${ingredientsText ? "Analyze this: " + ingredientsText : (foodName === "packaged_food" ? "Analyze the label" : "Analyze the dish: " + foodName)}.
      ${nutritionData ? "Nutritional Data: " + JSON.stringify(nutritionData) : ""}

      CRITICAL INSTRUCTIONS:
      1. Identification: List all ingredients/additives.
      2. Additive Analysis: Identify harmful additives (preservatives, artificial colors, high-fructose syrup).
      3. Health Impact: Evaluate risks for the specific condition: ${condition}.
      4. Scoring Context: Provide a 0-100 justification based on sugar, fat, and chemicals found.

      Output ONLY JSON:
      {
        "traffic_light": "green" | "yellow" | "red",
        "verdict_title": "NutriVigil Health Score Analysis",
        "ingredients_classification": {
          "healthy": [{"name": "string", "reason": "string"}],
          "risky": [{"name": "string", "reason": "string"}],
          "harmful": [{"name": "string", "reason": "string"}]
        },
        "reason": "Detailed explanation including impact of additives and nutrients.",
        "suggestion": "Specific advice for ${condition}.",
        "alternatives": [{"name": "string", "why": "string"}]
      }
    `;

    const contents = req.file 
      ? [{ role: "user", parts: [{ inlineData: { data: base64, mimeType } }, { text: analysisPrompt }] }]
      : [{ role: "user", parts: [{ text: analysisPrompt }] }];

    const analysis = await generateGeminiContent({ contents });
    const analysisText = analysis.response.candidates[0].content.parts[0].text || "";
    const cleanJson = parseGeminiJson(analysisText);

    // Calculate the Numerical Score (Issue #62)
    const numericalScore = calculateNutritionScore(nutritionData);

    const result = {
      success: true,
      food_name: foodName === "packaged_food" ? "Packaged Product" : foodName,
      nutrition_score: numericalScore, // NEW: Numerical Score Integration
      nutrition: nutritionData,
      ...cleanJson,
    };

    foodCache.set(cacheKey, result);
    res.json({ ...result, fromCache: false });

  } catch (err) {
    logError(err, "[Analyze] Critical Failure");
    return res.status(500).json({ success: false, error: { message: err.message } });
  } finally {
    if (imagePath && fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
};

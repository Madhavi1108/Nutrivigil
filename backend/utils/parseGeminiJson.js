/**
 * Defensive JSON parser for Gemini API responses
 * Handles malformed responses, text-wrapped JSON, and validates schema
 */

/**
 * Extract the first JSON object from text by finding matching braces
 * @param {string} text - The text containing JSON
 * @returns {string|null} - Extracted JSON string or null
 */
function extractJsonObject(text) {
  const firstBrace = text.indexOf('{');
  if (firstBrace === -1) return null;

  let braceCount = 0;
  let inString = false;
  let escapeNext = false;

  for (let i = firstBrace; i < text.length; i++) {
    const char = text[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '{') braceCount++;
      if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          return text.substring(firstBrace, i + 1);
        }
      }
    }
  }

  return null;
}

/**
 * Validate the parsed JSON against expected schema
 * @param {Object} data - Parsed JSON object
 * @returns {Object} - Validation result with isValid and errors
 */
function validateSchema(data) {
  const errors = [];

  // Validate traffic_light
  if (data.traffic_light) {
    const validLights = ['green', 'yellow', 'red'];
    if (!validLights.includes(data.traffic_light)) {
      errors.push(`Invalid traffic_light: "${data.traffic_light}". Must be one of: green, yellow, red`);
    }
  }

  // Validate verdict_title
  if (data.verdict_title !== undefined && typeof data.verdict_title !== 'string') {
    errors.push('verdict_title must be a string');
  } else if (data.verdict_title && data.verdict_title.trim() === '') {
    errors.push('verdict_title cannot be empty');
  }

  // Validate answer (for follow-up queries)
  if (data.answer !== undefined && typeof data.answer !== 'string') {
    errors.push('answer must be a string');
  } else if (data.answer && data.answer.trim() === '') {
    errors.push('answer cannot be empty');
  }

  // Validate reason (for main analysis)
  if (data.reason !== undefined && typeof data.reason !== 'string') {
    errors.push('reason must be a string');
  }

  // Validate suggestion (for main analysis)
  if (data.suggestion !== undefined && typeof data.suggestion !== 'string') {
    errors.push('suggestion must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Parse Gemini response with defensive error handling
 * @param {string} responseText - Raw response from Gemini API
 * @param {Object} options - Optional configuration
 * @param {boolean} options.strict - If true, throw on validation errors
 * @returns {Object} - Parsed and validated JSON object
 * @throws {Error} - If parsing fails or validation fails in strict mode
 */
export function parseGeminiJson(responseText, options = {}) {
  const { strict = false } = options;

  if (!responseText || typeof responseText !== 'string') {
    throw new Error('Invalid input: responseText must be a non-empty string');
  }

  // Step 1: Strip code fences
  let cleanedText = responseText
    .replace(/```json\s*/g, '')
    .replace(/```\s*/g, '')
    .trim();

  // Step 2: Extract JSON object if text is wrapped
  const jsonString = extractJsonObject(cleanedText);
  
  if (!jsonString) {
    throw new Error('No valid JSON object found in response');
  }

  // Step 3: Parse JSON with try/catch
  let parsedData;
  try {
    parsedData = JSON.parse(jsonString);
  } catch (parseError) {
    throw new Error(`JSON parse error: ${parseError.message}. Raw text: ${jsonString.substring(0, 200)}...`);
  }

  // Step 4: Validate schema
  const validation = validateSchema(parsedData);
  
  if (!validation.isValid) {
    const errorMessage = `Schema validation failed: ${validation.errors.join(', ')}`;
    if (strict) {
      throw new Error(errorMessage);
    }
    // In non-strict mode, log warning but return data
    console.warn(`[parseGeminiJson] ${errorMessage}`);
  }

  return parsedData;
}

/**
 * Safe wrapper that returns an error object instead of throwing
 * @param {string} responseText - Raw response from Gemini API
 * @param {Object} options - Optional configuration
 * @returns {Object} - Result object with success flag and data or error
 */
export function safeParseGeminiJson(responseText, options = {}) {
  try {
    const data = parseGeminiJson(responseText, options);
    return {
      success: true,
      data,
      error: null,
      raw: responseText
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error.message,
      raw: responseText
    };
  }
}

export default parseGeminiJson;

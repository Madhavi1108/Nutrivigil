/**
 * Nutrition Score Calculator (Backend Utility)
 * * Calculates a health score (0-100) based on:
 * - Negative factors: saturated fat, sodium, added sugar, trans fat
 * - Positive factors: fiber, protein, vitamins, minerals
 */

/**
 * Calculate nutrition score for a food item
 * @param {Object} nutrition - Nutrition information object from API Ninjas
 * @returns {number} Score from 0-100
 */
export const calculateNutritionScore = (nutrition) => {
  if (!nutrition) return 0;

  // Start with a neutral score
  let score = 50; 

  // --- POSITIVE FACTORS (increase score) ---

  // Protein bonus (up to +20 points)
  if (nutrition.protein_g || nutrition.protein) {
    const protein = nutrition.protein_g || nutrition.protein;
    if (protein >= 20) score += 20;
    else if (protein >= 15) score += 15;
    else if (protein >= 10) score += 10;
    else if (protein >= 5) score += 5;
  }

  // Fiber bonus (up to +15 points)
  if (nutrition.fiber_g || nutrition.fiber) {
    const fiber = nutrition.fiber_g || nutrition.fiber;
    if (fiber >= 8) score += 15;
    else if (fiber >= 5) score += 10;
    else if (fiber >= 3) score += 5;
  }

  // Low calorie bonus (up to +10 points)
  if (nutrition.calories) {
    if (nutrition.calories <= 100) score += 10;
    else if (nutrition.calories <= 200) score += 5;
  }

  // --- NEGATIVE FACTORS (decrease score) ---

  // Saturated fat penalty (up to -15 points)
  if (nutrition.fat_saturated_g || nutrition.saturatedFat) {
    const satFat = nutrition.fat_saturated_g || nutrition.saturatedFat;
    if (satFat >= 10) score -= 15;
    else if (satFat >= 7) score -= 10;
    else if (satFat >= 5) score -= 7;
    else if (satFat >= 3) score -= 3;
  }

  // Trans fat penalty (up to -20 points)
  if (nutrition.transFat) {
    if (nutrition.transFat > 0.5) score -= 20;
    else if (nutrition.transFat > 0) score -= 10;
  }

  // Sodium penalty (up to -20 points)
  if (nutrition.sodium_mg || nutrition.sodium) {
    const sodium = nutrition.sodium_mg || nutrition.sodium;
    if (sodium >= 800) score -= 20;
    else if (sodium >= 600) score -= 15;
    else if (sodium >= 400) score -= 10;
    else if (sodium >= 200) score -= 5;
  }

  // Sugar penalty (up to -20 points)
  if (nutrition.sugar_g || nutrition.sugar) {
    const sugar = nutrition.sugar_g || nutrition.sugar;
    if (sugar >= 25) score -= 20;
    else if (sugar >= 20) score -= 15;
    else if (sugar >= 15) score -= 10;
    else if (sugar >= 10) score -= 5;
  }

  // High calorie penalty
  if (nutrition.calories && nutrition.calories >= 500) {
    score -= Math.min(15, Math.floor((nutrition.calories - 500) / 100) * 3);
  }

  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score));
};

export default calculateNutritionScore;
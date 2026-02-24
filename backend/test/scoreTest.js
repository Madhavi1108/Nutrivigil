import { calculateNutritionScore } from "../utils/nutritionScore.js";

/**
 * NutriVigil Scoring Logic Test Suite
 * This script verifies the 0-100 health score algorithm.
 */

const testCases = [
  {
    name: "Healthy Option (High Protein & Fiber)",
    data: {
      protein: 25,
      fiber: 10,
      calories: 150,
      saturatedFat: 1,
      sodium: 100,
      sugar: 2
    }
  },
  {
    name: "Moderate Option (Average Snack)",
    data: {
      protein: 5,
      fiber: 2,
      calories: 250,
      saturatedFat: 4,
      sodium: 300,
      sugar: 12
    }
  },
  {
    name: "Unhealthy Option (High Sugar & Fat)",
    data: {
      protein: 1,
      fiber: 0,
      calories: 550,
      saturatedFat: 15,
      sodium: 900,
      sugar: 40,
      transFat: 1.0
    }
  },
  {
    name: "Empty / Missing Data",
    data: null
  }
];

console.log("🧪 Starting NutriVigil Nutrition Score Tests...\n");

testCases.forEach((test, index) => {
  console.log(`Test #${index + 1}: ${test.name}`);
  const score = calculateNutritionScore(test.data);
  
  let verdict = "";
  if (score >= 70) verdict = "🟢 GOOD";
  else if (score >= 40) verdict = "🟡 FAIR";
  else verdict = "🔴 POOR";

  console.log(`   - Input: ${JSON.stringify(test.data)}`);
  console.log(`   - Calculated Score: ${score}/100`);
  console.log(`   - Verdict: ${verdict}\n`);
});

console.log("✅ Test Suite Complete.");
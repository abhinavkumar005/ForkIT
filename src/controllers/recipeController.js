import { getRecipesByCategory, normalizeRecipe } from '../services/recipeService.js';
import { mapIngredientsToMolecules } from '../utils/ingredientMapper.js';
import { calculateTasteRestorationScore } from '../services/scoringService.js';
import { isValidCondition } from '../utils/conditionStrategies.js';

/**
 * Analyze recipes for taste restoration based on condition
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware
 */
export const analyzeRecipes = async (req, res, next) => {
  try {
    const { condition, category } = req.query;

    if (!condition) {
      return res.status(400).json({
        error: 'Missing required parameter: condition'
      });
    }

    if (!isValidCondition(condition)) {
      return res.status(400).json({
        error: `Invalid condition. Supported conditions: chemotherapy, hypertension, post_covid`
      });
    }

    if (!category) {
      return res.status(400).json({
        error: 'Missing required parameter: category'
      });
    }

    const rawRecipes = await getRecipesByCategory(category);

    if (!rawRecipes || rawRecipes.length === 0) {
      return res.json({
        condition,
        category,
        totalAnalyzed: 0,
        results: [],
        message: 'No recipes found for this category'
      });
    }

    const analyzedRecipes = await Promise.all(
      rawRecipes.map(async (rawRecipe) => {
        try {
          const recipe = normalizeRecipe(rawRecipe);
          
          const molecularProfile = await mapIngredientsToMolecules(recipe.ingredients);
          
          const scoring = calculateTasteRestorationScore(
            recipe,
            molecularProfile,
            condition
          );

          return {
            recipeId: recipe.recipeId,
            title: recipe.title,
            category: recipe.category,
            calories: recipe.calories,
            servings: recipe.servings,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            difficulty: recipe.difficulty,
            cuisine: recipe.cuisine,
            image: recipe.image,
            ingredientCount: recipe.ingredients.length,
            tasteRestorationScore: scoring.totalScore,
            breakdown: scoring.breakdown,
            explanation: scoring.explanation,
            molecularInsights: scoring.molecularInsights
          };
        } catch (error) {
          return null;
        }
      })
    );

    const validRecipes = analyzedRecipes.filter(recipe => recipe !== null);

    const sortedRecipes = validRecipes.sort(
      (a, b) => b.tasteRestorationScore - a.tasteRestorationScore
    );

    const topRecipes = sortedRecipes.slice(0, 5);

    res.json({
      condition,
      category,
      totalAnalyzed: validRecipes.length,
      results: topRecipes,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get supported conditions
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getSupportedConditions = (req, res) => {
  res.json({
    conditions: [
      {
        id: 'chemotherapy',
        name: 'Chemotherapy',
        description: 'Optimized for metallic taste and reduced sensitivity'
      },
      {
        id: 'hypertension',
        name: 'Hypertension',
        description: 'Low sodium with enhanced flavor perception'
      },
      {
        id: 'post_covid',
        name: 'Post-COVID',
        description: 'Enhanced for olfactory and gustatory recovery'
      }
    ]
  });
};

/**
 * Health check endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const healthCheck = (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Taste Restoration Backend',
    version: '1.0.0'
  });
};

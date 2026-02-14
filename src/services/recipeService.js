import { recipeDBClient } from '../config/apiConfig.js';

/**
 * Fetch recipes by category from RecipeDB
 * @param {string} category - Recipe category
 * @returns {Promise<Object[]>} Array of recipe objects
 */
export const getRecipesByCategory = async (category) => {
  try {
    const response = await recipeDBClient.get('/recipes', {
      params: { category }
    });
    
    return response.data.recipes || [];
  } catch (error) {
    throw new Error(`Failed to fetch recipes: ${error.message}`);
  }
};

/**
 * Fetch a single recipe by ID from RecipeDB
 * @param {string} recipeId - Recipe ID
 * @returns {Promise<Object>} Recipe object
 */
export const getRecipeById = async (recipeId) => {
  try {
    const response = await recipeDBClient.get(`/recipes/${recipeId}`);
    
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch recipe: ${error.message}`);
  }
};

/**
 * Extract ingredients from recipe object
 * @param {Object} recipe - Recipe object
 * @returns {string[]} Array of ingredient names
 */
export const extractIngredients = (recipe) => {
  if (!recipe) return [];
  
  if (Array.isArray(recipe.ingredients)) {
    return recipe.ingredients.map(ing => {
      if (typeof ing === 'string') return ing;
      if (ing.name) return ing.name;
      if (ing.ingredient) return ing.ingredient;
      return '';
    }).filter(Boolean);
  }
  
  return [];
};

/**
 * Normalize recipe data structure
 * @param {Object} recipe - Raw recipe object
 * @returns {Object} Normalized recipe object
 */
export const normalizeRecipe = (recipe) => {
  return {
    recipeId: recipe.id || recipe.recipeId,
    title: recipe.title || recipe.name || 'Untitled Recipe',
    category: recipe.category || 'uncategorized',
    calories: recipe.calories || recipe.nutrition?.calories || 0,
    ingredients: extractIngredients(recipe),
    servings: recipe.servings || 1,
    prepTime: recipe.prepTime || recipe.preparation_time || 0,
    cookTime: recipe.cookTime || recipe.cooking_time || 0,
    difficulty: recipe.difficulty || 'medium',
    cuisine: recipe.cuisine || 'international',
    image: recipe.image || recipe.imageUrl || null
  };
};

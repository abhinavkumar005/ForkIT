import { flavorDBClient } from '../config/apiConfig.js';

/**
 * In-memory cache for ingredient-to-molecule mappings
 */
class IngredientCache {
  constructor(ttl = 3600000) {
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + this.ttl
    });
  }

  clear() {
    this.cache.clear();
  }
}

const cache = new IngredientCache(parseInt(process.env.CACHE_TTL) || 3600000);

/**
 * Fetch molecules for a single ingredient from FlavorDB
 * @param {string} ingredient - Ingredient name
 * @returns {Promise<Object[]>} Array of molecule objects
 */
const fetchMoleculesForIngredient = async (ingredient) => {
  const cacheKey = ingredient.toLowerCase().trim();
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await flavorDBClient.get('/entities', {
      params: { name: ingredient }
    });
    
    const molecules = response.data.molecules || [];
    cache.set(cacheKey, molecules);
    
    return molecules;
  } catch (error) {
    return [];
  }
};

/**
 * Map recipe ingredients to their molecular profiles
 * @param {string[]} ingredients - Array of ingredient names
 * @returns {Promise<Object>} Aggregated molecular profile
 */
export const mapIngredientsToMolecules = async (ingredients) => {
  if (!ingredients || ingredients.length === 0) {
    return {
      totalMolecules: 0,
      uniqueMolecules: [],
      moleculeFrequency: {},
      ingredientCoverage: 0
    };
  }

  const moleculePromises = ingredients.map(ingredient => 
    fetchMoleculesForIngredient(ingredient)
  );

  const moleculeArrays = await Promise.all(moleculePromises);
  
  const moleculeMap = new Map();
  const moleculeFrequency = {};
  let successfulMappings = 0;

  moleculeArrays.forEach((molecules, index) => {
    if (molecules.length > 0) {
      successfulMappings++;
    }

    molecules.forEach(molecule => {
      const moleculeId = molecule.id || molecule.name;
      
      if (!moleculeMap.has(moleculeId)) {
        moleculeMap.set(moleculeId, {
          id: moleculeId,
          name: molecule.name,
          tasteThreshold: molecule.tasteThreshold || null,
          aromaVolatility: molecule.aromaVolatility || null,
          receptorBinding: molecule.receptorBinding || [],
          flavorProfile: molecule.flavorProfile || [],
          sources: [ingredients[index]]
        });
        moleculeFrequency[moleculeId] = 1;
      } else {
        const existing = moleculeMap.get(moleculeId);
        if (!existing.sources.includes(ingredients[index])) {
          existing.sources.push(ingredients[index]);
          moleculeFrequency[moleculeId]++;
        }
      }
    });
  });

  const uniqueMolecules = Array.from(moleculeMap.values());

  return {
    totalMolecules: uniqueMolecules.length,
    uniqueMolecules,
    moleculeFrequency,
    ingredientCoverage: ingredients.length > 0 
      ? (successfulMappings / ingredients.length) * 100 
      : 0
  };
};

/**
 * Get flavor pairings for an ingredient
 * @param {string} ingredient - Ingredient name
 * @returns {Promise<Object[]>} Array of pairing suggestions
 */
export const getFlavorPairings = async (ingredient) => {
  const cacheKey = `pairings_${ingredient.toLowerCase().trim()}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }

  try {
    const response = await flavorDBClient.get('/pairings', {
      params: { ingredient }
    });
    
    const pairings = response.data.pairings || [];
    cache.set(cacheKey, pairings);
    
    return pairings;
  } catch (error) {
    return [];
  }
};

/**
 * Clear the ingredient cache
 */
export const clearCache = () => {
  cache.clear();
};

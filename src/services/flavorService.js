import { flavorDBClient } from '../config/apiConfig.js';

/**
 * Get entities by readable name from FlavorDB
 * @param {string} name - Entity name
 * @returns {Promise<Object>} Entity data
 */
export const getEntityByName = async (name) => {
  try {
    const response = await flavorDBClient.get('/entities', {
      params: { name }
    });
    
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch entity: ${error.message}`);
  }
};

/**
 * Get properties by taste threshold from FlavorDB
 * @param {number} threshold - Taste threshold value
 * @returns {Promise<Object[]>} Array of properties
 */
export const getPropertiesByTasteThreshold = async (threshold) => {
  try {
    const response = await flavorDBClient.get('/properties', {
      params: { tasteThreshold: threshold }
    });
    
    return response.data.properties || [];
  } catch (error) {
    throw new Error(`Failed to fetch properties: ${error.message}`);
  }
};

/**
 * Get aroma threshold values from FlavorDB
 * @param {string} moleculeId - Molecule identifier
 * @returns {Promise<Object>} Aroma threshold data
 */
export const getAromaThreshold = async (moleculeId) => {
  try {
    const response = await flavorDBClient.get(`/molecules/${moleculeId}/aroma`);
    
    return response.data;
  } catch (error) {
    return { threshold: null, volatility: null };
  }
};

/**
 * Analyze molecular properties for taste restoration
 * @param {Object[]} molecules - Array of molecule objects
 * @param {Object} strategy - Condition strategy
 * @returns {Object} Analysis results
 */
export const analyzeMolecularProperties = (molecules, strategy) => {
  if (!molecules || molecules.length === 0) {
    return {
      averageTasteThreshold: 0,
      receptorActivation: 0,
      aromaVolatility: 0,
      flavorComplexity: 0
    };
  }

  let totalTasteThreshold = 0;
  let tasteThresholdCount = 0;
  let totalReceptorBinding = 0;
  let totalAromaVolatility = 0;
  let aromaVolatilityCount = 0;
  const uniqueReceptors = new Set();
  const uniqueFlavors = new Set();

  molecules.forEach(molecule => {
    if (molecule.tasteThreshold !== null && molecule.tasteThreshold !== undefined) {
      totalTasteThreshold += molecule.tasteThreshold;
      tasteThresholdCount++;
    }

    if (Array.isArray(molecule.receptorBinding)) {
      molecule.receptorBinding.forEach(receptor => uniqueReceptors.add(receptor));
      totalReceptorBinding += molecule.receptorBinding.length;
    }

    if (molecule.aromaVolatility !== null && molecule.aromaVolatility !== undefined) {
      totalAromaVolatility += molecule.aromaVolatility;
      aromaVolatilityCount++;
    }

    if (Array.isArray(molecule.flavorProfile)) {
      molecule.flavorProfile.forEach(flavor => uniqueFlavors.add(flavor));
    }
  });

  return {
    averageTasteThreshold: tasteThresholdCount > 0 
      ? totalTasteThreshold / tasteThresholdCount 
      : 0,
    receptorActivation: uniqueReceptors.size,
    totalReceptorBindings: totalReceptorBinding,
    aromaVolatility: aromaVolatilityCount > 0 
      ? totalAromaVolatility / aromaVolatilityCount 
      : 0,
    flavorComplexity: uniqueFlavors.size,
    uniqueReceptors: Array.from(uniqueReceptors),
    uniqueFlavors: Array.from(uniqueFlavors)
  };
};

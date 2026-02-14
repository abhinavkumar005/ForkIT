/**
 * Condition-specific strategies for taste restoration scoring
 */

export const conditionStrategies = {
  chemotherapy: {
    maxTasteThreshold: 0.5,
    avoidHighAromaVolatility: true,
    sodiumLimit: 2000,
    weights: {
      intensity: 0.40,
      receptor: 0.30,
      synergy: 0.20,
      safety: 0.10
    },
    description: 'Optimized for metallic taste and reduced sensitivity'
  },
  
  hypertension: {
    maxTasteThreshold: 0.7,
    avoidHighAromaVolatility: false,
    sodiumLimit: 1500,
    weights: {
      intensity: 0.35,
      receptor: 0.25,
      synergy: 0.25,
      safety: 0.15
    },
    description: 'Low sodium with enhanced flavor perception'
  },
  
  post_covid: {
    maxTasteThreshold: 0.6,
    avoidHighAromaVolatility: true,
    sodiumLimit: 2300,
    weights: {
      intensity: 0.45,
      receptor: 0.30,
      synergy: 0.15,
      safety: 0.10
    },
    description: 'Enhanced for olfactory and gustatory recovery'
  }
};

/**
 * Get strategy for a specific condition
 * @param {string} condition - The medical condition
 * @returns {Object} Strategy configuration
 */
export const getStrategy = (condition) => {
  const strategy = conditionStrategies[condition];
  if (!strategy) {
    throw new Error(`Unknown condition: ${condition}`);
  }
  return strategy;
};

/**
 * Validate if condition is supported
 * @param {string} condition - The medical condition
 * @returns {boolean} True if supported
 */
export const isValidCondition = (condition) => {
  return condition in conditionStrategies;
};

/**
 * Get all supported conditions
 * @returns {string[]} Array of condition names
 */
export const getSupportedConditions = () => {
  return Object.keys(conditionStrategies);
};

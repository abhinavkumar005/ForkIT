import { getStrategy } from '../utils/conditionStrategies.js';
import { analyzeMolecularProperties } from './flavorService.js';

/**
 * Calculate intensity score based on molecular taste thresholds
 * @param {Object} molecularAnalysis - Molecular analysis data
 * @param {Object} strategy - Condition strategy
 * @returns {Object} Intensity score and explanation
 */
const calculateIntensityScore = (molecularAnalysis, strategy) => {
  const { averageTasteThreshold, flavorComplexity } = molecularAnalysis;
  
  let score = 0;
  const explanations = [];

  if (averageTasteThreshold > 0) {
    const thresholdScore = Math.min(averageTasteThreshold / strategy.maxTasteThreshold, 1) * 60;
    score += thresholdScore;
    explanations.push(`Taste threshold: ${averageTasteThreshold.toFixed(3)} (${thresholdScore.toFixed(1)}/60)`);
  }

  const complexityScore = Math.min(flavorComplexity / 10, 1) * 40;
  score += complexityScore;
  explanations.push(`Flavor complexity: ${flavorComplexity} profiles (${complexityScore.toFixed(1)}/40)`);

  return {
    score: Math.min(score, 100),
    explanations
  };
};

/**
 * Calculate receptor activation score
 * @param {Object} molecularAnalysis - Molecular analysis data
 * @param {Object} strategy - Condition strategy
 * @returns {Object} Receptor score and explanation
 */
const calculateReceptorScore = (molecularAnalysis, strategy) => {
  const { receptorActivation, totalReceptorBindings } = molecularAnalysis;
  
  let score = 0;
  const explanations = [];

  const uniqueReceptorScore = Math.min(receptorActivation / 15, 1) * 60;
  score += uniqueReceptorScore;
  explanations.push(`Unique receptors activated: ${receptorActivation} (${uniqueReceptorScore.toFixed(1)}/60)`);

  const bindingScore = Math.min(totalReceptorBindings / 50, 1) * 40;
  score += bindingScore;
  explanations.push(`Total receptor bindings: ${totalReceptorBindings} (${bindingScore.toFixed(1)}/40)`);

  return {
    score: Math.min(score, 100),
    explanations
  };
};

/**
 * Calculate synergy score based on ingredient interactions
 * @param {Object} molecularProfile - Molecular profile with frequency data
 * @param {Object} strategy - Condition strategy
 * @returns {Object} Synergy score and explanation
 */
const calculateSynergyScore = (molecularProfile, strategy) => {
  const { moleculeFrequency, uniqueMolecules } = molecularProfile;
  
  let score = 0;
  const explanations = [];

  const sharedMolecules = Object.values(moleculeFrequency).filter(freq => freq > 1).length;
  const synergyRatio = uniqueMolecules.length > 0 
    ? sharedMolecules / uniqueMolecules.length 
    : 0;

  score = synergyRatio * 100;
  explanations.push(`Shared molecules: ${sharedMolecules}/${uniqueMolecules.length} (${score.toFixed(1)}/100)`);

  return {
    score: Math.min(score, 100),
    explanations
  };
};

/**
 * Calculate safety score based on condition constraints
 * @param {Object} molecularAnalysis - Molecular analysis data
 * @param {Object} recipe - Recipe data
 * @param {Object} strategy - Condition strategy
 * @returns {Object} Safety score and explanation
 */
const calculateSafetyScore = (molecularAnalysis, recipe, strategy) => {
  let score = 100;
  const explanations = [];

  if (strategy.avoidHighAromaVolatility && molecularAnalysis.aromaVolatility > 0.7) {
    const penalty = (molecularAnalysis.aromaVolatility - 0.7) * 100;
    score -= penalty;
    explanations.push(`High aroma volatility penalty: -${penalty.toFixed(1)}`);
  }

  if (strategy.sodiumLimit && recipe.sodium && recipe.sodium > strategy.sodiumLimit) {
    const sodiumPenalty = ((recipe.sodium - strategy.sodiumLimit) / strategy.sodiumLimit) * 50;
    score -= Math.min(sodiumPenalty, 50);
    explanations.push(`Sodium limit exceeded: ${recipe.sodium}mg (limit: ${strategy.sodiumLimit}mg)`);
  }

  if (explanations.length === 0) {
    explanations.push('No safety concerns detected');
  }

  return {
    score: Math.max(score, 0),
    explanations
  };
};

/**
 * Calculate comprehensive taste restoration score
 * @param {Object} recipe - Recipe object
 * @param {Object} molecularProfile - Molecular profile data
 * @param {string} condition - Medical condition
 * @returns {Object} Complete scoring breakdown
 */
export const calculateTasteRestorationScore = (recipe, molecularProfile, condition) => {
  const strategy = getStrategy(condition);
  const molecularAnalysis = analyzeMolecularProperties(
    molecularProfile.uniqueMolecules, 
    strategy
  );

  const intensity = calculateIntensityScore(molecularAnalysis, strategy);
  const receptor = calculateReceptorScore(molecularAnalysis, strategy);
  const synergy = calculateSynergyScore(molecularProfile, strategy);
  const safety = calculateSafetyScore(molecularAnalysis, recipe, strategy);

  const totalScore = (
    intensity.score * strategy.weights.intensity +
    receptor.score * strategy.weights.receptor +
    synergy.score * strategy.weights.synergy +
    safety.score * strategy.weights.safety
  );

  return {
    totalScore: Math.round(totalScore * 100) / 100,
    breakdown: {
      intensity: Math.round(intensity.score * 100) / 100,
      receptor: Math.round(receptor.score * 100) / 100,
      synergy: Math.round(synergy.score * 100) / 100,
      safety: Math.round(safety.score * 100) / 100
    },
    explanation: [
      `Intensity (${(strategy.weights.intensity * 100).toFixed(0)}%): ${intensity.explanations.join(', ')}`,
      `Receptor (${(strategy.weights.receptor * 100).toFixed(0)}%): ${receptor.explanations.join(', ')}`,
      `Synergy (${(strategy.weights.synergy * 100).toFixed(0)}%): ${synergy.explanations.join(', ')}`,
      `Safety (${(strategy.weights.safety * 100).toFixed(0)}%): ${safety.explanations.join(', ')}`
    ],
    molecularInsights: {
      totalMolecules: molecularProfile.totalMolecules,
      ingredientCoverage: Math.round(molecularProfile.ingredientCoverage * 100) / 100,
      receptorsActivated: molecularAnalysis.receptorActivation,
      flavorComplexity: molecularAnalysis.flavorComplexity
    }
  };
};

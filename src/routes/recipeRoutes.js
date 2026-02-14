import express from 'express';
import { 
  analyzeRecipes, 
  getSupportedConditions, 
  healthCheck 
} from '../controllers/recipeController.js';

const router = express.Router();

/**
 * GET /api/analyze
 * Analyze recipes for taste restoration
 * Query params: condition, category
 */
router.get('/analyze', analyzeRecipes);

/**
 * GET /api/conditions
 * Get list of supported medical conditions
 */
router.get('/conditions', getSupportedConditions);

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', healthCheck);

export default router;

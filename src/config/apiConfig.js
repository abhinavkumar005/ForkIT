import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

/**
 * RecipeDB API client configuration
 */
export const recipeDBClient = axios.create({
  baseURL: process.env.RECIPEDB_BASE_URL,
  timeout: parseInt(process.env.API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.RECIPEDB_API_KEY}`
  }
});

/**
 * FlavorDB API client configuration
 */
export const flavorDBClient = axios.create({
  baseURL: process.env.FLAVORDB_BASE_URL,
  timeout: parseInt(process.env.API_TIMEOUT) || 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.FLAVORDB_API_KEY}`
  }
});

/**
 * Request interceptor for logging
 */
const requestInterceptor = (config) => {
  config.metadata = { startTime: new Date() };
  return config;
};

/**
 * Response interceptor for logging
 */
const responseInterceptor = (response) => {
  return response;
};

/**
 * Error interceptor
 */
const errorInterceptor = (error) => {
  if (error.response) {
    error.message = `API Error: ${error.response.status} - ${error.response.statusText}`;
  } else if (error.request) {
    error.message = 'API Error: No response received';
  }
  return Promise.reject(error);
};

recipeDBClient.interceptors.request.use(requestInterceptor);
recipeDBClient.interceptors.response.use(responseInterceptor, errorInterceptor);

flavorDBClient.interceptors.request.use(requestInterceptor);
flavorDBClient.interceptors.response.use(responseInterceptor, errorInterceptor);

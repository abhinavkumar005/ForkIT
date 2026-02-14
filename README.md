# Taste Restoration Backend

Middleware intelligence layer connecting RecipeDB and FlavorDB APIs for taste restoration analysis.

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your API credentials.

## Start Server

```bash
npm start
```

Development mode:
```bash
npm run dev
```

## API Endpoints

### Analyze Recipes
```
GET /api/analyze?condition=chemotherapy&category=breakfast
```

Response:
```json
{
  "condition": "chemotherapy",
  "category": "breakfast",
  "totalAnalyzed": 10,
  "results": [
    {
      "recipeId": "123",
      "title": "Lemon Ginger Oatmeal",
      "calories": 320,
      "tasteRestorationScore": 87.5,
      "breakdown": {
        "intensity": 85.2,
        "receptor": 90.1,
        "synergy": 88.3,
        "safety": 95.0
      },
      "explanation": [
        "Intensity (40%): Taste threshold: 0.45 (54.0/60), Flavor complexity: 8 profiles (32.0/40)",
        "Receptor (30%): Unique receptors activated: 12 (48.0/60), Total receptor bindings: 35 (28.0/40)",
        "Synergy (20%): Shared molecules: 15/25 (60.0/100)",
        "Safety (10%): No safety concerns detected"
      ],
      "molecularInsights": {
        "totalMolecules": 25,
        "ingredientCoverage": 85.5,
        "receptorsActivated": 12,
        "flavorComplexity": 8
      }
    }
  ]
}
```

### Get Supported Conditions
```
GET /api/conditions
```

### Health Check
```
GET /api/health
```

## Supported Conditions

- `chemotherapy` - Optimized for metallic taste and reduced sensitivity
- `hypertension` - Low sodium with enhanced flavor perception
- `post_covid` - Enhanced for olfactory and gustatory recovery

## Architecture

```
backend/
├── src/
│   ├── config/          # API client configuration
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── routes/          # Route definitions
│   ├── middleware/      # Error handling
│   └── server.js        # Entry point
├── .env.example
├── package.json
└── README.md
```

## Scoring Algorithm

Taste Restoration Score = weighted sum of:
- Intensity Score (40%)
- Receptor Activation Score (30%)
- Synergy Score (20%)
- Safety Score (10%)

## Caching

In-memory cache for ingredient-to-molecule mappings with configurable TTL.

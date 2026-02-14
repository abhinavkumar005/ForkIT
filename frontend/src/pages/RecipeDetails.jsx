import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaHeart,
  FaShareAlt,
  FaPrint,
  FaClock,
  FaUtensils,
  FaFire,
} from "react-icons/fa";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    // Fetch recipe data from backend
    // For now, using mock data
    const mockRecipe = {
      id: 1,
      title: "Smoky Lentil Soup",
      image: "https://images.unsplash.com/photo-1547592164-6f5f5e241e84?w=800",
      description:
        "A rich, smoky lentil soup engineered for enhanced umami perception and reduced taste sensitivity.",
      calories: 240,
      prepTime: 15,
      cookTime: 40,
      servings: 4,
      score: 87,
      breakdown: {
        intensity: 34,
        receptor: 25,
        synergy: 18,
        safety: 10,
      },
      explanation: {
        title: "Why This Works For You",
        points: [
          "Contains 3 ultra-detectable flavor compounds that bypass damaged taste receptors",
          "Strong umami synergy from smoked paprika and tomato paste",
          "Low sodium content (under 500mg) suitable for hypertension management",
          "Aromatic compounds are carefully balanced to avoid triggering smell distortion",
        ],
        science:
          "This recipe leverages the Maillard reaction during cooking to create new flavor compounds that are more detectable by compromised taste receptors. The combination of smoked paprika, cumin, and garlic creates a flavor matrix that activates multiple receptor pathways simultaneously.",
      },
      ingredients: [
        { name: "Brown lentils", amount: "1 cup", notes: "Rinsed and drained" },
        { name: "Onion", amount: "1 large", notes: "Diced" },
        { name: "Carrot", amount: "2 medium", notes: "Chopped" },
        { name: "Celery", amount: "2 stalks", notes: "Chopped" },
        { name: "Garlic", amount: "3 cloves", notes: "Minced" },
        {
          name: "Smoked paprika",
          amount: "2 tsp",
          notes: "Key flavor enhancer",
        },
        { name: "Cumin", amount: "1 tsp", notes: "" },
        { name: "Tomato paste", amount: "2 tbsp", notes: "Umami booster" },
        { name: "Vegetable broth", amount: "4 cups", notes: "Low sodium" },
        { name: "Bay leaf", amount: "1", notes: "" },
        { name: "Olive oil", amount: "2 tbsp", notes: "" },
        { name: "Salt", amount: "1/2 tsp", notes: "Adjust to taste" },
        { name: "Black pepper", amount: "1/4 tsp", notes: "Freshly ground" },
      ],
      instructions: [
        "Heat olive oil in a large pot over medium heat. Add onion, carrot, and celery. Cook until softened, about 5-7 minutes.",
        "Add garlic, smoked paprika, and cumin. Cook for 1 minute until fragrant.",
        "Stir in tomato paste and cook for another minute to deepen the flavor.",
        "Add lentils, vegetable broth, and bay leaf. Bring to a boil.",
        "Reduce heat to low, cover, and simmer for 30-35 minutes until lentils are tender.",
        "Remove bay leaf. Season with salt and pepper to taste.",
        "For creamier texture, blend half the soup with an immersion blender.",
        "Serve hot with a drizzle of olive oil and fresh herbs if desired.",
      ],
      nutrition: {
        calories: 240,
        protein: 15,
        carbs: 35,
        fat: 6,
        fiber: 12,
        sodium: 450,
      },
      tags: [
        "soup",
        "high-protein",
        "low-sodium",
        "vegetarian",
        "chemotherapy-friendly",
      ],
    };

    setRecipe(mockRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-500">Loading recipe...</div>
      </div>
    );
  }

  const ScoreColor = (score) => {
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 75) return "from-blue-500 to-indigo-500";
    if (score >= 60) return "from-yellow-500 to-amber-500";
    return "from-gray-500 to-gray-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        <FaArrowLeft className="w-6 h-6 text-purple-600" />
      </motion.button>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Recipe Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Image & Score */}
            <div className="space-y-6">
              {/* Recipe Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                {/* Favorite Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`absolute top-4 right-4 p-3 rounded-full ${
                    isFavorite ? "bg-red-500" : "bg-white/20"
                  } text-white hover:bg-white/30 transition-colors`}
                >
                  <FaHeart
                    className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`}
                  />
                </motion.button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-4"
              >
                <QuickStat
                  icon={<FaClock />}
                  label="Prep"
                  value={`${recipe.prepTime} min`}
                />
                <QuickStat
                  icon={<FaUtensils />}
                  label="Cook"
                  value={`${recipe.cookTime} min`}
                />
                <QuickStat
                  icon={<FaFire />}
                  label="Calories"
                  value={`${recipe.calories}`}
                />
              </motion.div>
            </div>

            {/* Right Column - Info & Score */}
            <div className="space-y-8">
              {/* Title & Description */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                >
                  {recipe.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl text-gray-600 mb-6"
                >
                  {recipe.description}
                </motion.p>
              </div>

              {/* Taste Restoration Score */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <ScoreBadge score={recipe.score} />
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex gap-3"
              >
                <ActionButton icon={<FaShareAlt />} label="Share" />
                <ActionButton icon={<FaPrint />} label="Print" primary />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {["ingredients", "instructions", "science", "nutrition"].map(
                (tab) => (
                  <TabButton
                    key={tab}
                    tab={tab}
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                  />
                ),
              )}
            </nav>
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            {activeTab === "ingredients" && (
              <IngredientsTab ingredients={recipe.ingredients} />
            )}
            {activeTab === "instructions" && (
              <InstructionsTab instructions={recipe.instructions} />
            )}
            {activeTab === "science" && (
              <ScienceTab
                explanation={recipe.explanation}
                breakdown={recipe.breakdown}
              />
            )}
            {activeTab === "nutrition" && (
              <NutritionTab nutrition={recipe.nutrition} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-8"
        >
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag, index) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Reusable Components

function QuickStat({ icon: Icon, label, value }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-4 rounded-xl shadow-md text-center"
    >
      <div className="text-purple-600 mb-2">{Icon}</div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
    </motion.div>
  );
}

function ScoreBadge({ score }) {
  const getColor = () => {
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 75) return "from-blue-500 to-indigo-500";
    if (score >= 60) return "from-yellow-500 to-amber-500";
    return "from-gray-500 to-gray-600";
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg">
      <div className="text-center">
        <div className="text-sm font-medium text-gray-600 mb-2">
          Taste Restoration Score
        </div>
        <div
          className={`text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getColor()}`}
        >
          {score}/100
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon: Icon, label, primary = false }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
        primary
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {Icon}
      <span>{label}</span>
    </motion.button>
  );
}

function TabButton({ tab, active, onClick }) {
  const labels = {
    ingredients: "Ingredients",
    instructions: "Instructions",
    science: "The Science",
    nutrition: "Nutrition",
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
        ${
          active
            ? "border-purple-500 text-purple-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }
      `}
    >
      {labels[tab]}
    </motion.button>
  );
}

function IngredientsTab({ ingredients }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        What You'll Need
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ingredients.map((ingredient, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="w-24 text-right">
              <div className="font-semibold text-gray-900">
                {ingredient.amount}
              </div>
              <div className="text-sm text-gray-500">amount</div>
            </div>
            <div className="flex-1 border-l-2 border-dashed border-gray-300 pl-4">
              <div className="font-medium text-gray-900">{ingredient.name}</div>
              {ingredient.notes && (
                <div className="text-sm text-gray-600 mt-1">
                  {ingredient.notes}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InstructionsTab({ instructions }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Make It</h2>
      {instructions.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.15 }}
          className="flex gap-6"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
            {index + 1}
          </div>
          <div className="flex-1">
            <div className="text-lg text-gray-800">{step}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ScienceTab({ explanation, breakdown }) {
  return (
    <div className="space-y-8">
      {/* Why This Works */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {explanation.title}
        </h2>
        <div className="space-y-3">
          {explanation.points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mt-1">
                <span className="text-white text-sm font-bold">
                  {index + 1}
                </span>
              </div>
              <div className="text-gray-800">{point}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Science */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          🔬 The Science Behind It
        </h3>
        <p className="text-gray-700 leading-relaxed">{explanation.science}</p>
      </div>

      {/* Score Breakdown */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Score Breakdown
        </h3>
        <div className="space-y-4">
          {Object.entries(breakdown).map(([key, value], index) => {
            const maxValues = {
              intensity: 40,
              receptor: 30,
              synergy: 20,
              safety: 10,
            };
            const percentage = (value / maxValues[key]) * 100;
            const labels = {
              intensity: "Flavor Intensity",
              receptor: "Receptor Activation",
              synergy: "Flavor Synergy",
              safety: "Dietary Safety",
            };

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">
                    {labels[key]}
                  </span>
                  <span className="font-bold text-gray-900">
                    {value}/{maxValues[key]}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.8 + index * 0.2 }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      percentage > 80
                        ? "from-green-500 to-emerald-500"
                        : percentage > 60
                          ? "from-blue-500 to-indigo-500"
                          : "from-yellow-500 to-amber-500"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function NutritionTab({ nutrition }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Facts</h2>

      {/* Calorie Display */}
      <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
        <div className="text-5xl font-bold text-gray-900">
          {nutrition.calories}
        </div>
        <div className="text-lg text-gray-600">Calories per serving</div>
      </div>

      {/* Nutrition Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {[
          {
            label: "Protein",
            value: `${nutrition.protein}g`,
            color: "text-blue-600",
          },
          {
            label: "Carbs",
            value: `${nutrition.carbs}g`,
            color: "text-purple-600",
          },
          { label: "Fat", value: `${nutrition.fat}g`, color: "text-amber-600" },
          {
            label: "Fiber",
            value: `${nutrition.fiber}g`,
            color: "text-green-600",
          },
          {
            label: "Sodium",
            value: `${nutrition.sodium}mg`,
            color: "text-red-600",
          },
          { label: "Servings", value: "4", color: "text-indigo-600" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="text-center p-4 bg-gray-50 rounded-xl"
          >
            <div className={`text-3xl font-bold ${item.color} mb-1`}>
              {item.value}
            </div>
            <div className="text-sm text-gray-600">{item.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Daily Values */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Daily Values (per serving)
        </h3>
        <div className="space-y-3">
          {[
            { nutrient: "Calories", value: nutrition.calories, daily: "12%" },
            { nutrient: "Total Fat", value: `${nutrition.fat}g`, daily: "8%" },
            {
              nutrient: "Sodium",
              value: `${nutrition.sodium}mg`,
              daily: "19%",
            },
            {
              nutrient: "Total Carbohydrate",
              value: `${nutrition.carbs}g`,
              daily: "12%",
            },
            {
              nutrient: "Dietary Fiber",
              value: `${nutrition.fiber}g`,
              daily: "43%",
            },
            {
              nutrient: "Protein",
              value: `${nutrition.protein}g`,
              daily: "30%",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0"
            >
              <div>
                <div className="font-medium text-gray-900">{item.nutrient}</div>
                <div className="text-sm text-gray-500">{item.value}</div>
              </div>
              <div className="font-bold text-purple-600">{item.daily}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

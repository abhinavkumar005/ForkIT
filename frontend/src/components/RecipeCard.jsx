import ScoreBadge from "../ui/ScoreBadge";

function RecipeCard({ recipe, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{recipe.title}</h3>

        {/* SMALL SCORE BADGE */}
        <ScoreBadge score={recipe.score} size="sm" />

        <p className="text-gray-600 mt-3 text-sm">{recipe.explanation}</p>
      </div>
    </motion.div>
  );
}

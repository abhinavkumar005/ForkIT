import { motion } from "framer-motion";

/**
 * ScoreBadge Component
 *
 * Props:
 * - score: number (0-100) - Required
 * - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * - showLabel: boolean (show "Taste Restoration Score" label)
 * - showBreakdown: boolean (show mini breakdown bars - for large variant)
 * - onClick: function (optional click handler for interactivity)
 */
export default function ScoreBadge({
  score,
  size = "md",
  showLabel = false,
  showBreakdown = false,
  onClick,
}) {
  // Get color gradient based on score
  const getGradient = () => {
    if (score >= 90) return "from-green-500 to-emerald-500";
    if (score >= 75) return "from-blue-500 to-indigo-500";
    if (score >= 60) return "from-yellow-500 to-amber-500";
    return "from-gray-500 to-gray-600";
  };

  const getTextColor = () => {
    if (score >= 90) return "text-green-700";
    if (score >= 75) return "text-blue-700";
    if (score >= 60) return "text-amber-700";
    return "text-gray-700";
  };

  // Size configurations
  const sizeConfig = {
    sm: {
      container: "px-3 py-1.5",
      scoreText: "text-lg font-bold",
      label: "text-xs",
    },
    md: {
      container: "px-4 py-2",
      scoreText: "text-xl font-bold",
      label: "text-sm",
    },
    lg: {
      container: "px-6 py-4",
      scoreText: "text-4xl md:text-5xl font-bold",
      label: "text-lg font-medium",
    },
    xl: {
      container: "px-8 py-6",
      scoreText: "text-6xl font-bold",
      label: "text-xl font-medium",
    },
  };

  const config = sizeConfig[size] || sizeConfig.md;

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.03, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`
        ${onClick ? "cursor-pointer" : ""}
        ${
          size === "lg" || size === "xl"
            ? `bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg`
            : "inline-block"
        }
      `}
    >
      <div
        className={`${
          size === "lg" || size === "xl"
            ? "text-center"
            : "flex items-center gap-2 bg-white rounded-full shadow-sm border border-gray-200"
        }`}
      >
        {/* Score Display */}
        <div
          className={`
          ${config.container} rounded-full
          ${
            size === "lg" || size === "xl"
              ? `bg-gradient-to-r ${getGradient()} bg-clip-text text-transparent`
              : `bg-gradient-to-r ${getGradient()} text-white`
          }
        `}
        >
          <span className={config.scoreText}>{score}/100</span>
        </div>

        {/* Label (optional) */}
        {showLabel && size !== "sm" && (
          <span
            className={`${config.label} ${getTextColor()} whitespace-nowrap ml-2`}
          >
            Taste Restoration Score
          </span>
        )}
      </div>

      {/* Mini Breakdown Bars (for large variant) */}
      {showBreakdown && (size === "lg" || size === "xl") && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[75, 85, 90, 100].map((value, index) => (
            <div key={index} className="text-center">
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${Math.min(100, (score / value) * 100)}%`,
                  }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${
                    score >= value
                      ? "bg-green-500"
                      : score >= value - 15
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                />
              </div>
              <span className="text-xs text-gray-600 mt-1 block">{value}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

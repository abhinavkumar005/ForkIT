import { motion } from "framer-motion";

export default function ConditionCard({
  condition,
  isSelected,
  onClick,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative group cursor-pointer rounded-2xl p-8 
        bg-white border-2 transition-all duration-300
        ${isSelected ? `border-purple-500 shadow-xl ${condition.glow}` : "border-transparent hover:border-purple-300"}
        ${condition.hoverGlow}
      `}
    >
      {/* Gradient overlay on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${condition.gradient} opacity-0 group-hover:opacity-5 transition-opacity rounded-2xl`}
      />

      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`text-6xl mb-4 ${condition.color}`}
      >
        {condition.icon}
      </motion.div>

      {/* Label */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {condition.label}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-lg">{condition.description}</p>

      {/* Selection indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>
      )}

      {/* Ripple effect on click */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="ripple absolute inset-0 opacity-0" />
      </div>
    </motion.div>
  );
}

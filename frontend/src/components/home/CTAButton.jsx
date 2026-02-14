import { motion } from "framer-motion";

export default function CTAButton({ onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: disabled ? 0.5 : 1,
        y: 0,
        backgroundColor: disabled ? "#9CA3AF" : undefined,
      }}
      transition={{ duration: 0.4 }}
      className={`
        relative px-12 py-4 rounded-xl font-bold text-xl text-white
        overflow-hidden transition-all duration-300
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
        }
      `}
    >
      {/* Gradient shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />

      <span className="relative z-10 flex items-center gap-2">
        Start Your Flavor Journey
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    </motion.button>
  );
}

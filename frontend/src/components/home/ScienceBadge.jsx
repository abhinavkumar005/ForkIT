import { motion } from "framer-motion";

export default function ScienceBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      whileHover={{ rotate: 5, scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />

        <div className="relative px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center gap-2 cursor-pointer">
          <span className="text-xl">🔬</span>
          <span className="font-semibold text-gray-800">
            Powered by FoodScope
          </span>

          {/* Tooltip on hover */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-3 py-1 whitespace-nowrap">
            Advanced flavor molecule analysis
          </div>
        </div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40); // 40ms * 25 steps = 1000ms, but we'll use 2000ms total

    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-purple-600 to-teal-500 flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <Particle key={i} index={i} />
            ))}
          </div>

          {/* Content Container */}
          <div className="relative z-10 text-center px-4">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="mb-8"
            >
              <div className="relative">
                {/* Glowing orb effect */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-8 bg-purple-400 rounded-full blur-3xl opacity-70"
                />

                {/* Main logo */}
                <div className="relative w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                  <motion.span
                    initial={{ rotate: -180 }}
                    animate={{ rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl"
                  >
                    🍲
                  </motion.span>
                </div>
              </div>
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-2">
                Flavor<span className="text-yellow-300">Boost</span>
              </h1>
              <p className="text-xl text-purple-100 font-medium">2.0</p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg md:text-xl text-purple-100 mb-12 max-w-2xl mx-auto"
            >
              Rebuilding flavor experiences, one recipe at a time
            </motion.p>

            {/* Progress Bar Container */}
            <div className="w-full max-w-md mx-auto mb-8">
              <div className="flex justify-between mb-2">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-sm font-medium text-purple-100"
                >
                  Loading flavor profiles...
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-sm font-medium text-purple-100"
                >
                  {Math.min(progress, 100)}%
                </motion.span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                >
                  {/* Pulsing dot at the end */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                  />
                </motion.div>
              </div>
            </div>

            {/* Loading Dots */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: [0, 1, 0],
                    y: [10, 0, -10],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: dot * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-3 h-3 bg-white rounded-full"
                />
              ))}
            </div>

            {/* Floating Food Icons */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-6">
              {["🍲", "🍜", "🍛", "🥘", "🥟"].map((icon, index) => (
                <FloatingIcon key={index} icon={icon} delay={index * 0.3} />
              ))}
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Particle Component for Background
function Particle({ index }) {
  const size = Math.random() * 60 + 20;
  const duration = Math.random() * 10 + 5;
  const delay = Math.random() * 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.3, 0],
        y: ["-100px", "100vh"],
        x: [`${x}%`, `${x + (Math.random() - 0.5) * 20}%`],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor:
          index % 2 === 0
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(139, 92, 246, 0.2)",
        filter: "blur(10px)",
        left: `${x}%`,
        top: `${y}%`,
      }}
    />
  );
}

// Floating Icon Component
function FloatingIcon({ icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: [0, -10, 0],
        rotate: [0, 10, -10, 0],
      }}
      transition={{
        duration: 2,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="text-3xl"
    >
      {icon}
    </motion.div>
  );
}

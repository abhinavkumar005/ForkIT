import { motion } from "framer-motion";

/**
 * Loader Component
 *
 * Props:
 * - size: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
 * - variant: 'spinner' | 'dots' | 'pulse' | 'bars' | 'orbit' (default: 'spinner')
 * - color: string (default: 'purple')
 * - fullScreen: boolean (default: false)
 * - message: string (optional message to display)
 * - overlay: boolean (adds semi-transparent overlay, default: false)
 */
export default function Loader({
  size = "md",
  variant = "spinner",
  color = "purple",
  fullScreen = false,
  message = "",
  overlay = false,
}) {
  // Size configurations
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  // Color configurations
  const colorClasses = {
    purple: "border-purple-500 border-t-white",
    blue: "border-blue-500 border-t-white",
    green: "border-green-500 border-t-white",
    teal: "border-teal-500 border-t-white",
    amber: "border-amber-500 border-t-white",
    red: "border-red-500 border-t-white",
  };

  // Container classes
  const containerClasses = `
    ${fullScreen ? "fixed inset-0 z-50 flex flex-col items-center justify-center" : "inline-block"}
    ${overlay ? "bg-black/20 backdrop-blur-sm" : ""}
    ${message ? "gap-4" : ""}
  `;

  return (
    <div className={containerClasses}>
      {variant === "spinner" && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className={`border-4 rounded-full border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        />
      )}

      {variant === "dots" && (
        <div
          className={`flex gap-2 ${size === "sm" ? "space-x-1" : "space-x-2"}`}
        >
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: dot * 0.2,
              }}
              className={`rounded-full bg-${color}-500 ${sizeClasses[size].replace("w-", "w-2 ").replace("h-", "h-2 ")}`}
            />
          ))}
        </div>
      )}

      {variant === "pulse" && (
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 rounded-full bg-${color}-500 opacity-50`}
          />
          <motion.div
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className={`relative rounded-full bg-${color}-600 ${sizeClasses[size]}`}
          />
        </div>
      )}

      {variant === "bars" && (
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((bar) => (
            <motion.div
              key={bar}
              animate={{
                height: ["100%", "50%", "100%"],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: bar * 0.1,
              }}
              className={`w-2 bg-${color}-500 rounded-full`}
              style={{
                height: sizeClasses[size].includes("w-24")
                  ? "4rem"
                  : sizeClasses[size].includes("w-16")
                    ? "3rem"
                    : sizeClasses[size].includes("w-12")
                      ? "2.5rem"
                      : "1.5rem",
              }}
            />
          ))}
        </div>
      )}

      {variant === "orbit" && (
        <div className="relative">
          <div
            className={`w-full h-full rounded-full border-4 border-dashed border-${color}-300 opacity-50`}
          />
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-0 left-0 w-full h-full flex items-center justify-center`}
          >
            <div className={`w-3 h-3 rounded-full bg-${color}-600`} />
          </motion.div>
        </div>
      )}

      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`text-center font-medium ${
            fullScreen
              ? "text-lg md:text-xl text-gray-800"
              : "text-sm text-gray-600"
          }`}
        >
          {message}
        </motion.p>
      )}

      {/* Floating food particles for full screen loader */}
      {fullScreen && variant === "spinner" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["🍲", "🍜", "🍛", "🥘", "🥟", "🥫", "🍅", "🧄"].map(
            (icon, index) => (
              <FloatingParticle key={index} icon={icon} delay={index * 0.3} />
            ),
          )}
        </div>
      )}
    </div>
  );
}

// Floating Particle Component for Full Screen Loader
function FloatingParticle({ icon, delay }) {
  const size = Math.random() * 20 + 15;
  const duration = Math.random() * 15 + 10;
  const startX = Math.random() * 100;
  const startY = 100 + Math.random() * 20;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: `${startX}%`,
        y: `${startY}%`,
        scale: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
        x: [`${startX}%`, `${startX + (Math.random() - 0.5) * 30}%`],
        y: [`${startY}%`, "-20%"],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute"
      style={{
        fontSize: `${size}px`,
        filter: "drop-shadow(0 0 5px rgba(0,0,0,0.2))",
      }}
    >
      {icon}
    </motion.div>
  );
}

// Full Page Loader Wrapper
export function FullPageLoader({
  message = "Loading flavor profiles...",
  variant = "spinner",
}) {
  return (
    <Loader
      fullScreen
      overlay
      size="xl"
      variant={variant}
      message={message}
      color="purple"
    />
  );
}

// Button Loader (small spinner for buttons)
export function ButtonLoader({ size = "sm", color = "white" }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`border-2 rounded-full border-t-transparent ${size === "sm" ? "w-4 h-4" : "w-5 h-5"} ${
        color === "white"
          ? "border-white border-t-transparent"
          : "border-current border-t-transparent"
      }`}
    />
  );
}

import { motion } from "framer-motion";

export default function GradientOrb({
  size = 400,
  color = "purple",
  delay = 0,
}) {
  const colors = {
    purple: "from-purple-500/20 to-pink-500/20",
    teal: "from-teal-500/20 to-cyan-500/20",
    orange: "from-orange-500/20 to-amber-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay }}
      className={`absolute rounded-full blur-3xl ${colors[color] || colors.purple}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

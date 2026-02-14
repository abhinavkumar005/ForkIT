import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: "👤",
    title: "Select Condition",
    description: "Choose who you're cooking for",
  },
  {
    number: 2,
    icon: "🍲",
    title: "Choose Category",
    description: "Pick your meal type",
  },
  {
    number: 3,
    icon: "🎯",
    title: "Discover Recipes",
    description: "Get flavor-optimized meals",
  },
];

export default function HowItWorks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto mt-24 mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        <p className="text-xl text-gray-600">
          Three simple steps to better meals
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 relative">
        {/* Timeline connector */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-teal-500 -z-10" />

        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="text-center relative z-10"
          >
            <div className="relative mb-6">
              {/* Step number circle */}
              <div className="absolute -inset-4 bg-purple-100 rounded-full blur-xl opacity-30 animate-pulse" />
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-teal-500 flex items-center justify-center mx-auto">
                <span className="text-3xl font-bold text-white">
                  {step.icon}
                </span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-lg">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

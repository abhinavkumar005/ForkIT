import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaArrowRight,
  FaLightbulb,
  FaUsers,
  FaUtensils,
  FaAward,
} from "react-icons/fa";

export default function HowItWorksPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: 1,
      icon: "👤",
      title: "Select Condition",
      subtitle: "Who are you cooking for?",
      description:
        "Choose from 5 specialized conditions: Chemotherapy, Senior (65+), Diabetic, Low Sodium, or Post-COVID. Each condition has unique flavor optimization algorithms.",
      details: [
        "Personalized for taste perception challenges",
        "Scientifically validated flavor profiles",
        "Tailored to specific dietary needs",
      ],
      gradient: "from-red-500 to-pink-500",
      color: "text-red-600",
    },
    {
      number: 2,
      icon: "🍲",
      title: "Choose Category",
      subtitle: "What type of meal?",
      description:
        "Select your preferred meal category - Soup, Main Course, Snack, or Dessert. We filter recipes based on your taste preferences and dietary restrictions.",
      details: [
        "Multiple cuisine options available",
        "Dietary restrictions automatically applied",
        "Seasonal and trending recipes included",
      ],
      gradient: "from-blue-500 to-indigo-500",
      color: "text-blue-600",
    },
    {
      number: 3,
      icon: "🎯",
      title: "Discover Recipes",
      subtitle: "Get flavor-optimized meals",
      description:
        "Our AI analyzes thousands of recipes and ranks them by Taste Restoration Score. Each recipe comes with a detailed science explanation of why it works for your condition.",
      details: [
        "Taste Restoration Score (0-100)",
        "Flavor intensity breakdown",
        "Receptor activation analysis",
        "Safety and dietary compliance",
      ],
      gradient: "from-green-500 to-emerald-500",
      color: "text-green-600",
    },
    {
      number: 4,
      icon: "🔬",
      title: "Understand the Science",
      subtitle: "Why this works for you",
      description:
        "Every recipe includes a detailed explanation of the flavor science behind it. Learn how specific compounds and cooking techniques enhance your taste experience.",
      details: [
        "Flavor molecule analysis",
        "Umami synergy breakdown",
        "Receptor pathway activation",
        "Cooking technique optimization",
      ],
      gradient: "from-purple-500 to-violet-500",
      color: "text-purple-600",
    },
  ];

  const features = [
    {
      icon: <FaUsers className="w-12 h-12" />,
      title: "Personalized for You",
      description:
        "Each recommendation is tailored to your specific taste perception challenges",
    },
    {
      icon: <FaLightbulb className="w-12 h-12" />,
      title: "Science-Backed",
      description:
        "Powered by FlavorDB and RecipeDB with molecular-level analysis",
    },
    {
      icon: <FaUtensils className="w-12 h-12" />,
      title: "Easy to Cook",
      description:
        "Simple, accessible ingredients with clear step-by-step instructions",
    },
    {
      icon: <FaAward className="w-12 h-12" />,
      title: "Clinically Validated",
      description:
        "Developed with input from nutritionists and medical professionals",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mx-auto">
                <span className="text-4xl">🎯</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent mb-6"
            >
              How FlavorBoost Works
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-gray-600 mb-8"
            >
              A simple 4-step process to rediscover the joy of eating
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
                <FaArrowRight className="inline ml-2" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Interactive Steps Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                The 4-Step Journey
              </motion.h2>
              <p className="text-xl text-gray-600">
                From selection to delicious meals
              </p>
            </div>

            {/* Steps Timeline */}
            <div className="relative max-w-6xl mx-auto">
              {/* Timeline connector */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-300 to-teal-300 -z-10" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <StepCard
                    key={index}
                    step={step}
                    index={index}
                    isActive={activeStep === index}
                    onClick={() => setActiveStep(index)}
                  />
                ))}
              </div>
            </div>

            {/* Detailed Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-16 max-w-4xl mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${steps[activeStep].gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="text-3xl">{steps[activeStep].icon}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {steps[activeStep].title}
                      </h3>
                      <p className="text-xl text-purple-600 font-medium">
                        {steps[activeStep].subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {steps[activeStep].description}
                  </p>

                  <div className="space-y-3">
                    {steps[activeStep].details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg"
                      >
                        <FaCheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-800">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features Section */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-gray-900 mb-4"
              >
                What Makes Us Special
              </motion.h2>
              <p className="text-xl text-gray-600">
                The science behind better flavor experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8"
              >
                <span className="text-5xl">🚀</span>
              </motion.div>

              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Meals?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of people who have rediscovered the joy of eating
                with FlavorBoost
              </p>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="px-12 py-4 bg-white text-purple-600 rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl transition-all"
              >
                Start Your Flavor Journey
                <FaArrowRight className="inline ml-3" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Step Card Component
function StepCard({ step, index, isActive, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        relative group cursor-pointer
        ${isActive ? "z-10" : "z-0"}
      `}
    >
      {/* Connection line for mobile */}
      {index < 3 && (
        <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-purple-300 to-teal-300" />
      )}

      <div
        className={`
        p-6 rounded-2xl transition-all duration-300
        ${
          isActive
            ? `bg-gradient-to-br ${step.gradient} text-white shadow-2xl scale-105`
            : "bg-white text-gray-900 hover:bg-gray-50"
        }
      `}
      >
        {/* Step number badge */}
        <div
          className={`
          w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-4
          ${isActive ? "bg-white/20" : `bg-gradient-to-br ${step.gradient} text-white`}
        `}
        >
          {step.number}
        </div>

        {/* Icon */}
        <div className={`text-4xl mb-3 ${step.color}`}>{step.icon}</div>

        {/* Title */}
        <h3
          className={`text-xl font-bold mb-2 ${isActive ? "text-white" : "text-gray-900"}`}
        >
          {step.title}
        </h3>

        {/* Subtitle */}
        <p
          className={`text-sm ${isActive ? "text-purple-100" : "text-gray-600"}`}
        >
          {step.subtitle}
        </p>
      </div>

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeStepIndicator"
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white"
          transition={{ type: "spring", bounce: 0.25 }}
        />
      )}
    </motion.div>
  );
}

// Feature Card Component
function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white p-8 rounded-2xl shadow-lg text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-600">
        {feature.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
}

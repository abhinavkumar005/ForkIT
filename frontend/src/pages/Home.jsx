import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CONDITIONS } from "../constants/conditions";
import ParticleBackground from "../components/ui/ParticleBackground";
import GradientOrb from "../components/ui/GradientOrb";
import HeroSection from "../components/home/HeroSection";
import ConditionCard from "../components/home/ConditionCard";
import HowItWorks from "../components/home/HowItWorks";
import ScienceBadge from "../components/home/ScienceBadge";
import CTAButton from "../components/home/CTAButton";

export default function Home() {
  const [selectedCondition, setSelectedCondition] = useState(null);
  const navigate = useNavigate();

  const handleConditionSelect = (conditionId) => {
    setSelectedCondition((prev) => (prev === conditionId ? null : conditionId));
  };

  const handleContinue = () => {
    if (selectedCondition) {
      // Navigate to category selector with condition
      navigate("/category", { state: { condition: selectedCondition } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative">
      {/* Background elements */}
      <ParticleBackground />
      <GradientOrb
        size={600}
        color="purple"
        delay={0}
        className="top-20 left-10"
      />
      <GradientOrb
        size={400}
        color="teal"
        delay={0.2}
        className="bottom-20 right-10"
      />
      <GradientOrb
        size={300}
        color="orange"
        delay={0.4}
        className="top-1/2 right-1/4"
      />

      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Condition Selector */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Who are you cooking for today?
              </h2>
              <p className="text-xl text-gray-600">
                Select a condition to get started
              </p>
            </div>

            {/* Condition Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {CONDITIONS.map((condition, index) => (
                <ConditionCard
                  key={condition.id}
                  condition={condition}
                  isSelected={selectedCondition === condition.id}
                  onClick={() => handleConditionSelect(condition.id)}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-24">
            <CTAButton onClick={handleContinue} disabled={!selectedCondition} />
          </div>

          {/* How It Works Section */}
          <HowItWorks />
        </div>
      </div>

      {/* Science Badge */}
      <ScienceBadge />
    </div>
  );
}

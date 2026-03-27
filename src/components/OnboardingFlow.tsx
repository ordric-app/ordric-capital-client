import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PiggyBank, HandCoins, HeartPulse, AppWindow, ChevronRight, X } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

const slides = [
  {
    title: 'Save with Confidence',
    text: 'Join Mutual Fund Stokvel and grow your money monthly.',
    icon: <PiggyBank size={80} />,
    color: '#832267'
  },
  {
    title: 'Access Quick Loans',
    text: 'Apply for personal or staff loans with simple steps.',
    icon: <HandCoins size={80} />,
    color: '#9d4283'
  },
  {
    title: 'Debt Recovery Services',
    text: 'Submit and track debt recovery cases easily.',
    icon: <HeartPulse size={80} />,
    color: '#832267'
  },
  {
    title: 'All Services in One App',
    text: 'Insurance, financial wellness, and compliance support.',
    icon: <AppWindow size={80} />,
    color: '#9d4283'
  }
];

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col p-24 bg-white"
    >
      <div className="flex justify-end p-8">
        <button onClick={onSkip} className="text-light flex items-center gap-4 text-sm font-medium">
          Skip <X size={16} />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="flex flex-col items-center"
          >
            <div 
              className="mb-40 p-24 rounded-3xl"
              style={{ backgroundColor: '#fdf4f9', color: slides[currentSlide].color }}
            >
              {slides[currentSlide].icon}
            </div>
            <h2 className="mb-20">{slides[currentSlide].title}</h2>
            <p className="max-w-xs">{slides[currentSlide].text}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mb-40">
        <div className="dots-container mb-32">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`}
            />
          ))}
        </div>

        <button className="btn btn-primary" onClick={nextSlide}>
          {currentSlide === slides.length - 1 ? 'Start Banking' : 'Explore'}
          <ChevronRight size={20} className="ml-8" />
        </button>
      </div>
    </motion.div>
  );
};

export default OnboardingFlow;

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onLogin }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col p-24 bg-white"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="mb-32 p-16 rounded-full"
          style={{ backgroundColor: '#fdf4f9', color: '#832267' }}
        >
          <ShieldCheck size={64} />
        </motion.div>
        
        <h1 className="mb-20">Welcome to Ordric Capital</h1>
        <p className="mb-40" style={{ maxWidth: '280px' }}>
          Save, borrow, and manage your finances in one place with confidence.
        </p>
      </div>

      <div className="flex flex-col gap-16 mb-20">
        <button className="btn btn-primary" onClick={onStart}>
          Get Started
          <ChevronRight size={20} className="ml-8" />
        </button>
        <button className="btn btn-secondary" onClick={onLogin}>
          Login
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;

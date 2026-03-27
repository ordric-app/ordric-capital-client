import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-24 text-center bg-white"
      style={{ height: '100vh' }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="mb-24"
      >
        <img src={logo} alt="Ordric Capital Logo" style={{ width: '180px', height: 'auto' }} />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 style={{ fontSize: '24px', letterSpacing: '0.5px' }}>ORDRIC CAPITAL</h1>
        <p className="mt-20" style={{ color: '#d4af37', fontWeight: 500, fontStyle: 'italic' }}>
          "Financial Growth Made Simple"
        </p>
      </motion.div>

      <motion.div 
        className="mt-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="dot active" style={{ margin: '0 auto' }}></div>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;

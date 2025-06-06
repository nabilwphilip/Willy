
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function WillyLoader() {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + '.' : '.');
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-black"
    >
      <div className="relative w-40 h-40 mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full rounded-full bg-gradient-to-br from-brand-gold via-brand-gold-light to-brand-gold-dark shadow-gold-lg flex items-center justify-center"
        >
          <motion.div 
            className="text-4xl font-bold text-brand-black font-playfair"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            W
          </motion.div>
        </motion.div>
        
        {/* Animated rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-brand-gold"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-brand-gold"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1.4, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
        />
      </div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl font-playfair text-brand-gold mb-2">Willy</h2>
        <div className="text-white font-opensans">
          Loading{dots}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WillyLoader;


import React, { useEffect, useRef } from 'react';
import { BrandType } from '@/contexts/DataContext';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { motion } from 'framer-motion';

interface InfiniteLogosProps {
  brands: BrandType[];
}

const InfiniteLogos: React.FC<InfiniteLogosProps> = ({ brands }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || brands.length === 0) return;

    const scrollContainer = scrollRef.current;
    let animationId: number;
    let position = 0;

    const scroll = () => {
      position += 0.3; // Adjusted scroll speed for smoother animation
      if (position >= scrollContainer.scrollWidth / 2) {
        position = 0;
      }
      scrollContainer.scrollLeft = position;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [brands]);

  // If there are no brands, return early
  if (brands.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden py-8">
      <div
        ref={scrollRef}
        className="flex items-center whitespace-nowrap overflow-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Display brands twice to create the infinite scrolling effect */}
        {[...brands, ...brands].map((brand, index) => (
          <HoverCard key={`${brand.id}-${index}`}>
            <HoverCardTrigger asChild>
              <motion.div
                className="inline-flex items-center justify-center min-w-[180px] sm:min-w-[200px] p-6 mx-6"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-16 md:h-20 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  title={brand.name}
                />
              </motion.div>
            </HoverCardTrigger>
            <HoverCardContent className="w-64 p-4 shadow-lg backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700">
              <div className="flex justify-center flex-col items-center space-y-3">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-full shadow-inner">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-12 w-auto object-contain" 
                  />
                </div>
                <p className="text-center font-medium text-lg">{brand.name}</p>
                <p className="text-xs text-center text-muted-foreground">Trusted Partner</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default InfiniteLogos;

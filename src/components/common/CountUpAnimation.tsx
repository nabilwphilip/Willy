
import { useState, useEffect, useRef } from 'react';

interface CountUpAnimationProps {
  end: number;
  duration?: number;
  start?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  useEasing?: boolean;
}

export function CountUpAnimation({
  end,
  duration = 2000,
  start = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = ',',
  useEasing = true,
}: CountUpAnimationProps) {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  // Format number with separators and decimals
  const formatNumber = (num: number) => {
    return (
      prefix +
      num
        .toFixed(decimals)
        .replace(/\B(?=(\d{3})+(?!\d))/g, separator) +
      suffix
    );
  };

  useEffect(() => {
    // Easing function
    const easeOutQuintic = (t: number): number => {
      return 1 + (--t) * t * t * t * t;
    };

    const easeLinear = (t: number): number => {
      return t;
    };

    // Animation loop
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const delta = end - start;
      const progressRatio = Math.min(progress / duration, 1);
      
      // Apply easing if enabled
      const easingFn = useEasing ? easeOutQuintic : easeLinear;
      const easedProgress = easingFn(progressRatio);
      
      const nextCount = start + delta * easedProgress;
      countRef.current = nextCount;
      setCount(nextCount);

      if (progressRatio < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation
    frameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [start, end, duration, useEasing]);

  return <>{formatNumber(count)}</>;
}

export default CountUpAnimation;

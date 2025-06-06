
import { useEffect } from 'react';

export function usePerformance() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      return;
    }

    // LCP monitoring
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log('Performance metric:', {
          name: entry.name,
          value: entry.startTime,
          type: entry.entryType
        });
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const measurePageLoad = () => {
    if (performance.timing) {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      console.log('Page load time:', loadTime, 'ms');
    }
  };

  return { measurePageLoad };
}

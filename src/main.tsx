
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Performance optimizations
const root = createRoot(document.getElementById("root")!);

// Render immediately for better perceived performance
root.render(<App />);

// Optimize for performance after first render
document.addEventListener('DOMContentLoaded', () => {
  // Preload important resources with high priority
  const resourcesToPreload = [
    { src: '/willy-logo.svg', as: 'image' },
    { src: '/placeholder.svg', as: 'image' }
  ];
  
  resourcesToPreload.forEach(({ src, as }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Remove unused CSS classes (simple detection)
  const observer = new MutationObserver(() => {
    // Basic unused CSS detection could be implemented here
    // For production, consider using tools like PurgeCSS
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// Service Worker registration for caching (if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // In production, register a service worker for caching
    console.log('Service Worker support detected');
  });
}

// Performance monitoring
if (typeof window !== 'undefined') {
  // Monitor render blocking resources
  window.addEventListener('load', () => {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      console.log('Navigation metrics:', {
        domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.domContentLoadedEventStart,
        loadComplete: navigationEntry.loadEventEnd - navigationEntry.loadEventStart,
        firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime,
        firstContentfulPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint')?.startTime
      });
    }
  });
}

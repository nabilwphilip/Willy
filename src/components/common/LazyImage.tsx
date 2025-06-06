
import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  title?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({ 
  src, 
  alt, 
  className, 
  placeholder = '/placeholder.svg',
  title,
  onLoad,
  onError 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
  }, [onError]);

  const refCallback = useCallback((node: HTMLImageElement | null) => {
    if (node) {
      setImageRef(node);
      
      // Use Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              img.src = src;
              observer.unobserve(img);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(node);
      
      return () => observer.disconnect();
    }
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={refCallback}
        alt={alt}
        title={title || alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        loading="lazy"
        decoding="async"
        itemProp="image"
      />
      {!isLoaded && !hasError && (
        <img
          src={placeholder}
          alt=""
          className={cn("absolute inset-0 opacity-50", className)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default LazyImage;

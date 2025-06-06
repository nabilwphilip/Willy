
import React from 'react';
import LazyImage from '@/components/common/LazyImage';
import { cn } from '@/lib/utils';

interface SEOImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  keywords?: string[];
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function SEOImage({ 
  src, 
  alt, 
  title, 
  className, 
  keywords = [],
  placeholder,
  onLoad,
  onError 
}: SEOImageProps) {
  // Generate SEO-optimized alt text
  const optimizedAlt = keywords.length > 0 
    ? `${alt} - ${keywords.slice(0, 3).join(', ')}`
    : alt;
  
  // Generate title attribute for additional SEO value
  const imageTitle = title || optimizedAlt;
  
  return (
    <LazyImage
      src={src}
      alt={optimizedAlt}
      className={cn(className)}
      placeholder={placeholder}
      onLoad={onLoad}
      onError={onError}
      title={imageTitle}
    />
  );
}

export default SEOImage;

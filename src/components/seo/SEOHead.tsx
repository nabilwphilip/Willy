
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSEO } from '@/contexts/SEOContext';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords: string[];
  structuredData?: object;
  ogImage?: string;
}

export function SEOHead({ title, description, keywords, structuredData, ogImage }: SEOHeadProps) {
  const { setSEO } = useSEO();
  const location = useLocation();
  
  useEffect(() => {
    const canonical = `${window.location.origin}${location.pathname}`;
    
    setSEO({
      title: `${title} | Willy - Professional Portfolio`,
      description,
      keywords,
      canonical,
      ogImage: ogImage || '/willy-logo.svg',
      structuredData
    });
  }, [setSEO, title, description, keywords, location.pathname, structuredData, ogImage]);
  
  return null;
}

export default SEOHead;

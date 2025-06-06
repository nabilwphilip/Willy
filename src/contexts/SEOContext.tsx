
import React, { createContext, useContext, useEffect } from 'react';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

interface SEOContextType {
  setSEO: (data: SEOData) => void;
  generateSitemap: () => string;
}

const SEOContext = createContext<SEOContextType | undefined>(undefined);

export function SEOProvider({ children }: { children: React.ReactNode }) {
  const setSEO = (data: SEOData) => {
    // Set page title
    document.title = data.title;
    
    // Set meta description
    updateMetaTag('description', data.description);
    
    // Set meta keywords
    if (data.keywords.length > 0) {
      updateMetaTag('keywords', data.keywords.join(', '));
    }
    
    // Set canonical URL
    if (data.canonical) {
      updateLinkTag('canonical', data.canonical);
    }
    
    // Set Open Graph tags
    updateMetaTag('og:title', data.title, 'property');
    updateMetaTag('og:description', data.description, 'property');
    updateMetaTag('og:type', 'website', 'property');
    
    if (data.ogImage) {
      updateMetaTag('og:image', data.ogImage, 'property');
    }
    
    // Set structured data
    if (data.structuredData) {
      updateStructuredData(data.structuredData);
    }
  };
  
  const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  
  const updateLinkTag = (rel: string, href: string) => {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };
  
  const updateStructuredData = (data: object) => {
    // Remove existing structured data
    const existing = document.querySelector('script[type="application/ld+json"]');
    if (existing) {
      existing.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(data);
    document.head.appendChild(script);
  };
  
  const generateSitemap = () => {
    const baseUrl = window.location.origin;
    const routes = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/about', priority: '0.8', changefreq: 'monthly' },
      { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
      { path: '/experience', priority: '0.7', changefreq: 'monthly' },
      { path: '/testimonials', priority: '0.6', changefreq: 'monthly' },
      { path: '/blog', priority: '0.8', changefreq: 'weekly' },
      { path: '/contact', priority: '0.7', changefreq: 'monthly' }
    ];
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;
    
    return sitemap;
  };
  
  return (
    <SEOContext.Provider value={{ setSEO, generateSitemap }}>
      {children}
    </SEOContext.Provider>
  );
}

export function useSEO() {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
}


// This file provides utilities for managing website settings

/**
 * Applies the current website settings to the document
 * This is useful when settings are loaded or changed
 * 
 * @param settings The website settings object
 */
export const applyWebsiteSettings = (settings: any) => {
  const { appearance, seo } = settings;
  
  // Apply theme
  if (appearance?.theme) {
    const htmlElement = document.documentElement;
    
    if (appearance.theme === 'dark') {
      htmlElement.classList.add('dark');
    } else if (appearance.theme === 'light') {
      htmlElement.classList.remove('dark');
    } else if (appearance.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        htmlElement.classList.add('dark');
      } else {
        htmlElement.classList.remove('dark');
      }
    }
  }
  
  // Apply SEO settings
  if (seo?.siteTitle) {
    document.title = seo.siteTitle;
  }
  
  // Update meta description
  if (seo?.siteDescription) {
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.siteDescription);
  }
  
  // Update meta keywords
  if (seo?.siteKeywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seo.siteKeywords);
  }
};

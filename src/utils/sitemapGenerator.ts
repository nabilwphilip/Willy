
interface SitemapRoute {
  path: string;
  priority: string;
  changefreq: string;
  lastmod?: string;
}

export class SitemapGenerator {
  private routes: SitemapRoute[] = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/portfolio', priority: '0.9', changefreq: 'weekly' },
    { path: '/experience', priority: '0.7', changefreq: 'monthly' },
    { path: '/testimonials', priority: '0.6', changefreq: 'monthly' },
    { path: '/blog', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' }
  ];

  public generateXML(): string {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://yoursite.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    const urlEntries = this.routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${route.lastmod || currentDate}</lastmod>
  </url>`).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  }

  public downloadSitemap(): void {
    const xml = this.generateXML();
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  }

  public addRoute(route: SitemapRoute): void {
    this.routes.push(route);
  }

  public updateRoute(path: string, updates: Partial<SitemapRoute>): void {
    const index = this.routes.findIndex(route => route.path === path);
    if (index !== -1) {
      this.routes[index] = { ...this.routes[index], ...updates };
    }
  }
}

export const sitemapGenerator = new SitemapGenerator();

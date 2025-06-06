
export class ResourcePreloader {
  private static instance: ResourcePreloader;
  private preloadedResources = new Set<string>();

  static getInstance(): ResourcePreloader {
    if (!ResourcePreloader.instance) {
      ResourcePreloader.instance = new ResourcePreloader();
    }
    return ResourcePreloader.instance;
  }

  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.preloadedResources.has(src)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  preloadCriticalResources(): Promise<void[]> {
    const criticalImages = [
      '/willy-logo.svg',
      '/placeholder.svg'
    ];

    return Promise.all(
      criticalImages.map(src => this.preloadImage(src))
    );
  }

  preloadRoute(routePath: string): void {
    // Preload route-specific resources
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = routePath;
    document.head.appendChild(link);
  }
}

export const preloader = ResourcePreloader.getInstance();

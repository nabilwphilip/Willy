
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { SEOProvider } from '@/contexts/SEOContext';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { useEffect, useState, Suspense, lazy } from 'react';
import { applyWebsiteSettings } from '@/utils/settingsUtils';
import { preloader } from '@/utils/preloader';
import { usePerformance } from '@/hooks/usePerformance';
import WillyLoader from '@/components/common/WillyLoader';

// Layouts
import MainLayout from '@/components/layout/MainLayout';
import AdminLayout from '@/components/layout/AdminLayout';

// Main Pages - Lazy loaded for better performance
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const PortfolioItem = lazy(() => import('@/pages/PortfolioItem'));
const Experience = lazy(() => import('@/pages/Experience'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const Testimonials = lazy(() => import('@/pages/Testimonials'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Admin Pages - Lazy loaded
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const AdminPortfolio = lazy(() => import('@/pages/admin/Portfolio'));
const AdminExperience = lazy(() => import('@/pages/admin/Experience'));
const AdminEducation = lazy(() => import('@/pages/admin/Education'));
const AdminTestimonials = lazy(() => import('@/pages/admin/Testimonials'));
const AdminBlog = lazy(() => import('@/pages/admin/Blog'));
const AdminProfile = lazy(() => import('@/pages/admin/Profile'));
const AdminSettings = lazy(() => import('@/pages/admin/Settings'));
const AdminBrands = lazy(() => import('@/pages/admin/Brands'));

// Toast notifications
import { Toaster } from "@/components/ui/sonner";

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { measurePageLoad } = usePerformance();

  // Apply settings and preload critical resources
  useEffect(() => {
    const initializeApp = async () => {
      // Apply saved settings
      const savedSettings = localStorage.getItem('websiteSettings');
      if (savedSettings) {
        try {
          const settings = JSON.parse(savedSettings);
          applyWebsiteSettings(settings);
        } catch (e) {
          console.error('Error parsing settings from localStorage:', e);
        }
      }

      // Preload critical resources
      try {
        await preloader.preloadCriticalResources();
      } catch (error) {
        console.warn('Failed to preload some resources:', error);
      }

      // Simulate loading time for the loader to be visible
      const timer = setTimeout(() => {
        setLoading(false);
        measurePageLoad();
      }, 1500);

      return () => clearTimeout(timer);
    };

    initializeApp();
  }, [measurePageLoad]);

  if (loading) {
    return <WillyLoader />;
  }

  return (
    <>
      <Toaster />
      <Suspense fallback={<WillyLoader />}>
        <Routes>
          {/* Main Layout Routes */}
          <Route element={<MainLayout><Outlet /></MainLayout>}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="portfolio/:projectId" element={<PortfolioItem />} />
            <Route path="experience" element={<Experience />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:id" element={<BlogPost />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Admin Login Route - Not Protected */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes - All wrapped in RequireAuth */}
          <Route path="/admin" element={
            <RequireAuth>
              <AdminLayout>
                <Outlet />
              </AdminLayout>
            </RequireAuth>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="portfolio" element={<AdminPortfolio />} />
            <Route path="experience" element={<AdminExperience />} />
            <Route path="education" element={<AdminEducation />} />
            <Route path="testimonials" element={<AdminTestimonials />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="brands" element={<AdminBrands />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SEOProvider>
          <AuthProvider>
            <DataProvider>
              <AppContent />
            </DataProvider>
          </AuthProvider>
        </SEOProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

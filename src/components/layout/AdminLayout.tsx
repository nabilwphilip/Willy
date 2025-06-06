
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  Briefcase, 
  Folder, 
  BookOpen, 
  MessageSquare, 
  Settings,
  LogOut,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive: boolean;
}

function SidebarItem({ icon, label, href, isActive }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-brand-yellow/10 text-brand-yellow'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when route changes on mobile
  React.useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Admin routes
  const adminRoutes = [
    { path: '/admin', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/admin/portfolio', label: 'Portfolio', icon: <Folder size={20} /> },
    { path: '/admin/experience', label: 'Experience', icon: <Briefcase size={20} /> },
    { path: '/admin/education', label: 'Education', icon: <BookOpen size={20} /> },
    { path: '/admin/testimonials', label: 'Testimonials', icon: <MessageSquare size={20} /> },
    { path: '/admin/blog', label: 'Blog', icon: <BookOpen size={20} /> },
    { path: '/admin/brands', label: 'Brands', icon: <Award size={20} /> },
    { path: '/admin/profile', label: 'Profile', icon: <User size={20} /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar for desktop */}
      <aside
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2">
              <span className="text-xl font-bold text-brand-yellow">Admin</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="p-4">
          {/* User Profile */}
          <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.avatar || ''} alt={user?.name || ''} />
                <AvatarFallback>{user?.name?.[0] || 'A'}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">{user?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {adminRoutes.map((route) => (
              <SidebarItem
                key={route.path}
                icon={route.icon}
                label={route.label}
                href={route.path}
                isActive={location.pathname === route.path}
              />
            ))}
            
            {/* Logout */}
            <Button
              variant="ghost"
              className="w-full flex items-center gap-3 px-4 py-3 justify-start rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={handleLogout}
            >
              <LogOut size={20} />
              <span>Logout</span>
            </Button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 py-4 px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {adminRoutes.find((route) => route.path === location.pathname)?.label || 'Admin Panel'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Back to site button - Using Link for proper React Router navigation */}
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden md:flex"
              >
                <Link to="/">View Site</Link>
              </Button>
              
              {/* User dropdown for mobile */}
              <div className="lg:hidden relative">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar || ''} alt={user?.name || ''} />
                    <AvatarFallback>{user?.name?.[0] || 'A'}</AvatarFallback>
                  </Avatar>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;


import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  company?: string;
  socialLinks?: SocialLinks;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  company?: string;
  socialLinks?: SocialLinks;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (data: UpdateUserData) => Promise<void>;
}

const fakeUser = {
  id: '1',
  name: 'Nabil William',
  email: 'nabilwphilip@gmail.com',
  avatar: '/placeholder.svg',
  bio: 'Experienced influencer marketing specialist with a proven track record of successful campaigns across multiple niches.',
  location: 'Mansoura, Egypt',
  phone: '+201156782182',
  website: 'https://nabilwilliam.com',
  company: 'Tag Company',
  socialLinks: {
    twitter: 'https://twitter.com/nabillwilliam',
    linkedin: 'https://linkedin.com/in/nabilwilliam',
    instagram: 'https://instagram.com/nabilwphilip',
    facebook: 'https://facebook.com/nabillwilliam',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      // This is a fake login implementation
      if (email === 'nabilwilliam@gmail.com' && password === 'Admin-nabilwilliam') {
        // Check if we have a saved user already
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          // Use the stored user data with any customizations
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } else {
          // First time login - use the default user
          setUser(fakeUser);
          localStorage.setItem('user', JSON.stringify(fakeUser));
        }
        
        toast.success('Successfully logged in!');
        // Navigation happens in the Login component with useEffect
      } else {
        toast.error('Invalid email or password');
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
  const logout = () => {
    // Clear user from state but don't remove from localStorage
    // so that profile customizations persist between sessions
    setUser(null);
    navigate('/admin/login');
    toast.success('Successfully logged out!');
  };

  const updateUserProfile = async (data: UpdateUserData): Promise<void> => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        if (user) {
          // Update user with new data
          const updatedUser = { ...user, ...data };
          
          // Update state
          setUser(updatedUser);
          
          // Persist to localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          console.log('User profile updated and saved to localStorage:', updatedUser);
        }
        resolve();
      }, 500);
    });
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      updateUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

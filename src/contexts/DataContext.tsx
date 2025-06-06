
import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface SkillType {
  id: string;
  name: string;
  percentage: number;
  category: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExperienceType {
  id: string;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  is_currently: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EducationType {
  id: string;
  degree: string;
  institution: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  image: string;
  images?: string[];
  tags: string[];
  category: string;
  demo_url?: string;
  code_url?: string;
  campaign_duration?: string;
  completion_date?: string;
  engagement_rate?: string;
  reach?: string;
  conversion?: string;
  campaign_strategy?: string;
  campaign_highlights?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialType {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPostType {
  id: string;
  title: string;
  summary: string;
  content: string;
  cover_image: string;
  tags: string[];
  published_date: string;
  read_time: number;
  published: boolean;
  author_name?: string;
  author_title?: string;
  author_avatar?: string;
  author_bio?: string;
  created_at?: string;
  updated_at?: string;
}

export interface StatType {
  id: string;
  label: string;
  value: number;
  icon: string;
  created_at?: string;
  updated_at?: string;
}

export interface BrandType {
  id: string;
  name: string;
  logo: string;
  created_at?: string;
  updated_at?: string;
}

interface DataContextType {
  skills: SkillType[];
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  experiences: ExperienceType[];
  setExperiences: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  education: EducationType[];
  setEducation: React.Dispatch<React.SetStateAction<EducationType[]>>;
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  testimonials: TestimonialType[];
  setTestimonials: React.Dispatch<React.SetStateAction<TestimonialType[]>>;
  blogPosts: BlogPostType[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPostType[]>>;
  stats: StatType[];
  setStats: React.Dispatch<React.SetStateAction<StatType[]>>;
  brands: BrandType[];
  setBrands: React.Dispatch<React.SetStateAction<BrandType[]>>;
  refreshData: () => void;
  addItem: <T extends { id: string }>(key: string, item: T, setterFunction: React.Dispatch<React.SetStateAction<T[]>>) => void;
  updateItem: <T extends { id: string }>(key: string, item: T, setterFunction: React.Dispatch<React.SetStateAction<T[]>>) => void;
  deleteItem: <T extends { id: string }>(key: string, id: string, setterFunction: React.Dispatch<React.SetStateAction<T[]>>) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [skills, setSkills] = useState<SkillType[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [education, setEducation] = useState<EducationType[]>([]);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [stats, setStats] = useState<StatType[]>([]);
  const [brands, setBrands] = useState<BrandType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Load data from Supabase
  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [
        skillsData,
        experiencesData,
        educationData,
        projectsData,
        testimonialsData,
        blogPostsData,
        statsData,
        brandsData
      ] = await Promise.all([
        supabase.from('skills').select('*').order('created_at', { ascending: false }),
        supabase.from('experiences').select('*').order('start_date', { ascending: false }),
        supabase.from('education').select('*').order('start_date', { ascending: false }),
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('published_date', { ascending: false }),
        supabase.from('stats').select('*').order('created_at', { ascending: false }),
        supabase.from('brands').select('*').order('created_at', { ascending: false })
      ]);

      if (skillsData.data) setSkills(skillsData.data);
      if (experiencesData.data) setExperiences(experiencesData.data.map(exp => ({
        ...exp,
        isCurrently: exp.is_currently,
        startDate: exp.start_date,
        endDate: exp.end_date
      })));
      if (educationData.data) setEducation(educationData.data.map(edu => ({
        ...edu,
        startDate: edu.start_date,
        endDate: edu.end_date
      })));
      if (projectsData.data) setProjects(projectsData.data.map(proj => ({
        ...proj,
        demoUrl: proj.demo_url,
        codeUrl: proj.code_url,
        campaignDuration: proj.campaign_duration,
        completionDate: proj.completion_date,
        engagementRate: proj.engagement_rate,
        campaignStrategy: proj.campaign_strategy,
        campaignHighlights: proj.campaign_highlights
      })));
      if (testimonialsData.data) setTestimonials(testimonialsData.data);
      if (blogPostsData.data) setBlogPosts(blogPostsData.data.map(post => ({
        ...post,
        coverImage: post.cover_image,
        publishedDate: post.published_date,
        readTime: post.read_time,
        author: post.author_name ? {
          name: post.author_name,
          title: post.author_title || '',
          avatar: post.author_avatar || '',
          bio: post.author_bio
        } : undefined
      })));
      if (statsData.data) setStats(statsData.data);
      if (brandsData.data) setBrands(brandsData.data);

    } catch (error) {
      console.error('Error loading data from Supabase:', error);
      toast.error('Failed to load data from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  
  // Generic functions for CRUD operations with Supabase
  const addItem = async <T extends { id: string }>(key: string, item: T, setterFunction: React.Dispatch<React.SetStateAction<T[]>>) => {
    try {
      const tableName = getTableName(key);
      const itemData = transformItemForDatabase(key, item);
      
      const { data, error } = await supabase
        .from(tableName)
        .insert([itemData])
        .select()
        .single();

      if (error) {
        console.error(`Error adding ${key}:`, error);
        toast.error(`Failed to add ${key.slice(0, -1)}`);
        return;
      }

      const transformedData = transformItemFromDatabase(key, data);
      setterFunction(prev => [transformedData, ...prev]);
      toast.success(`New ${key.slice(0, -1)} added successfully`);
    } catch (error) {
      console.error(`Error adding ${key}:`, error);
      toast.error(`Failed to add ${key.slice(0, -1)}`);
    }
  };
  
  const updateItem = async <T extends { id: string }>(key: string, item: T, setterFunction: React.Dispatch<React.SetStateAction<T[]>>) => {
    try {
      const tableName = getTableName(key);
      const itemData = transformItemForDatabase(key, item);
      
      const { data, error } = await supabase
        .from(tableName)
        .update({ ...itemData, updated_at: new Date().toISOString() })
        .eq('id', item.id)
        .select()
        .single();

      if (error) {
        console.error(`Error updating ${key}:`, error);
        toast.error(`Failed to update ${key.slice(0, -1)}`);
        return;
      }

      const transformedData = transformItemFromDatabase(key, data);
      setterFunction(prev => prev.map(i => i.id === item.id ? transformedData : i));
      toast.success(`${key.slice(0, -1)} updated successfully`);
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      toast.error(`Failed to update ${key.slice(0, -1)}`);
    }
  };
  
  const deleteItem = async <T extends { id: string }>(key: string, id: string, setterFunction: React.Dispatch<React.SetStateAction<T[]>>) => {
    try {
      const tableName = getTableName(key);
      
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (error) {
        console.error(`Error deleting ${key}:`, error);
        toast.error(`Failed to delete ${key.slice(0, -1)}`);
        return;
      }

      setterFunction(prev => prev.filter(i => i.id !== id));
      toast.success(`${key.slice(0, -1)} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${key}:`, error);
      toast.error(`Failed to delete ${key.slice(0, -1)}`);
    }
  };

  // Helper functions to map frontend keys to database table names
  const getTableName = (key: string): string => {
    const tableMap: { [key: string]: string } = {
      'skills': 'skills',
      'experiences': 'experiences',
      'education': 'education',
      'projects': 'projects',
      'testimonials': 'testimonials',
      'blogPosts': 'blog_posts',
      'stats': 'stats',
      'brands': 'brands'
    };
    return tableMap[key] || key;
  };

  // Transform data for database storage (convert camelCase to snake_case)
  const transformItemForDatabase = (key: string, item: any) => {
    switch (key) {
      case 'experiences':
        return {
          ...item,
          start_date: item.startDate || item.start_date,
          end_date: item.endDate || item.end_date,
          is_currently: item.isCurrently || item.is_currently
        };
      case 'education':
        return {
          ...item,
          start_date: item.startDate || item.start_date,
          end_date: item.endDate || item.end_date
        };
      case 'projects':
        return {
          ...item,
          demo_url: item.demoUrl,
          code_url: item.codeUrl,
          campaign_duration: item.campaignDuration,
          completion_date: item.completionDate,
          engagement_rate: item.engagementRate,
          campaign_strategy: item.campaignStrategy,
          campaign_highlights: item.campaignHighlights
        };
      case 'blogPosts':
        return {
          ...item,
          cover_image: item.coverImage || item.cover_image,
          published_date: item.publishedDate || item.published_date,
          read_time: item.readTime || item.read_time,
          author_name: item.author?.name,
          author_title: item.author?.title,
          author_avatar: item.author?.avatar,
          author_bio: item.author?.bio
        };
      default:
        return item;
    }
  };

  // Transform data from database (convert snake_case to camelCase)
  const transformItemFromDatabase = (key: string, item: any) => {
    switch (key) {
      case 'experiences':
        return {
          ...item,
          startDate: item.start_date,
          endDate: item.end_date,
          isCurrently: item.is_currently
        };
      case 'education':
        return {
          ...item,
          startDate: item.start_date,
          endDate: item.end_date
        };
      case 'projects':
        return {
          ...item,
          demoUrl: item.demo_url,
          codeUrl: item.code_url,
          campaignDuration: item.campaign_duration,
          completionDate: item.completion_date,
          engagementRate: item.engagement_rate,
          campaignStrategy: item.campaign_strategy,
          campaignHighlights: item.campaign_highlights
        };
      case 'blogPosts':
        return {
          ...item,
          coverImage: item.cover_image,
          publishedDate: item.published_date,
          readTime: item.read_time,
          author: item.author_name ? {
            name: item.author_name,
            title: item.author_title || '',
            avatar: item.author_avatar || '',
            bio: item.author_bio
          } : undefined
        };
      default:
        return item;
    }
  };
  
  const refreshData = () => {
    loadData();
  };

  return (
    <DataContext.Provider value={{
      skills, setSkills,
      experiences, setExperiences,
      education, setEducation,
      projects, setProjects,
      testimonials, setTestimonials,
      blogPosts, setBlogPosts,
      stats, setStats,
      brands, setBrands,
      refreshData,
      addItem,
      updateItem,
      deleteItem,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

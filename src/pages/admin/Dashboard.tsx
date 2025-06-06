
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/contexts/DataContext';
import { 
  Users, 
  Folder, 
  FileText, 
  MessageSquare, 
  RefreshCw, 
  Award, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  Target,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

export function Dashboard() {
  const {
    projects,
    blogPosts,
    testimonials,
    skills,
    experiences,
    education,
    stats,
    brands,
    refreshData
  } = useData();
  
  const handleRefresh = () => {
    if (window.confirm('This will reset all data to default values. Are you sure?')) {
      refreshData();
      toast.success('All data has been reset to defaults');
    }
  };
  
  // Calculate comprehensive metrics
  const publishedPosts = blogPosts.filter(post => post.published).length;
  const draftPosts = blogPosts.length - publishedPosts;
  const avgTestimonialRating = testimonials.reduce((acc, t) => acc + (t.rating || 5), 0) / testimonials.length;
  const totalYearsExperience = experiences.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    return acc + (end.getFullYear() - start.getFullYear());
  }, 0);
  
  // Website performance insights
  const websiteInsights = {
    contentHealth: Math.round((publishedPosts / Math.max(blogPosts.length, 1)) * 100),
    portfolioCompleteness: Math.round((projects.length / 10) * 100), // Assuming 10 is ideal
    testimonialStrength: Math.round((avgTestimonialRating / 5) * 100),
    brandPartnerships: brands.length,
    skillsDiversity: skills.length
  };
  
  // Growth suggestions based on data
  const suggestions = [
    {
      type: publishedPosts < 5 ? 'warning' : 'success',
      title: 'Content Strategy',
      message: publishedPosts < 5 
        ? 'Publish more blog posts to improve SEO and showcase expertise' 
        : 'Great content strategy! Keep publishing regularly',
      action: publishedPosts < 5 ? 'Create Blog Post' : 'Continue Writing',
      link: '/admin/blog'
    },
    {
      type: projects.length < 8 ? 'warning' : 'success',
      title: 'Portfolio Growth',
      message: projects.length < 8 
        ? 'Add more projects to showcase your full range of skills' 
        : 'Excellent portfolio diversity!',
      action: projects.length < 8 ? 'Add Project' : 'Update Projects',
      link: '/admin/portfolio'
    },
    {
      type: testimonials.length < 5 ? 'warning' : 'success',
      title: 'Social Proof',
      message: testimonials.length < 5 
        ? 'Collect more testimonials to build trust with potential clients' 
        : 'Strong testimonial base!',
      action: testimonials.length < 5 ? 'Request Testimonials' : 'Manage Testimonials',
      link: '/admin/testimonials'
    },
    {
      type: skills.length < 15 ? 'info' : 'success',
      title: 'Skills Portfolio',
      message: skills.length < 15 
        ? 'Add more skills to highlight your expertise breadth' 
        : 'Comprehensive skills showcase!',
      action: 'Update Skills',
      link: '/admin/experience'
    }
  ];
  
  // Data for enhanced charts
  const projectsByCategory = Array.from(
    projects.reduce((acc, project) => {
      acc.set(project.category, (acc.get(project.category) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
    ([name, value]) => ({ name, value })
  );
  
  const skillsByCategory = Array.from(
    skills.reduce((acc, skill) => {
      acc.set(skill.category, (acc.get(skill.category) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
    ([name, value]) => ({ name, value })
  );

  // Monthly blog activity (simulated data)
  const blogActivity = [
    { month: 'Jan', posts: 2, views: 1200 },
    { month: 'Feb', posts: 3, views: 1800 },
    { month: 'Mar', posts: 1, views: 900 },
    { month: 'Apr', posts: 4, views: 2400 },
    { month: 'May', posts: 2, views: 1600 },
    { month: 'Jun', posts: 3, views: 2100 }
  ];

  // Performance metrics
  const performanceData = [
    { name: 'Content Health', value: websiteInsights.contentHealth, color: '#f4d03f' },
    { name: 'Portfolio Complete', value: websiteInsights.portfolioCompleteness, color: '#52c41a' },
    { name: 'Testimonial Strength', value: websiteInsights.testimonialStrength, color: '#1890ff' },
    { name: 'Brand Partnerships', value: Math.min(brands.length * 20, 100), color: '#722ed1' }
  ];

  const COLORS = ['#f4d03f', '#52c41a', '#1890ff', '#722ed1'];

  return (
    <div className="space-y-8 p-1">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-gold to-yellow-600 bg-clip-text text-transparent">
            Website Analytics Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights and actionable recommendations
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="sm" className="shrink-0">
          <RefreshCw className="mr-2 h-4 w-4" /> Reset Data
        </Button>
      </div>
      
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Projects</CardTitle>
            <Folder className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-800 dark:text-blue-200">{projects.length}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              {projects.length > 5 ? 'Excellent portfolio' : 'Building portfolio'}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Blog Posts</CardTitle>
            <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-800 dark:text-green-200">{blogPosts.length}</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              {publishedPosts} published, {draftPosts} drafts
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Client Reviews</CardTitle>
            <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-800 dark:text-purple-200">{testimonials.length}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400 flex items-center">
              <Star className="h-3 w-3 mr-1 fill-current" />
              {avgTestimonialRating.toFixed(1)} avg rating
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Experience</CardTitle>
            <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-800 dark:text-orange-200">{totalYearsExperience}+</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">Years total experience</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Brand Partners</CardTitle>
            <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-800 dark:text-yellow-200">{brands.length}</div>
            <p className="text-xs text-yellow-600 dark:text-yellow-400">Trusted partnerships</p>
          </CardContent>
        </Card>
      </div>

      {/* Website Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Website Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceData.map((item, index) => (
              <div key={item.name} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg mb-2`} 
                     style={{ backgroundColor: item.color }}>
                  {item.value}%
                </div>
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Smart Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className={`p-4 rounded-lg border ${
                suggestion.type === 'success' ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800' :
                suggestion.type === 'warning' ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800' :
                'bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {suggestion.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {suggestion.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      {suggestion.type === 'info' && <Target className="h-4 w-4 text-blue-600" />}
                      <h4 className="font-semibold">{suggestion.title}</h4>
                      <Badge variant={suggestion.type === 'success' ? 'default' : suggestion.type === 'warning' ? 'destructive' : 'secondary'}>
                        {suggestion.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.message}</p>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link to={suggestion.link}>{suggestion.action}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Enhanced Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={blogActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name === 'posts' ? 'Blog Posts' : 'Views']}
                    labelStyle={{ color: 'black' }}
                  />
                  <Area type="monotone" dataKey="views" stackId="1" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="posts" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectsByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {projectsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsByCategory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip 
                  formatter={(value) => [`${value} skills`, 'Count']}
                  labelStyle={{ color: 'black' }}
                />
                <Bar dataKey="value" fill="#aeb6bf" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Actions - Enhanced */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Management Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:shadow-md transition-shadow" asChild>
              <Link to="/admin/portfolio">
                <Folder className="h-6 w-6" />
                <span className="text-sm">Manage Portfolio</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:shadow-md transition-shadow" asChild>
              <Link to="/admin/blog">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Manage Blog</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:shadow-md transition-shadow" asChild>
              <Link to="/admin/experience">
                <Users className="h-6 w-6" />
                <span className="text-sm">Manage Experience</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:shadow-md transition-shadow" asChild>
              <Link to="/admin/testimonials">
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm">Manage Testimonials</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 hover:shadow-md transition-shadow" asChild>
              <Link to="/admin/brands">
                <Award className="h-6 w-6" />
                <span className="text-sm">Manage Brands</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;

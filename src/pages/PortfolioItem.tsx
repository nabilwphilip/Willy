
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github, Users, TrendingUp, Target } from 'lucide-react';
import { useData } from '@/contexts/DataContext';
import { ProjectType } from '@/contexts/DataContext';

export function PortfolioItem() {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, blogPosts } = useData();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Find the project with matching ID
  useEffect(() => {
    if (projectId && projects.length > 0) {
      const foundProject = projects.find(p => p.id === projectId);
      setProject(foundProject || null);
      
      // Find related blog posts (if they have matching tags with the project)
      if (foundProject && blogPosts) {
        const related = blogPosts.filter(post => 
          post.tags && foundProject.tags && 
          post.tags.some(tag => foundProject.tags.includes(tag))
        ).slice(0, 3);
        setRelatedBlogs(related);
      }
    }
  }, [projectId, projects, blogPosts]);

  // Handle project not found
  if (!project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Campaign Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The campaign you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/portfolio">Back to Campaigns</Link>
        </Button>
      </div>
    );
  }

  // Get all available images or fallback to main image
  const campaignImages = project.images && project.images.length > 0 
    ? project.images 
    : [project.image];

  return (
    <div className="py-16 container mx-auto px-4">
      {/* Back Button */}
      <Button variant="outline" className="mb-8" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      
      {/* Campaign Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-sm bg-brand-gold/10 text-brand-gold rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Campaign Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-4">
          {/* Main Image */}
          <div className="rounded-lg overflow-hidden shadow-gold-md aspect-video">
            <img 
              src={campaignImages[selectedImageIndex]} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnails */}
          {campaignImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {campaignImages.map((img, index) => (
                <div 
                  key={index}
                  className={`
                    aspect-video rounded-md overflow-hidden cursor-pointer border-2
                    ${selectedImageIndex === index ? 'border-brand-gold' : 'border-transparent'}
                  `}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img 
                    src={img} 
                    alt={`${project.title} - image ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-6 shadow-gold-sm sticky top-24">
            <h3 className="text-xl font-bold font-playfair mb-6 text-brand-gold border-b border-brand-gold/20 pb-3">Campaign Details</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Category</h4>
                <p className="font-medium text-lg">{project.category}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Platforms</h4>
                <p className="font-medium">{project.tags.join(', ')}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Campaign Duration</h4>
                <p className="font-medium">{project.campaignDuration || '4 weeks'}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400">Completed</h4>
                <p className="font-medium">{project.completionDate || 'June 2023'}</p>
              </div>
              
              <div className="pt-4 space-y-4">
                {project.demoUrl && (
                  <Button className="w-full bg-brand-gold hover:bg-brand-gold-dark text-black" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> View Campaign Results
                    </a>
                  </Button>
                )}
                
                {project.codeUrl && (
                  <Button variant="outline" className="w-full border-brand-gold/50 hover:border-brand-gold" asChild>
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View Resources
                    </a>
                  </Button>
                )}
                
                <Button variant="ghost" className="w-full hover:text-brand-gold" asChild>
                  <Link to="/contact">
                    Contact Me About This Campaign
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Campaign Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          {/* Campaign Overview */}
          <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-8 mb-8 shadow-gold-sm">
            <h2 className="text-2xl font-bold font-playfair mb-4 text-brand-gold">Campaign Overview</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 whitespace-pre-line">
              {project.description}
            </p>
            
            {/* Campaign KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="bg-brand-black/30 p-5 rounded-lg border border-brand-gold/30 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-brand-gold" />
                <h3 className="text-lg font-semibold mb-1">Engagement Rate</h3>
                <p className="text-2xl font-playfair text-brand-gold">{project.engagementRate || '8.7%'}</p>
              </div>
              <div className="bg-brand-black/30 p-5 rounded-lg border border-brand-gold/30 text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-brand-gold" />
                <h3 className="text-lg font-semibold mb-1">Reach</h3>
                <p className="text-2xl font-playfair text-brand-gold">{project.reach || '2.4M'}</p>
              </div>
              <div className="bg-brand-black/30 p-5 rounded-lg border border-brand-gold/30 text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-brand-gold" />
                <h3 className="text-lg font-semibold mb-1">Conversion</h3>
                <p className="text-2xl font-playfair text-brand-gold">{project.conversion || '3.2%'}</p>
              </div>
            </div>
          </div>
          
          {/* Campaign Strategy */}
          <div className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg p-8 mb-8 shadow-gold-sm">
            <h2 className="text-2xl font-bold font-playfair mb-4 text-brand-gold">Campaign Strategy</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {project.campaignStrategy || 
                "This campaign was developed with a focus on audience engagement and brand authenticity. I used modern marketing strategies and analytics tools to ensure the campaign reached the target demographic effectively and created measurable results for the client."}
            </p>
            
            <h3 className="text-xl font-bold font-playfair mb-4 text-brand-gold">Campaign Highlights</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 mb-6 pl-4">
              {project.campaignHighlights ? (
                project.campaignHighlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))
              ) : (
                <>
                  <li>Carefully selected influencer partnerships aligned with brand values</li>
                  <li>Data-driven content strategy optimized for engagement</li>
                  <li>Multi-platform approach for maximum reach</li>
                  <li>Authentic storytelling that resonated with target audiences</li>
                  <li>Comprehensive performance tracking and ROI measurement</li>
                </>
              )}
            </ul>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* Content moved to above the campaign details */}
        </div>
      </div>
      
      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold font-playfair mb-6 text-brand-gold">Related Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map(blog => (
              <div key={blog.id} className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg overflow-hidden shadow-gold-sm hover:shadow-gold-md transition-all">
                <Link to={`/blog/${blog.id}`} className="block">
                  <img 
                    src={blog.coverImage || '/placeholder.svg'} 
                    alt={blog.title} 
                    className="w-full h-40 object-cover" 
                  />
                </Link>
                <div className="p-4">
                  <h3 className="font-bold mb-2">
                    <Link to={`/blog/${blog.id}`} className="hover:text-brand-gold">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                    {blog.excerpt || blog.content?.substring(0, 100)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Related Campaigns */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold font-playfair mb-6 text-brand-gold">More Campaigns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects
            .filter(p => p.id !== project.id)
            .slice(0, 3)
            .map(relatedProject => (
              <div 
                key={relatedProject.id} 
                className="bg-white/5 backdrop-blur-sm border border-brand-gold/20 rounded-lg overflow-hidden shadow-gold-sm hover:shadow-gold-md transition-all"
              >
                <Link to={`/portfolio/${relatedProject.id}`} className="block relative">
                  <img 
                    src={relatedProject.image} 
                    alt={relatedProject.title} 
                    className="w-full h-40 object-cover" 
                  />
                </Link>
                <div className="p-5">
                  <h3 className="font-bold mb-1">
                    <Link 
                      to={`/portfolio/${relatedProject.id}`} 
                      className="hover:text-brand-gold transition-colors"
                    >
                      {relatedProject.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {relatedProject.category}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import FilterTabs from '@/components/common/FilterTabs';
import { useData } from '@/contexts/DataContext';
import { ProjectType } from '@/contexts/DataContext';
export function Portfolio() {
  const {
    projects
  } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>(projects);
  const [isAnimating, setIsAnimating] = useState(false);

  // Extract unique categories from projects
  const categories = Array.from(new Set(projects.map(project => project.category)));
  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => {
      if (activeCategory === 'all') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(project => project.category === activeCategory));
      }
      setIsAnimating(false);
    }, 300);
  }, [activeCategory, projects]);
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  return <>
      {/* Hero Section */}
      <section className="md:py-24 bg-gray-50 dark:bg-gray-900 py-[25px]">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading title="My Portfolio" subtitle="Showcasing successful influencer marketing campaigns across different niches" />
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filter Tabs */}
          <FilterTabs categories={categories} activeCategory={activeCategory} onChange={handleCategoryChange} className="flex justify-center mb-12" />

          {/* Projects Grid */}
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isAnimating ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}>
            {filteredProjects.map(project => <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Link to={`/portfolio/${project.id}`} className="block relative group">
                  <img src={project.image} alt={project.title} className="w-full h-52 object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-white font-medium">View Details</span>
                  </div>
                </Link>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    <Link to={`/portfolio/${project.id}`} className="hover:text-brand-yellow transition-colors">
                      {project.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                        {tag}
                      </span>)}
                    {project.tags.length > 3 && <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                        +{project.tags.length - 3}
                      </span>}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-brand-yellow font-medium">
                      {project.category}
                    </span>
                    
                    <div className="flex gap-2">
                      <Button size="sm" asChild className="rounded-full">
                        <Link to={`/portfolio/${project.id}`}>
                          View Details
                        </Link>
                      </Button>
                      {project.demoUrl && <Button size="sm" variant="outline" asChild className="rounded-full">
                          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            View Campaign
                          </a>
                        </Button>}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No projects found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No projects match the selected category.
              </p>
              <Button onClick={() => setActiveCategory('all')}>View All Projects</Button>
            </div>}
        </div>
      </section>
    </>;
}
export default Portfolio;
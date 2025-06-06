import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { useData } from '@/contexts/DataContext';

export function Blog() {
  const { blogPosts } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Get only published blog posts
  const publishedPosts = blogPosts.filter(post => post.published);
  
  // Filter posts by search query and tag
  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesTag;
  });
  
  // Extract all unique tags from posts
  const allTags = Array.from(
    new Set(
      publishedPosts.flatMap(post => post.tags)
    )
  ).sort();

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading 
            title="Blog" 
            subtitle="Thoughts, insights, and tutorials about web development and design" 
          />
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-yellow dark:bg-gray-800 dark:text-gray-100"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {filteredPosts.length > 0 ? (
                <div className="space-y-8">
                  {/* Featured Post */}
                  {filteredPosts.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                      <Link to={`/blog/${filteredPosts[0].id}`}>
                        <img
                          src={filteredPosts[0].coverImage}
                          alt={filteredPosts[0].title}
                          className="w-full h-80 object-cover"
                        />
                      </Link>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {filteredPosts[0].tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-brand-yellow/10 text-brand-yellow rounded-full cursor-pointer"
                              onClick={() => setSelectedTag(tag)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-3">
                          <Link to={`/blog/${filteredPosts[0].id}`} className="hover:text-brand-yellow transition-colors">
                            {filteredPosts[0].title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {filteredPosts[0].summary}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(filteredPosts[0].publishedDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{filteredPosts[0].readTime} min read</span>
                            </div>
                          </div>
                          
                          <Button variant="link" asChild>
                            <Link to={`/blog/${filteredPosts[0].id}`}>
                              Read More <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Other Posts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPosts.slice(1).map((post) => (
                      <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <Link to={`/blog/${post.id}`}>
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                          />
                        </Link>
                        <div className="p-5">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-brand-yellow/10 text-brand-yellow rounded-full cursor-pointer"
                                onClick={() => setSelectedTag(tag)}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <h3 className="text-xl font-bold mb-2">
                            <Link to={`/blog/${post.id}`} className="hover:text-brand-yellow transition-colors">
                              {post.title}
                            </Link>
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {post.summary}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-xs">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                <span>{formatDate(post.publishedDate)}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{post.readTime} min</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No posts found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {searchQuery || selectedTag
                      ? "No posts match your search criteria."
                      : "There are no blog posts available at the moment."}
                  </p>
                  {(searchQuery || selectedTag) && (
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedTag(null);
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Tags Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Tags
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {selectedTag && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSelectedTag(null)}
                      className="mb-2"
                    >
                      Clear Tag
                    </Button>
                  )}
                  
                  {allTags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-colors ${
                        selectedTag === tag
                          ? 'bg-brand-yellow text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Recent Posts */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6">
                <h3 className="text-lg font-bold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Recent Posts
                </h3>
                
                <div className="space-y-4">
                  {publishedPosts.slice(0, 4).map((post) => (
                    <div key={post.id} className="flex items-start">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded mr-3 flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-medium line-clamp-2">
                          <Link to={`/blog/${post.id}`} className="hover:text-brand-yellow transition-colors">
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{formatDate(post.publishedDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-brand-yellow rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-2 text-white">Subscribe to Newsletter</h3>
                <p className="text-white/80 mb-4 text-sm">
                  Get the latest posts delivered straight to your inbox.
                </p>
                
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
                    />
                  </div>
                  <Button type="submit" variant="secondary" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;

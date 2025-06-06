
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Clock, Users, Calendar } from 'lucide-react';
import CountUpAnimation from '@/components/common/CountUpAnimation';
import InfiniteLogos from '@/components/common/InfiniteLogos';
import { useData } from '@/contexts/DataContext';

export function Home() {
  const {
    stats,
    projects,
    testimonials,
    brands
  } = useData();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);
  const renderStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle':
        return <CheckCircle className="w-8 h-8 text-brand-gold" />;
      case 'Users':
        return <Users className="w-8 h-8 text-brand-gold" />;
      case 'Clock':
        return <Clock className="w-8 h-8 text-brand-gold" />;
      case 'Calendar':
        return <Calendar className="w-8 h-8 text-brand-gold" />;
      default:
        return <CheckCircle className="w-8 h-8 text-brand-gold" />;
    }
  };
  
  return <>
      {/* Hero Section */}
      <section className="py-20 md:py-32 flex items-center min-h-[calc(100vh-6rem)] hero-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <span className="px-3 py-1 text-sm font-medium bg-brand-gold/10 text-brand-gold rounded-full">
                Welcome to my portfolio
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-playfair">
                Hi, I'm <span className="text-brand-gold">Nabil William</span>
                <br />
                
              </h1>
              <p className="text-lg md:text-xl text-brand-gray-dark dark:text-brand-gray-light max-w-xl">
                Experienced in influencer marketing and tech, specializing in data-driven strategies, 
                blending creativity with technical skills to deliver impactful, results-driven marketing solutions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-white" asChild>
                  <Link to="/portfolio">View My Work</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10" asChild>
                  <a href="https://wa.me/201156782182" target="_blank" rel="noopener noreferrer">
                    Contact Me
                  </a>
                </Button>
              </div>
            </div>
            <div className={`flex justify-center ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}>
              <div className="relative group">
                {/* Background glowing circles for extra effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-gold/30 to-brand-gold-light/30 blur-2xl scale-110 group-hover:scale-125 transition-transform duration-700"></div>
                <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-xl scale-105 group-hover:scale-115 transition-transform duration-500"></div>
                
                {/* Main image container */}
                <div className="relative">
                  <img 
                    src="/lovable-uploads/11865847-9999-4d12-9c80-737f808205a9.png" 
                    alt="Nabil William" 
                    className="relative z-10 w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full object-cover border-4 border-brand-gold/50 shadow-2xl shadow-brand-gold/30 group-hover:border-brand-gold group-hover:shadow-brand-gold/50 transition-all duration-500 group-hover:scale-105" 
                  />
                  
                  {/* Decorative floating elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-gold rounded-full opacity-80 animate-pulse"></div>
                  <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-brand-gold-light rounded-full opacity-60 animate-pulse delay-300"></div>
                  <div className="absolute top-1/4 -left-8 w-4 h-4 bg-brand-gold rounded-full opacity-70 animate-pulse delay-700"></div>
                  <div className="absolute bottom-1/3 -right-6 w-5 h-5 bg-brand-gold-light rounded-full opacity-50 animate-pulse delay-1000"></div>
                  
                  {/* Orbiting ring */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-gold/30 scale-110 animate-spin" style={{animationDuration: '20s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section
      <section className="bg-brand-gray-light dark:bg-brand-black py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => <div key={stat.id} className="flex flex-col items-center p-8 rounded-lg bg-white dark:bg-brand-gray-dark shadow-sm transition-transform hover:scale-105 border border-brand-gold/30 dark:border-brand-gold/10" style={{
            animationDelay: `${index * 0.2}s`
          }}>
                <div className="mb-2">{renderStatIcon(stat.icon)}</div>
                <h3 className="text-4xl font-bold mb-2 text-brand-gold dark:text-brand-gold font-playfair">
                  {isVisible ? <CountUpAnimation end={stat.value} duration={2000} suffix={stat.label.includes('Hours') ? '+' : ''} /> : '0'}
                </h3>
                <p className="text-brand-gray-dark dark:text-brand-gray-light text-center">{stat.label}</p>
              </div>)}
          </div>
        </div>
      </section> */}

      {/* Featured Projects */}
      <section className="py-20 bg-white dark:bg-brand-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Featured Projects</h2>
            <p className="text-brand-gray-dark dark:text-brand-gray-light max-w-2xl mx-auto">
              Explore some of my recent work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map(project => <div key={project.id} className="bg-white dark:bg-brand-gray-dark rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg hover:-translate-y-1">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 font-playfair">{project.title}</h3>
                  <p className="text-brand-gray-dark dark:text-brand-gray-light mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => <span key={tag} className="px-2 py-1 text-xs bg-brand-gold/10 text-brand-gold rounded-full">
                        {tag}
                      </span>)}
                  </div>
                  <div className="flex justify-end">
                    <Button variant="link" size="sm" className="text-brand-gold" asChild>
                      <Link to={`/portfolio/${project.id}`}>
                        View Project <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>)}
          </div>

          <div className="text-center mt-12">
            <Button className="bg-brand-gold hover:bg-brand-gold-dark text-white" asChild>
              <Link to="/portfolio">
                View All Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-brand-gray-light dark:bg-brand-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">What Clients Say</h2>
            <p className="text-brand-gray-dark dark:text-brand-gray-light max-w-2xl mx-auto">
              Feedback from clients I've worked with
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white dark:bg-brand-gray-dark p-8 rounded-xl shadow-md border border-brand-gold/10">
              {testimonials.length > 0 && <>
                  <p className="text-lg text-brand-gray-dark dark:text-brand-gray-light mb-6 italic">
                    "{testimonials[0].content}"
                  </p>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img src={testimonials[0].avatar} alt={testimonials[0].name} className="w-12 h-12 rounded-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold font-playfair">{testimonials[0].name}</h4>
                      <p className="text-sm text-brand-gray-dark dark:text-brand-gray-light">
                        {testimonials[0].role}, {testimonials[0].company}
                      </p>
                    </div>
                  </div>
                </>}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" className="border-brand-gold text-brand-gold hover:bg-brand-gold/10" asChild>
              <Link to="/testimonials">
                Read More Testimonials <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-white dark:bg-brand-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-heading">Trusted By Great Companies</h2>
            <p className="text-brand-gray-dark dark:text-brand-gray-light max-w-2xl mx-auto">
              Proud to collaborate with these amazing organizations
            </p>
          </div>

          <InfiniteLogos brands={brands} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-brand-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-black font-playfair">Ready to start your project?</h2>
          <p className="text-xl mb-8 text-brand-black/80 max-w-2xl mx-auto">
            Let's work together to create something amazing. Contact me to discuss your project needs.
          </p>
          <Button size="lg" variant="secondary" className="bg-brand-black text-brand-gold hover:bg-brand-gray-dark" asChild>
            <a href="https://wa.me/201156782182" target="_blank" rel="noopener noreferrer">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </>;
}
export default Home;

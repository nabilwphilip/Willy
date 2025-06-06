
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import SEOHead from '@/components/seo/SEOHead';
import SEOImage from '@/components/seo/SEOImage';
import { useData } from '@/contexts/DataContext';
import { Star } from 'lucide-react';
import InfiniteLogos from '@/components/common/InfiniteLogos';

export function Testimonials() {
  const { testimonials, brands } = useData();

  // SEO data for testimonials page
  const seoData = {
    title: "Client Testimonials & Reviews",
    description: "Read authentic reviews and testimonials from satisfied clients. Discover why businesses choose Willy for their professional needs and see real results.",
    keywords: [
      "client testimonials",
      "customer reviews", 
      "professional feedback",
      "client satisfaction",
      "success stories",
      "business reviews",
      "portfolio reviews",
      "Willy testimonials"
    ],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Willy Professional Services",
      "url": window.location.origin,
      "review": testimonials.map(testimonial => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": testimonial.name
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": testimonial.rating,
          "bestRating": 5
        },
        "reviewBody": testimonial.content,
        "publisher": {
          "@type": "Organization",
          "name": testimonial.company
        }
      }))
    }
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <>
      <SEOHead {...seoData} />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Client Testimonials & Reviews</h1>
          <SectionHeading 
            title="" 
            subtitle="What people are saying about working with me" 
          />
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Authentic Client Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
              >
                {/* Rating Stars */}
                <div className="flex mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                
                {/* Testimonial Content */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                {/* Author Info */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <SEOImage
                      src={testimonial.avatar}
                      alt={`${testimonial.name} - ${testimonial.role} at ${testimonial.company}`}
                      className="w-12 h-12 rounded-full object-cover"
                      keywords={["client photo", "testimonial", testimonial.company]}
                      title={`Photo of ${testimonial.name}`}
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infinite Scroll Testimonials */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-2xl font-bold text-center">More Client Reviews</h2>
        </div>
        
        <div className="relative w-full">
          <div className="animate-infinite-scroll inline-flex gap-4">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-md w-80 flex-shrink-0"
              >
                <div className="flex mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <SEOImage
                      src={testimonial.avatar}
                      alt={`${testimonial.name} client testimonial`}
                      className="w-8 h-8 rounded-full object-cover"
                      keywords={["client", "review", "testimonial"]}
                    />
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Trusted by Great Companies</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Join the growing list of satisfied clients who have experienced exceptional results
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center justify-center p-4 hover:scale-110 transition-transform">
                <SEOImage
                  src={brand.logo} 
                  alt={`${brand.name} company logo - trusted client`}
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  title={`${brand.name} - Trusted Partner`}
                  keywords={["client logo", "trusted company", brand.name]}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Video (Placeholder) */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Hear directly from my clients about their experience working with me
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="relative pb-[56.25%]">
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mx-auto mb-4 text-gray-400"
                    role="img"
                    aria-label="Video testimonial placeholder"
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                  <h3 className="text-lg font-medium">Client Video Testimonial</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">(Video player placeholder)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Testimonials;

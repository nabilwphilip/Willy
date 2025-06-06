
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import InfiniteLogos from '@/components/common/InfiniteLogos';
import { useData } from '@/contexts/DataContext';
import { motion } from 'framer-motion';

export function Experience() {
  const { experiences, education, brands } = useData();

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Experience Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="My Experience"
            subtitle="A journey through various roles and projects"
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {experiences.map((exp) => (
              <motion.div 
                key={exp.id} 
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
                variants={item}
              >
                <h3 className="text-xl font-bold mb-2">{exp.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{exp.company} | {exp.location}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar className="inline-block mr-1" size={16} />
                  {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Education"
            subtitle="My academic qualifications and achievements"
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {education.map((edu) => (
              <motion.div 
                key={edu.id} 
                className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-lg transition-all"
                variants={item}
              >
                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{edu.institution} | {edu.location}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                  <Calendar className="inline-block mr-1" size={16} />
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
                <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Companies Section */}
      <section className="py-16 bg-white dark:bg-brand-black">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Companies I've Worked With"
            subtitle="Proud to have collaborated with these industry leaders"
          />

          <div className="mb-8">
            <InfiniteLogos brands={brands} />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-12">
            {brands.slice(0, 5).map((brand) => (
              <motion.div 
                key={brand.id}
                className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              >
                <div className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-inner mb-4">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <p className="text-center font-medium text-sm mt-2">{brand.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Experience;

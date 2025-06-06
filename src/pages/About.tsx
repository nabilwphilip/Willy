
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { useData } from '@/contexts/DataContext';

export function About() {
  const { skills } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredSkills, setFilteredSkills] = useState(skills);

  // Extract unique categories from skills
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => skill.category === activeCategory));
    }
  }, [activeCategory, skills]);

  return <>
      {/* About Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading title="About Me" align="left" />
              <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
                As an accomplished Indirect Marketing Specialist with 5+ years of experience in Influencer Marketing, 
                I excel at designing and executing high-impact strategies that help brands achieve their marketing goals 
                and foster meaningful audience engagement. My expertise lies in leveraging influencer partnerships to build 
                authentic connections between brands and their target consumers.
              </p>
              
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Beyond my marketing acumen, I possess a strong technical background, including proficiency in Agile 
                methodologies and the Software Development Life Cycle (SDLC). A certified graduate of Egypt's Information 
                Technology Institute (ITI), I am skilled in Python, SQL Server, C#, JavaScript, and other programming languages. 
                This unique combination of marketing creativity and technical expertise allows me to develop data-driven, 
                innovative solutions that deliver measurable results.
              </p>
              
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                I specialize in:
                <br />✔ Crafting strategic influencer campaigns that align with brand objectives
                <br />✔ Analyzing market trends and optimizing campaign performance
                <br />✔ Building long-term relationships with influencers and brands for sustained success
                <br /><br />
                With a passion for data-informed marketing and a knack for bridging creativity with technology, 
                I drive campaigns that resonate with audiences and deliver real business impact.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button asChild>
                  <a href="/path-to-resume.pdf" download>
                    Download CV <Download className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="https://wa.me/201156782182" target='_blank'>
                    Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img src="/lovable-uploads/11865847-9999-4d12-9c80-737f808205a9.png" alt="William Brown" className="rounded-lg shadow-xl w-full max-w-md mx-auto" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-brand-gold rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-gray/30 dark:bg-brand-gray/10 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <SectionHeading title="My Skills" subtitle="I've worked with a variety of technologies and tools throughout my career" />

          {/* Skill Categories */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Button variant={activeCategory === 'all' ? 'default' : 'outline'} onClick={() => setActiveCategory('all')} className="rounded-full">
              All
            </Button>
            {categories.map(category => <Button key={category} variant={activeCategory === category ? 'default' : 'outline'} onClick={() => setActiveCategory(category)} className="rounded-full">
                {category}
              </Button>)}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map(skill => <div key={skill.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm transition-transform hover:shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{skill.name}</h3>
                  <span className="text-sm font-medium text-brand-yellow">
                    {skill.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-brand-yellow h-2.5 rounded-full" style={{
                width: `${skill.percentage}%`
              }}></div>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {skill.category}
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionHeading title="Licenses & Certifications" subtitle="Professional certifications and credentials" />

          <div className="space-y-8 max-w-4xl mx-auto">
            {/* UiPath Certifications */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h3 className="text-2xl font-bold mb-6">UiPath Certifications</h3>
              
              <div className="space-y-6">
                {/* Cert 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Automation Developer Professional Training</h4>
                  <p className="text-brand-yellow font-medium">Issued by UiPath – Nov 2024 | Expires Nov 2026</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-3">Credential ID: 121492881</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://credentials.uipath.com/5a5126fc-da3d-4f13-b6f6-e0473c91baa6#acc.CgSBT36q" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      Show Credential <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>

                {/* Cert 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Automation Developer Associate Training</h4>
                  <p className="text-brand-yellow font-medium">Issued by UiPath – Sep 2024 | Expires Sep 2026</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Credential ID: 115418083</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Skills: UiPath, Robotic Process Automation (RPA), Process Automation</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://credentials.uipath.com/98922c68-3eb7-43e7-9c9f-2f99886a1d57#acc.wT41RSNQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      Show Credential <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>

                {/* Cert 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Automation Explorer Training</h4>
                  <p className="text-brand-yellow font-medium">Issued by UiPath – Sep 2024 | Expires Sep 2026</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-3">Credential ID: 115417255</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://credentials.uipath.com/4c7ee30d-81ac-4dd7-afe8-6b819c667bdf#acc.yiWgMBCl" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      Show Credential <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Google Data Analytics Certificates */}
            <div className="border-b border-gray-200 dark:border-gray-700 pb-8">
              <h3 className="text-2xl font-bold mb-6">Google Data Analytics Certificates</h3>
              
              <div className="space-y-6">
                {/* Cert 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Foundations: Data, Data, Everywhere</h4>
                  <p className="text-brand-yellow font-medium">Issued by Google – Dec 2023</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Skills: SQL, Data Visualization, Data Cleaning</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.coursera.org/account/accomplishments/verify/5E6J9J2S7VYF" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      Show Credential <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>

                {/* Cert 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Prepare Data For Exploration</h4>
                  <p className="text-brand-yellow font-medium">Issued by Google – Dec 2023</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Skills: Metadata, Metadata Management, Data Ethics, Data Collection</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.coursera.org/account/accomplishments/verify/4DMFNAGB93D7" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      Show Credential <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>

                {/* Cert 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Ask Questions to Make Data-Driven Decisions</h4>
                  <p className="text-brand-yellow font-medium">Issued by Google – Nov 2023</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">Skills: Decision-Making, Questionnaires, Data Analytics, Problem Solving, Spreadsheets, Google Sheets</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.coursera.org/account/accomplishments/verify/NB8JJHXHXFMX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                      Show Credential <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Other Certifications */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Other Certifications</h3>
              
              <div className="space-y-6">
                {/* Cert 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Data Analysis Challenger Track</h4>
                  <p className="text-brand-yellow font-medium">Issued by Udacity – Nov 2021</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-3">Credential ID: 4DRGESQP</p>
                </div>

                {/* Cert 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Data Analysis Track</h4>
                  <p className="text-brand-yellow font-medium">Issued by Udacity – Sep 2020</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-3">Credential ID: NSLU33MH</p>
                </div>

                {/* Cert 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="text-lg font-semibold">Investment Foundations</h4>
                  <p className="text-brand-yellow font-medium">Issued by CFA Institute – Dec 2020</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-3">Credential ID: 302230</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 md:py-20 bg-brand-yellow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Want to work together?</h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/contact">
              Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>;
}

export default About;

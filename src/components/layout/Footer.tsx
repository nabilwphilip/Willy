
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-brand-yellow">
              Willy
            </Link>
            <p className="text-gray-400 text-sm">
              Influencer Marketing Manager is a professional responsible for planning, executing, and managing influencer marketing campaigns.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2">
              <Link to="/about" className="block text-gray-400 hover:text-brand-yellow transition-colors">
                About
              </Link>
              <Link to="/portfolio" className="block text-gray-400 hover:text-brand-yellow transition-colors">
                Portfolio
              </Link>
              <Link to="/experience" className="block text-gray-400 hover:text-brand-yellow transition-colors">
                Experience
              </Link>
              <Link to="/blog" className="block text-gray-400 hover:text-brand-yellow transition-colors">
                Blog
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-brand-yellow transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Influencer Identification & Outreach</li>
              <li>Campaign Strategy & Planning</li>
              <li>Content Creation & Management</li>
              <li>Analytics & Reporting</li>
              <li>Influencer Relationship Management (IRM)</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <a 
                href="https://mail.google.com/mail"  target='_blank'
                className="flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-colors"
              >
                <Mail size={16} />
                nabilwphilip@gmail.com
              </a>
              <a 
                href="tel:+201156782182" target='_blank'
                className="flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-colors"
              >
                <Phone size={16} />
                +20 (11) 567 82182
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={16} />
                Mansoura, Egypt
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Willy. All rights reserved.
          </p>
          
          <div className="flex gap-4 mt-4 md:mt-0">
            <a 
              href="https://github.com/nabilwphilip" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-yellow transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com/in/nabilwilliam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-yellow transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="https://twitter.com/nabillwilliam" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-yellow transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a 
              href="https://instagram.com/nabilwphilip" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-brand-yellow transition-colors"
              aria-label="Twitter"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

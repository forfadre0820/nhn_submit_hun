import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Github, Palette, ChevronDown } from 'lucide-react';

interface Card3DProps {
  title: string;
  description: string;
  className?: string;
}

export const Card3D: React.FC<Card3DProps> = ({ title, description, className = "" }) => {
  return (
    <motion.div 
      className={`card-wrapper ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="card-3d group">
        {/* Logo circles */}
        <div className="logo-circles">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="circle circle-4"></div>
          <div className="circle circle-5">
            <Palette className="w-5 h-5 text-black" />
          </div>
        </div>
        
        {/* Glass overlay */}
        <div className="glass-overlay"></div>
        
        {/* Content */}
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
        
        {/* Bottom section */}
        <div className="card-bottom">
          <div className="social-buttons">
            <button className="social-btn">
              <Instagram className="w-4 h-4 text-white" />
            </button>
            <button className="social-btn">
              <Twitter className="w-4 h-4 text-white" />
            </button>
            <button className="social-btn">
              <Github className="w-4 h-4 text-white" />
            </button>
          </div>
          <div className="view-more">
            <button className="view-more-btn">view more</button>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
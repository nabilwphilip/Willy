
import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const textAlign = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={`${textAlign[align]} mb-12 ${className}`}>
      <h2 className="section-heading relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-brand-yellow rounded"></span>
      </h2>
      {subtitle && <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

export default SectionHeading;

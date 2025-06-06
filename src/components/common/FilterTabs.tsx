
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
  className?: string;
}

export function FilterTabs({
  categories,
  activeCategory,
  onChange,
  className = '',
}: FilterTabsProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <Button
        variant={activeCategory === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('all')}
        className="rounded-full"
      >
        All
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChange(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}

export default FilterTabs;

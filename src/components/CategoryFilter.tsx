'use client';

import React from 'react';
import { CATEGORIES } from '@/lib/sources';
import { CategoryId } from '@/types';
import { UtensilsCrossed, ChefHat, Store, Sparkles, Apple } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  categoryCounts: Record<CategoryId, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const getIcon = (id: CategoryId) => {
    switch (id) {
      case 'cong-thuc':
        return <ChefHat className="w-4 h-4" />;
      case 'quan-xa':
        return <Store className="w-4 h-4" />;
      case 'danh-gia':
        return <Sparkles className="w-4 h-4" />;
      case 'dinh-duong':
        return <Apple className="w-4 h-4" />;
      default:
        return <UtensilsCrossed className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none mb-4">
      <div className="flex items-center gap-2.5 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                isSelected
                  ? 'bg-sage-600 text-white border-sage-600 shadow-md shadow-sage-600/20 ring-2 ring-sage-500/20'
                  : 'bg-white dark:bg-forest-850 text-sage-800 dark:text-sage-200 border-sage-200 dark:border-forest-750 hover:border-sage-400 hover:bg-sage-50 dark:hover:bg-forest-800'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-sage-600 dark:text-sage-400'}>
                {getIcon(cat.id)}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected
                    ? 'bg-white/25 text-white'
                    : 'bg-sage-100 dark:bg-forest-800 text-sage-700 dark:text-sage-300'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

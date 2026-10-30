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
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${
                isSelected
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/25 ring-2 ring-orange-600/20'
                  : 'bg-white dark:bg-neutral-800 text-stone-700 dark:text-neutral-200 border-stone-200 dark:border-neutral-700 hover:border-orange-300 dark:hover:border-neutral-600 hover:bg-stone-50 dark:hover:bg-neutral-750'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-orange-600 dark:text-orange-400'}>
                {getIcon(cat.id)}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-stone-100 dark:bg-neutral-700 text-stone-600 dark:text-neutral-300'
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

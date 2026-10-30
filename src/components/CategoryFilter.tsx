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
    <div className="w-full border-y border-linen-300 dark:border-espresso-800 py-3 mb-6 bg-linen-50/50 dark:bg-espresso-950/40">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        
        <span className="text-[11px] font-mono uppercase tracking-widest text-linen-500 font-bold px-2 shrink-0">
          Mục lục / Menu:
        </span>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 shrink-0 border ${
                isSelected
                  ? 'bg-linen-900 text-white border-linen-900 dark:bg-linen-100 dark:text-espresso-950 dark:border-linen-100 shadow-md font-semibold'
                  : 'bg-white dark:bg-espresso-900 text-linen-800 dark:text-linen-300 border-linen-300 dark:border-espresso-800 hover:border-terracotta-400 dark:hover:border-terracotta-500/50'
              }`}
            >
              <span className={isSelected ? 'text-terracotta-400 dark:text-terracotta-600' : 'text-terracotta-700 dark:text-terracotta-400 group-hover:scale-110 transition-transform'}>
                {getIcon(cat.id)}
              </span>
              <span>{cat.name}</span>
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected
                    ? 'bg-white/20 text-white dark:bg-espresso-900/40 dark:text-espresso-950'
                    : 'bg-linen-200 dark:bg-espresso-800 text-linen-700 dark:text-linen-400'
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

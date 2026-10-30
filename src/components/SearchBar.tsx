'use client';

import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedSource: string;
  onSourceChange: (source: string) => void;
  sourcesList: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalResults: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedSource,
  onSourceChange,
  sourcesList,
  sortBy,
  onSortChange,
  totalResults
}) => {
  return (
    <div className="bg-white dark:bg-forest-850 p-4 rounded-3xl border border-sage-200 dark:border-forest-750 shadow-sm space-y-3 mb-8">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Input Tìm kiếm */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm món ăn, công thức nấu nướng, quán ngon, mẹo vặt..."
            className="w-full pl-11 pr-10 py-2.5 rounded-2xl border border-sage-200 dark:border-forest-700 bg-sage-50/50 dark:bg-forest-900 text-sage-900 dark:text-cream-100 placeholder-sage-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-700 dark:hover:text-cream-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dropdowns lọc nguồn & sắp xếp */}
        <div className="flex items-center gap-2">
          {/* Lọc nguồn */}
          <div className="relative flex-1 md:w-48">
            <select
              value={selectedSource}
              onChange={(e) => onSourceChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl border border-sage-200 dark:border-forest-700 bg-sage-50/50 dark:bg-forest-900 text-sage-800 dark:text-cream-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 cursor-pointer font-sans"
            >
              <option value="all">Tất cả nguồn báo</option>
              {sourcesList.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sage-400" />
          </div>

          {/* Sắp xếp */}
          <div className="relative flex-1 md:w-44">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-2xl border border-sage-200 dark:border-forest-700 bg-sage-50/50 dark:bg-forest-900 text-sage-800 dark:text-cream-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 cursor-pointer font-sans"
            >
              <option value="newest">Mới cập nhật</option>
              <option value="readTime">Thời gian đọc dài</option>
            </select>
            <ArrowUpDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-sage-400" />
          </div>
        </div>

      </div>

      {/* Thông tin tìm kiếm */}
      <div className="flex items-center justify-between text-xs text-sage-600 dark:text-sage-400 px-1 pt-1 border-t border-sage-100 dark:border-forest-800">
        <span>
          Đang hiển thị <strong className="text-coral-500 font-bold">{totalResults}</strong> bài viết ẩm thực
        </span>
        {searchQuery && (
          <span className="italic">
            Kết quả cho: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
};

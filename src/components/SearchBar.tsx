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
    <div className="p-4 rounded-2xl border border-linen-300 dark:border-espresso-800 bg-white dark:bg-espresso-900 shadow-sm space-y-3 mb-8">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Ô Input Tìm Kiếm */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-linen-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tra cứu món ngon, nhà hàng, công thức, bí quyết gia truyền..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-linen-300 dark:border-espresso-800 bg-linen-50/60 dark:bg-espresso-950 text-linen-900 dark:text-linen-100 placeholder-linen-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/40 focus:border-terracotta-600 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-linen-400 hover:text-linen-700 dark:hover:text-linen-200"
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
              className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-linen-300 dark:border-espresso-800 bg-linen-50/60 dark:bg-espresso-950 text-linen-800 dark:text-linen-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/40 cursor-pointer font-serif"
            >
              <option value="all">Tất cả nguồn báo</option>
              {sourcesList.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-linen-400" />
          </div>

          {/* Sắp xếp */}
          <div className="relative flex-1 md:w-44">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-linen-300 dark:border-espresso-800 bg-linen-50/60 dark:bg-espresso-950 text-linen-800 dark:text-linen-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-500/40 cursor-pointer font-serif"
            >
              <option value="newest">Mới cập nhật</option>
              <option value="readTime">Thời gian đọc dài</option>
            </select>
            <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-linen-400" />
          </div>
        </div>

      </div>

      {/* Thông tin tìm kiếm */}
      <div className="flex items-center justify-between text-[11px] font-mono text-linen-500 px-1 pt-1 border-t border-linen-200 dark:border-espresso-800/60">
        <span>
          Hiện có <strong className="text-terracotta-700 dark:text-terracotta-400 font-bold">{totalResults}</strong> bài viết trong tuyển tập
        </span>
        {searchQuery && (
          <span className="italic font-serif">
            Lọc theo từ khóa: &ldquo;{searchQuery}&rdquo;
          </span>
        )}
      </div>
    </div>
  );
};

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
    <div className="bg-white dark:bg-neutral-850 p-4 rounded-2xl border border-stone-200 dark:border-neutral-800 shadow-sm space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Input Tìm kiếm */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm theo món ăn, quán ngon, công thức, mẹo vặt..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-stone-200 dark:border-neutral-700 bg-stone-50/50 dark:bg-neutral-800 text-stone-900 dark:text-neutral-100 placeholder-stone-400 dark:placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
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
              className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-stone-200 dark:border-neutral-700 bg-stone-50/50 dark:bg-neutral-800 text-stone-800 dark:text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 cursor-pointer"
            >
              <option value="all">Tất cả nguồn báo</option>
              {sourcesList.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            <SlidersHorizontal className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
          </div>

          {/* Sắp xếp */}
          <div className="relative flex-1 md:w-40">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl border border-stone-200 dark:border-neutral-700 bg-stone-50/50 dark:bg-neutral-800 text-stone-800 dark:text-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 cursor-pointer"
            >
              <option value="newest">Mới nhất</option>
              <option value="readTime">Thời gian đọc dài</option>
            </select>
            <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
          </div>
        </div>

      </div>

      {/* Thông tin tìm kiếm */}
      <div className="flex items-center justify-between text-xs text-stone-500 dark:text-neutral-400 px-1">
        <span>
          Tìm thấy <strong className="text-orange-600 dark:text-orange-400 font-bold">{totalResults}</strong> bài viết phù hợp
        </span>
        {searchQuery && (
          <span className="italic">
            Kết quả cho từ khóa &quot;{searchQuery}&quot;
          </span>
        )}
      </div>
    </div>
  );
};

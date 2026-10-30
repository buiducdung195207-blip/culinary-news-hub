'use client';

import React from 'react';
import { UtensilsCrossed, Bookmark, Sun, Moon, Sparkles, RefreshCw } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  bookmarkCount: number;
  onOpenBookmarks: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleDarkMode,
  bookmarkCount,
  onOpenBookmarks,
  onRefresh,
  isLoading
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/90 dark:bg-neutral-900/90 border-b border-stone-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 bg-clip-text text-transparent">
                BiteCraft
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-950/80 dark:text-orange-300">
                Culinary News
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-neutral-400 hidden sm:block">
              Tổng hợp tin tức & Đọc tinh gọn không quảng cáo
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            title="Làm mới tin tức mới nhất"
            className="p-2 rounded-lg text-stone-600 dark:text-neutral-300 hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin text-orange-600' : ''}`} />
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={onOpenBookmarks}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-stone-700 dark:text-neutral-200 hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors text-sm font-medium"
            title="Danh sách bài viết đã lưu"
          >
            <Bookmark className="w-4 h-4 text-orange-600" />
            <span className="hidden sm:inline">Đã lưu</span>
            {bookmarkCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[11px] font-bold text-white">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-stone-600 dark:text-neutral-300 hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
            title={darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

      </div>
    </header>
  );
};

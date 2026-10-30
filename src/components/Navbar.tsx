'use client';

import React from 'react';
import { Bookmark, Sun, Moon, RefreshCw, Compass, Sparkles } from 'lucide-react';

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
  const currentDate = new Date().toLocaleDateString('vi-VN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="w-full bg-linen-100 dark:bg-espresso-950 border-b border-linen-300 dark:border-espresso-850 transition-colors">
      
      {/* Top Editorial Gazette Bar */}
      <div className="border-b border-linen-200 dark:border-espresso-900/60 py-1.5 px-4 sm:px-8 text-[11px] text-linen-800/70 dark:text-linen-400 flex flex-wrap items-center justify-between gap-2 uppercase tracking-widest font-mono">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-terracotta-700 dark:text-terracotta-400">Issue № 42</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">{currentDate}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-terracotta-600 dark:text-terracotta-400 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            RSS Feeds Live Caching
          </span>
          <span className="hidden md:inline text-linen-500">•</span>
          <span className="hidden md:inline">Vietnam & World Gastronomy</span>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Edition info */}
        <div className="hidden lg:flex items-center gap-3 text-xs text-linen-800/80 dark:text-linen-400">
          <div className="p-2.5 rounded-xl border border-linen-300 dark:border-espresso-800 bg-linen-50 dark:bg-espresso-900 shadow-sm">
            <Compass className="w-4 h-4 text-terracotta-700 dark:text-terracotta-400" />
          </div>
          <div className="leading-tight">
            <div className="font-serif font-bold text-linen-900 dark:text-linen-200">The Taste Curator</div>
            <div className="text-[11px] text-linen-500">Chắt lọc từ 5 nguồn báo lớn</div>
          </div>
        </div>

        {/* Center: Signature Brand Title */}
        <div className="text-center group cursor-pointer">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="h-[1px] w-6 sm:w-10 bg-terracotta-700/40 dark:bg-terracotta-400/40" />
            <span className="text-[10px] tracking-[0.25em] font-mono uppercase text-terracotta-700 dark:text-terracotta-400 font-bold">
              Culinary Gazette
            </span>
            <span className="h-[1px] w-6 sm:w-10 bg-terracotta-700/40 dark:bg-terracotta-400/40" />
          </div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-linen-900 dark:text-linen-50 hover:text-terracotta-700 transition-colors">
            B I T E C R A F T
          </h1>
          
          <p className="font-serif italic text-xs sm:text-sm text-linen-800/80 dark:text-linen-300 mt-1 max-w-md mx-auto">
            &ldquo;Hương vị cuộc sống qua lăng kính tinh tuyển và trải nghiệm đọc tinh gọn&rdquo;
          </p>
        </div>

        {/* Right Side: Tools & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Refresh Action */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 sm:px-3 sm:py-2 rounded-full border border-linen-300 dark:border-espresso-800 bg-linen-50 dark:bg-espresso-900 hover:border-terracotta-500 hover:bg-linen-200/60 dark:hover:bg-espresso-850 transition-all text-linen-800 dark:text-linen-200 flex items-center gap-2 text-xs font-medium shadow-sm disabled:opacity-50"
            title="Làm mới tin tức mới nhất từ RSS"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-terracotta-600' : ''}`} />
            <span className="hidden sm:inline">Cập nhật tin</span>
          </button>

          {/* Bookmarks Pill */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-linen-300 dark:border-espresso-800 bg-linen-50 dark:bg-espresso-900 hover:border-terracotta-500 hover:bg-linen-200/60 dark:hover:bg-espresso-850 transition-all text-linen-900 dark:text-linen-100 text-xs font-semibold shadow-sm"
            title="Xem danh sách bài viết đã lưu"
          >
            <Bookmark className="w-3.5 h-3.5 text-terracotta-700 dark:text-terracotta-400 fill-terracotta-700/20" />
            <span>Sổ tay</span>
            {bookmarkCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-terracotta-700 text-white text-[10px] font-bold leading-none">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full border border-linen-300 dark:border-espresso-800 bg-linen-50 dark:bg-espresso-900 hover:border-terracotta-500 text-linen-800 dark:text-linen-200 transition-all shadow-sm"
            title={darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Đêm'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-saffron-400" /> : <Moon className="w-4 h-4 text-linen-800" />}
          </button>

        </div>

      </div>

    </header>
  );
};

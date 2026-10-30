'use client';

import React from 'react';
import { Bookmark, Sun, Moon, RefreshCw, Sprout, Heart } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-forest-900/95 border-b border-sage-200 dark:border-forest-800 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between gap-4">
        
        {/* Foodily Signature Logo */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center">
            {/* Organic Circle Accent */}
            <div className="w-11 h-11 rounded-2xl bg-sage-100 dark:bg-sage-900/60 flex items-center justify-center text-sage-600 dark:text-sage-400 group-hover:scale-105 transition-transform shadow-inner">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            {/* Cute dot badge */}
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-coral-500 border-2 border-white dark:border-forest-900" />
          </div>

          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-2xl tracking-tight text-sage-700 dark:text-sage-300 group-hover:text-coral-500 transition-colors">
                Foodily
              </span>
              <span className="text-xs font-semibold text-coral-500 tracking-wider">
                .vn
              </span>
            </div>
            <p className="text-[11px] font-medium text-sage-600/80 dark:text-sage-400/80 -mt-0.5 hidden sm:block">
              Tạp chí ẩm thực & Đọc tinh gọn không quảng cáo
            </p>
          </div>
        </div>

        {/* Center Tagline Pills (Desktop) */}
        <div className="hidden lg:flex items-center gap-6 text-xs font-medium text-sage-700 dark:text-sage-300">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-50 dark:bg-forest-850 border border-sage-200 dark:border-forest-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            RSS feeds cập nhật trực tiếp
          </span>
          <span className="hover:text-coral-500 transition-colors cursor-pointer">
            Món ngon mỗi ngày
          </span>
          <span className="hover:text-coral-500 transition-colors cursor-pointer">
            Quán xá chọn lọc
          </span>
          <span className="hover:text-coral-500 transition-colors cursor-pointer">
            Chế độ đọc sạch
          </span>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Refresh Action */}
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 sm:px-3 sm:py-2 rounded-full border border-sage-200 dark:border-forest-800 bg-sage-50/60 dark:bg-forest-850 hover:bg-sage-100 dark:hover:bg-forest-800 text-sage-700 dark:text-sage-300 transition-all flex items-center gap-1.5 text-xs font-semibold disabled:opacity-50"
            title="Làm mới tin tức ẩm thực"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-coral-500' : ''}`} />
            <span className="hidden sm:inline">Cập nhật</span>
          </button>

          {/* Sổ tay yêu thích (Bookmarks) */}
          <button
            onClick={onOpenBookmarks}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-coral-500 hover:bg-coral-600 text-white transition-all text-xs font-semibold shadow-md shadow-coral-500/25"
            title="Mở danh sách bài viết đã lưu"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Món đã lưu</span>
            {bookmarkCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-white text-coral-600 text-[10px] font-bold">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-full border border-sage-200 dark:border-forest-800 bg-sage-50/60 dark:bg-forest-850 hover:bg-sage-100 text-sage-700 dark:text-sage-300 transition-all"
            title={darkMode ? 'Chuyển sang giao diện Sáng' : 'Chuyển sang giao diện Tối'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

        </div>

      </div>
    </header>
  );
};

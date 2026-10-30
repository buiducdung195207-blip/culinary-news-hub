'use client';

import React from 'react';
import { BookOpen, Sparkles, Sprout, ShieldCheck, Zap, Utensils } from 'lucide-react';

interface StatsBannerProps {
  totalFeeds: number;
  sourcesCount: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ totalFeeds, sourcesCount }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sage-200 via-cream-200 to-coral-100 dark:from-forest-850 dark:via-forest-900 dark:to-sage-900/60 p-7 sm:p-10 mb-8 border border-sage-300/80 dark:border-forest-800 shadow-md">
      
      {/* Decorative Organic Blobs */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sage-300/30 dark:bg-sage-600/10 blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-coral-300/20 dark:bg-coral-600/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        
        {/* Cute Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-forest-800/90 text-sage-800 dark:text-sage-300 text-xs font-bold mb-4 shadow-sm backdrop-blur-sm border border-sage-200 dark:border-forest-700">
          <Sprout className="w-4 h-4 text-sage-600 dark:text-sage-400" />
          <span>Foodily • Tinh Hoa Ẩm Thực Tươi Mới</span>
        </div>

        {/* Hero Title with Warm Vietnamese Typography */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-sage-900 dark:text-cream-50 leading-tight mb-3">
          Khám phá hương vị món ngon & trải nghiệm đọc tinh gọn
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-sage-800/85 dark:text-sage-300 leading-relaxed mb-6 font-normal max-w-2xl">
          Tổng hợp tự động từ các nguồn tin ẩm thực uy tín. Loại bỏ hoàn toàn quảng cáo gây phiền nhiễu với chế độ <strong>Reader Mode</strong> tiện lợi, bóc tách nguyên liệu và hướng dẫn nấu nướng chuẩn xác.
        </p>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 border-t border-sage-300/60 dark:border-forest-750">
          
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 dark:bg-forest-800/70 backdrop-blur-sm border border-sage-200 dark:border-forest-700 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-sage-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-sage-900 dark:text-cream-100">Reader Mode</div>
              <div className="text-[10px] text-sage-600 dark:text-sage-400 font-medium">100% Sạch quảng cáo</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 dark:bg-forest-800/70 backdrop-blur-sm border border-sage-200 dark:border-forest-700 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-coral-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-sage-900 dark:text-cream-100">4 Danh mục</div>
              <div className="text-[10px] text-sage-600 dark:text-sage-400 font-medium">Phân loại tự động</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 dark:bg-forest-800/70 backdrop-blur-sm border border-sage-200 dark:border-forest-700 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-sage-900 dark:text-cream-100">{sourcesCount} Nguồn báo</div>
              <div className="text-[10px] text-sage-600 dark:text-sage-400 font-medium">Cập nhật qua RSS</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/70 dark:bg-forest-800/70 backdrop-blur-sm border border-sage-200 dark:border-forest-700 shadow-sm">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-sage-900 dark:text-cream-100">Edge Cache</div>
              <div className="text-[10px] text-sage-600 dark:text-sage-400 font-medium">Phản hồi siêu tốc</div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

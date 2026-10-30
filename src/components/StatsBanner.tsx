'use client';

import React from 'react';
import { Rss, Zap, BookOpen, ShieldCheck } from 'lucide-react';

interface StatsBannerProps {
  totalFeeds: number;
  sourcesCount: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ totalFeeds, sourcesCount }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white p-6 sm:p-8 md:p-10 shadow-xl shadow-orange-900/10 mb-8">
      {/* Decorative patterns */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute right-20 top-0 w-32 h-32 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-4 text-orange-50">
          <Zap className="w-3.5 h-3.5 text-yellow-300" />
          Tối ưu hóa Edge Caching & Server Parser
        </div>
        
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 leading-tight">
          Cổng thông tin chuyên sâu Ẩm thực & Chế độ Đọc Tinh Gọn
        </h1>
        
        <p className="text-sm sm:text-base text-orange-100 leading-relaxed mb-6 max-w-2xl">
          Tự động thu thập bài viết chất lượng từ các trang báo uy tín, phân loại thông minh theo công thức, quán xá, đánh giá và dinh dưỡng. Trải nghiệm đọc sạch sẽ, loại bỏ hoàn toàn quảng cáo phiền toái.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 border-t border-white/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Rss className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">{sourcesCount} Nguồn</div>
              <div className="text-[11px] text-orange-100">Báo chí ẩm thực</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">Reader Mode</div>
              <div className="text-[11px] text-orange-100">Sạch không quảng cáo</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">Edge Cache</div>
              <div className="text-[11px] text-orange-100">Phản hồi siêu tốc</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">4 Danh mục</div>
              <div className="text-[11px] text-orange-100">Phân loại chuyên sâu</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

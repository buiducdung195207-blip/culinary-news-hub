'use client';

import React from 'react';
import { FeedItem } from '@/types';
import { BookOpen, Sparkles, Feather, Flame, ArrowUpRight, Clock, Award } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface StatsBannerProps {
  spotlightArticle?: FeedItem | null;
  onOpenReader: (article: FeedItem) => void;
  totalArticles: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({
  spotlightArticle,
  onOpenReader,
  totalArticles
}) => {
  if (!spotlightArticle) return null;

  return (
    <section className="mb-10">
      
      {/* Spotlight Header Label */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-terracotta-700 text-white">
            <Flame className="w-3.5 h-3.5 fill-white" />
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-terracotta-800 dark:text-terracotta-400">
            Tiêu Điểm Biên Tập • Editor&apos;s Feature
          </span>
        </div>
        <div className="text-xs text-linen-500 font-serif italic">
          Cập nhật từ {totalArticles} bài viết tuyển lọc
        </div>
      </div>

      {/* Bento Grid: 1 Hero Spotlight + 2 Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Main Hero Spotlight (8 Columns) */}
        <div 
          onClick={() => onOpenReader(spotlightArticle)}
          className="lg:col-span-8 group relative rounded-3xl overflow-hidden cursor-pointer border border-linen-300 dark:border-espresso-800 bg-linen-900 text-white shadow-xl min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-6 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:border-terracotta-500/50"
        >
          {/* Background Image with Dark Vignette */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={spotlightArticle.imageUrl}
            alt={spotlightArticle.title}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso-950 via-espresso-950/60 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-espresso-900 backdrop-blur-md shadow-md">
                <Award className="w-3.5 h-3.5 text-terracotta-700" />
                Đặc Sắc Nhất
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-espresso-900/80 text-linen-200 border border-white/20 backdrop-blur-md">
                {spotlightArticle.categoryLabel}
              </span>
            </div>

            <span className="text-xs font-mono text-white/80 flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-md">
              <Clock className="w-3 h-3 text-saffron-400" />
              {spotlightArticle.readTimeMinutes} phút đọc
            </span>
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 max-w-2xl mt-auto">
            <div className="text-xs text-saffron-400 font-mono tracking-wider mb-2 flex items-center gap-2">
              <span>{spotlightArticle.source}</span>
              <span>•</span>
              <span>{formatTimeAgo(spotlightArticle.pubDate)}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-white mb-3 group-hover:text-saffron-300 transition-colors">
              {spotlightArticle.title}
            </h2>

            <p className="text-sm sm:text-base text-linen-300 line-clamp-2 leading-relaxed mb-6 font-light">
              {spotlightArticle.summary}
            </p>

            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-terracotta-700 hover:bg-terracotta-600 text-white font-medium text-xs sm:text-sm shadow-lg shadow-terracotta-900/40 transition-all">
                <BookOpen className="w-4 h-4" />
                <span>Mở Chế Độ Đọc Tinh Gọn</span>
                <ArrowUpRight className="w-4 h-4 ml-1 opacity-80" />
              </button>
            </div>
          </div>
        </div>

        {/* Side Bento Cards (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col gap-4 justify-between">
          
          {/* Card 1: Reader Mode Philosophy */}
          <div className="p-6 rounded-3xl border border-linen-300 dark:border-espresso-800 bg-white dark:bg-espresso-900 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-700 dark:text-terracotta-400 flex items-center justify-center mb-4">
                <Feather className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-linen-900 dark:text-linen-100 mb-2">
                Trải Nghiệm Đọc Thượng Hạng
              </h3>
              <p className="text-xs leading-relaxed text-linen-800/80 dark:text-linen-400">
                Lọc bỏ 100% banner quảng cáo gây xao nhãng. Hỗ trợ phông báo chí cổ điển, bảng màu giấy ngà dịu mắt và checklist mua sắm nguyên liệu tiện lợi.
              </p>
            </div>
            
            <div className="pt-4 border-t border-linen-200 dark:border-espresso-800/80 flex items-center justify-between text-[11px] font-mono text-terracotta-700 dark:text-terracotta-400 font-bold uppercase tracking-wider">
              <span>Pure Typography</span>
              <span>100% Ad-Free</span>
            </div>
          </div>

          {/* Card 2: Edge Performance */}
          <div className="p-6 rounded-3xl border border-linen-300 dark:border-espresso-800 bg-linen-200/50 dark:bg-espresso-850 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="p-2 rounded-xl bg-saffron-500/20 text-saffron-600 dark:text-saffron-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold">
                  Vercel Edge
                </span>
              </div>
              <h3 className="font-serif font-bold text-base text-linen-900 dark:text-linen-100 mb-1">
                Tối Ưu Edge Caching
              </h3>
              <p className="text-xs text-linen-800/70 dark:text-linen-400 leading-relaxed">
                Tự động revalidate theo chu kỳ 5 phút. Tải trang cực nhanh, tiết kiệm băng thông và phản hồi tức thì.
              </p>
            </div>

            <div className="pt-3 text-[11px] font-mono text-linen-500 flex items-center justify-between">
              <span>Status: Stale-While-Revalidate</span>
              <span className="text-emerald-600 font-bold">99.9% Uptime</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

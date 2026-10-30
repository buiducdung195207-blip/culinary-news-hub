'use client';

import React from 'react';
import { FeedItem } from '@/types';
import { BookOpen, Bookmark, ExternalLink, Clock, Share2, Sparkles } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface ArticleCardProps {
  article: FeedItem;
  index?: number;
  isBookmarked: boolean;
  onToggleBookmark: (article: FeedItem) => void;
  onOpenReader: (article: FeedItem) => void;
  onShare: (article: FeedItem) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  isBookmarked,
  onToggleBookmark,
  onOpenReader,
  onShare
}) => {
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'cong-thuc':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800/40';
      case 'quan-xa':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/40';
      case 'danh-gia':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800/40';
      case 'dinh-duong':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-800/40';
      default:
        return 'bg-sage-100 text-sage-800 dark:bg-sage-950/60 dark:text-sage-300 border-sage-200 dark:border-sage-800/40';
    }
  };

  return (
    <article className="group bg-white dark:bg-forest-850 rounded-3xl border border-sage-200 dark:border-forest-750 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-sage-400/80 transition-all duration-300">
      
      {/* Top Media & Tags */}
      <div>
        <div 
          className="relative aspect-[16/10] overflow-hidden bg-sage-100 dark:bg-forest-800 cursor-pointer"
          onClick={() => onOpenReader(article)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Badge danh mục */}
          <div className="absolute top-3.5 left-3.5">
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${getCategoryBadge(article.category)}`}>
              {article.categoryLabel}
            </span>
          </div>

          {/* Bookmark Quick Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article);
            }}
            aria-label={isBookmarked ? 'Bỏ lưu' : 'Lưu bài viết'}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-all shadow"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-coral-500 text-coral-500' : 'text-white'}`} />
          </button>

          {/* Read Time Overlay */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] font-semibold text-white/95 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{article.readTimeMinutes} phút đọc</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6">
          
          {/* Nguồn & Thời gian */}
          <div className="flex items-center justify-between text-xs text-sage-600 dark:text-sage-400 mb-2.5">
            <span className="font-bold text-sage-700 dark:text-sage-300">
              {article.source}
            </span>
            <span>{formatTimeAgo(article.pubDate)}</span>
          </div>

          {/* Tiêu đề tiếng Việt chuẩn đẹp */}
          <h3
            onClick={() => onOpenReader(article)}
            className="font-bold text-base sm:text-lg text-sage-950 dark:text-cream-50 group-hover:text-coral-500 dark:group-hover:text-coral-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2.5 font-sans"
          >
            {article.title}
          </h3>

          {/* Mô tả tóm tắt */}
          <p className="text-xs sm:text-sm text-sage-800/80 dark:text-sage-300 line-clamp-3 leading-relaxed font-normal">
            {article.summary}
          </p>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-sage-100 dark:border-forest-800 flex items-center justify-between gap-2">
        {/* Nút Reader Mode Foodily */}
        <button
          onClick={() => onOpenReader(article)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-coral-50 hover:bg-coral-500 dark:bg-coral-950/40 dark:hover:bg-coral-500 text-coral-600 hover:text-white dark:text-coral-300 dark:hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>Đọc tinh gọn</span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => onShare(article)}
          title="Chia sẻ bài viết"
          className="p-2.5 rounded-2xl text-sage-600 hover:text-sage-900 dark:text-sage-400 dark:hover:text-white hover:bg-sage-100 dark:hover:bg-forest-800 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Open Original Link */}
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          title="Xem trang gốc"
          className="p-2.5 rounded-2xl text-sage-600 hover:text-sage-900 dark:text-sage-400 dark:hover:text-white hover:bg-sage-100 dark:hover:bg-forest-800 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </article>
  );
};

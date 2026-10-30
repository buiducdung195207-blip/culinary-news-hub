'use client';

import React from 'react';
import { FeedItem } from '@/types';
import { BookOpen, Bookmark, ExternalLink, Clock, ArrowUpRight } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface ArticleCardProps {
  article: FeedItem;
  index: number;
  isBookmarked: boolean;
  onToggleBookmark: (article: FeedItem) => void;
  onOpenReader: (article: FeedItem) => void;
  onShare: (article: FeedItem) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  index,
  isBookmarked,
  onToggleBookmark,
  onOpenReader,
}) => {
  const formattedIndex = String(index + 1).padStart(2, '0');

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'cong-thuc':
        return 'text-amber-700 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/40';
      case 'quan-xa':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/40';
      case 'danh-gia':
        return 'text-purple-700 bg-purple-50 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/40';
      case 'dinh-duong':
        return 'text-rose-700 bg-rose-50 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/40';
      default:
        return 'text-terracotta-700 bg-terracotta-50 border-terracotta-200 dark:bg-terracotta-950/40 dark:text-terracotta-300 dark:border-terracotta-800/40';
    }
  };

  return (
    <article className="group bg-white dark:bg-espresso-900 rounded-3xl border border-linen-300 dark:border-espresso-800 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-terracotta-400/60 dark:hover:border-terracotta-500/40 transition-all duration-300">
      
      {/* Top Media & Metadata */}
      <div>
        
        {/* Cover Image Container */}
        <div 
          className="relative aspect-[16/10] overflow-hidden bg-linen-200 dark:bg-espresso-850 cursor-pointer"
          onClick={() => onOpenReader(article)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Watermark Index Number */}
          <div className="absolute top-3 left-4 font-mono font-bold text-xs text-white/90 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
            № {formattedIndex}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article);
            }}
            aria-label={isBookmarked ? 'Bỏ lưu' : 'Lưu bài viết'}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-all shadow"
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-terracotta-500 text-terracotta-500' : 'text-white'}`} />
          </button>

          {/* Bottom Overlay: Read Time & Source */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-white/90">
            <span className="font-mono bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
              {article.source}
            </span>
            <span className="flex items-center gap-1 font-mono bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
              <Clock className="w-3 h-3 text-saffron-400" />
              {article.readTimeMinutes} phút đọc
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          
          {/* Category Tag & Time */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border ${getCategoryTheme(article.category)}`}>
              {article.categoryLabel}
            </span>
            <span className="text-[11px] font-mono text-linen-500">
              {formatTimeAgo(article.pubDate)}
            </span>
          </div>

          {/* Tiêu đề phong cách báo chí */}
          <h3
            onClick={() => onOpenReader(article)}
            className="font-serif font-bold text-lg sm:text-xl text-linen-900 dark:text-linen-100 group-hover:text-terracotta-700 dark:group-hover:text-terracotta-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-3"
          >
            {article.title}
          </h3>

          {/* Đoạn trích dẫn tóm tắt */}
          <p className="text-xs sm:text-sm text-linen-800/80 dark:text-linen-300 line-clamp-3 leading-relaxed font-light">
            {article.summary}
          </p>

        </div>

      </div>

      {/* Footer Actions */}
      <div className="px-6 pb-6 pt-3 border-t border-linen-200 dark:border-espresso-800/70 flex items-center justify-between gap-3">
        
        {/* Nút Reader Mode */}
        <button
          onClick={() => onOpenReader(article)}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-linen-100 hover:bg-terracotta-700 dark:bg-espresso-800 dark:hover:bg-terracotta-700 text-linen-900 hover:text-white dark:text-linen-200 dark:hover:text-white font-medium text-xs sm:text-sm transition-all duration-200 border border-linen-300 dark:border-espresso-700 hover:border-transparent shadow-sm group/btn"
        >
          <BookOpen className="w-3.5 h-3.5 text-terracotta-700 dark:text-terracotta-400 group-hover/btn:text-white" />
          <span>Đọc tinh gọn</span>
          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100" />
        </button>

        {/* Nút Xem bài gốc */}
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          title="Mở bài viết gốc tại trang báo"
          className="p-2.5 rounded-full border border-linen-300 dark:border-espresso-800 hover:border-terracotta-400 text-linen-600 dark:text-linen-400 hover:text-terracotta-700 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>

      </div>

    </article>
  );
};

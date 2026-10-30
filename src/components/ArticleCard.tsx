'use client';

import React from 'react';
import { FeedItem } from '@/types';
import { BookOpen, Bookmark, ExternalLink, Clock, User, Share2 } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface ArticleCardProps {
  article: FeedItem;
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
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'cong-thuc':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800/60';
      case 'quan-xa':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60';
      case 'danh-gia':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-200 dark:border-purple-800/60';
      case 'dinh-duong':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800/60';
      default:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-200 dark:border-orange-800/60';
    }
  };

  return (
    <article className="group bg-white dark:bg-neutral-850 rounded-2xl border border-stone-200 dark:border-neutral-800 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-orange-200 dark:hover:border-neutral-700 transition-all duration-300">
      
      {/* Top Media & Tags */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 dark:bg-neutral-800 cursor-pointer" onClick={() => onOpenReader(article)}>
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
          <div className="absolute top-3 left-3">
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-sm backdrop-blur-md ${getCategoryColor(article.category)}`}>
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
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white transition-all duration-200 shadow"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-orange-500 text-orange-500' : 'text-white'}`} />
          </button>

          {/* Estimated Read Time Overlay */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-medium text-white/90 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-orange-400" />
            <span>{article.readTimeMinutes} phút đọc</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Nguồn & Thời gian */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-neutral-400 mb-2.5">
            <span className="font-semibold text-orange-600 dark:text-orange-400 flex items-center gap-1">
              {article.source}
            </span>
            <span>{formatTimeAgo(article.pubDate)}</span>
          </div>

          {/* Tiêu đề */}
          <h3
            onClick={() => onOpenReader(article)}
            className="font-bold text-base sm:text-lg text-stone-900 dark:text-neutral-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2.5"
          >
            {article.title}
          </h3>

          {/* Mô tả tóm tắt */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-neutral-300 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 pb-5 pt-2 border-t border-stone-100 dark:border-neutral-800 flex items-center justify-between gap-2">
        {/* Nút Reader Mode */}
        <button
          onClick={() => onOpenReader(article)}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-600 dark:bg-orange-950/40 dark:hover:bg-orange-600 text-orange-700 hover:text-white dark:text-orange-300 dark:hover:text-white font-medium text-xs sm:text-sm transition-all shadow-sm"
        >
          <BookOpen className="w-4 h-4" />
          <span>Đọc tinh gọn</span>
        </button>

        {/* Share Button */}
        <button
          onClick={() => onShare(article)}
          title="Chia sẻ bài viết"
          className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-neutral-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <Share2 className="w-4 h-4" />
        </button>

        {/* Open Original Link */}
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          title="Xem trang gốc"
          className="p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-neutral-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

    </article>
  );
};

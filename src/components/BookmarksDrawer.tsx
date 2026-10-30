'use client';

import React from 'react';
import { FeedItem } from '@/types';
import { X, Heart, Trash2, BookOpen } from 'lucide-react';
import { formatTimeAgo } from '@/lib/utils';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: FeedItem[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onOpenReader: (article: FeedItem) => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onClearAll,
  onOpenReader
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-cream-50 dark:bg-forest-900 shadow-2xl flex flex-col border-l border-sage-200 dark:border-forest-800 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-sage-200 dark:border-forest-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-coral-100 dark:bg-coral-950/60 text-coral-600 dark:text-coral-300">
              <Heart className="w-5 h-5 fill-coral-500 text-coral-500" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-sage-950 dark:text-cream-50 font-sans">
                Món ăn đã lưu
              </h2>
              <p className="text-xs text-sage-600 dark:text-sage-400 font-medium">
                {bookmarks.length} bài viết trong danh sách của bạn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-sage-500 hover:bg-sage-100 dark:hover:bg-forest-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-sage-400">
              <Heart className="w-12 h-12 stroke-[1.5] mb-3 text-sage-300 dark:text-forest-700" />
              <p className="font-bold text-sage-800 dark:text-cream-200 mb-1">
                Chưa có món ăn nào được lưu
              </p>
              <p className="text-xs text-sage-500 max-w-xs">
                Bấm vào biểu tượng dấu trang ở bất kỳ món ăn nào để lưu lại và xem lại bất cứ lúc nào.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-sage-200 dark:border-forest-800 bg-white dark:bg-forest-850 hover:border-coral-300 transition-all flex gap-3 group shadow-sm"
              >
                {/* Thumbnail */}
                <div 
                  className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 cursor-pointer"
                  onClick={() => onOpenReader(item)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <span className="text-[10px] font-bold text-coral-500 uppercase">
                      {item.categoryLabel}
                    </span>
                    <h4
                      onClick={() => onOpenReader(item)}
                      className="text-xs sm:text-sm font-bold text-sage-950 dark:text-cream-50 line-clamp-2 cursor-pointer hover:text-coral-500 transition-colors"
                    >
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-sage-100 dark:border-forest-800 text-[11px] text-sage-500">
                    <span>{formatTimeAgo(item.pubDate)}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onOpenReader(item)}
                        className="p-1 rounded text-coral-600 hover:bg-coral-50 dark:hover:bg-forest-800"
                        title="Đọc tinh gọn"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveBookmark(item.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-forest-800"
                        title="Xóa bài viết"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarks.length > 0 && (
          <div className="p-4 border-t border-sage-200 dark:border-forest-800 flex justify-between items-center text-xs">
            <button
              onClick={onClearAll}
              className="text-red-500 hover:underline font-bold"
            >
              Xóa tất cả
            </button>
            <span className="text-sage-500">
              Lưu trữ bộ nhớ trình duyệt
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

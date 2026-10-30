'use client';

import React from 'react';
import { FeedItem } from '@/types';
import { X, Bookmark, Trash2, BookOpen } from 'lucide-react';
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
      <div className="w-full max-w-md h-full bg-linen-100 dark:bg-espresso-950 shadow-2xl flex flex-col border-l border-linen-300 dark:border-espresso-800 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-linen-300 dark:border-espresso-850 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-terracotta-100 dark:bg-terracotta-950/60 text-terracotta-700 dark:text-terracotta-400">
              <Bookmark className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-linen-900 dark:text-linen-100">
                Sổ Tay Ẩm Thực
              </h2>
              <p className="text-[11px] font-mono text-linen-500">
                {bookmarks.length} bài viết đã đánh dấu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-linen-500 hover:bg-linen-200 dark:hover:bg-espresso-850"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-linen-400">
              <Bookmark className="w-12 h-12 stroke-[1.2] mb-3 opacity-40" />
              <p className="font-serif font-bold text-linen-800 dark:text-linen-200 mb-1">
                Sổ tay hiện đang trống
              </p>
              <p className="text-xs text-linen-500 max-w-xs">
                Bấm vào biểu tượng dấu trang ở bất kỳ bài viết nào để lưu lại các công thức và địa chỉ quán ngon yêu thích.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl border border-linen-300 dark:border-espresso-800 bg-white dark:bg-espresso-900 hover:border-terracotta-400 transition-all flex gap-3 group shadow-sm"
              >
                {/* Thumbnail */}
                <div 
                  className="w-20 h-20 rounded-xl overflow-hidden shrink-0 cursor-pointer"
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
                    <span className="text-[10px] font-mono font-bold text-terracotta-700 dark:text-terracotta-400 uppercase">
                      {item.categoryLabel}
                    </span>
                    <h4
                      onClick={() => onOpenReader(item)}
                      className="text-xs sm:text-sm font-serif font-bold text-linen-900 dark:text-linen-100 line-clamp-2 cursor-pointer hover:text-terracotta-700 transition-colors"
                    >
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-linen-200 dark:border-espresso-800 text-[11px] font-mono text-linen-500">
                    <span>{formatTimeAgo(item.pubDate)}</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onOpenReader(item)}
                        className="p-1 rounded text-terracotta-700 hover:bg-terracotta-50 dark:hover:bg-espresso-800"
                        title="Đọc tinh gọn"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveBookmark(item.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-espresso-800"
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
          <div className="p-4 border-t border-linen-300 dark:border-espresso-850 flex justify-between items-center text-xs font-mono">
            <button
              onClick={onClearAll}
              className="text-red-600 hover:underline font-bold"
            >
              Xóa toàn bộ sổ tay
            </button>
            <span className="text-linen-500">
              Lưu trữ Offline Browser
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

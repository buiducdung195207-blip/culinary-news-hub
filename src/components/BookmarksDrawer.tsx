'use client';

import React from 'react';
import { FeedItem } from '@/types';
import { X, Bookmark, Trash2, BookOpen, ExternalLink } from 'lucide-react';
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
      <div className="w-full max-w-md h-full bg-white dark:bg-neutral-900 shadow-2xl flex flex-col border-l border-stone-200 dark:border-neutral-800 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-stone-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-orange-600 fill-orange-600" />
            <h2 className="font-bold text-lg text-stone-900 dark:text-neutral-100">
              Bài viết đã lưu ({bookmarks.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 dark:hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-400 dark:text-neutral-500">
              <Bookmark className="w-12 h-12 stroke-[1.5] mb-3 text-stone-300 dark:text-neutral-600" />
              <p className="font-semibold text-stone-700 dark:text-neutral-300 mb-1">
                Chưa có bài viết nào được lưu
              </p>
              <p className="text-xs">
                Bấm vào biểu tượng dấu trang ở bất kỳ bài viết nào để lưu đọc lại sau.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border border-stone-200 dark:border-neutral-800 bg-stone-50/50 dark:bg-neutral-850 hover:border-orange-300 transition-all flex gap-3 group"
              >
                {/* Thumbnail */}
                <div 
                  className="w-20 h-20 rounded-lg overflow-hidden shrink-0 cursor-pointer"
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
                    <span className="text-[10px] font-bold text-orange-600 uppercase">
                      {item.categoryLabel}
                    </span>
                    <h4
                      onClick={() => onOpenReader(item)}
                      className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-neutral-100 line-clamp-2 cursor-pointer hover:text-orange-600"
                    >
                      {item.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100 dark:border-neutral-800">
                    <span className="text-[11px] text-stone-400">
                      {formatTimeAgo(item.pubDate)}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onOpenReader(item)}
                        className="p-1 rounded text-orange-600 hover:bg-orange-50 dark:hover:bg-neutral-800"
                        title="Đọc tinh gọn"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onRemoveBookmark(item.id)}
                        className="p-1 rounded text-red-500 hover:bg-red-50 dark:hover:bg-neutral-800"
                        title="Xóa khỏi danh sách lưu"
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
          <div className="p-4 border-t border-stone-200 dark:border-neutral-800 flex justify-between items-center">
            <button
              onClick={onClearAll}
              className="text-xs text-red-600 hover:underline font-medium"
            >
              Xóa tất cả
            </button>
            <span className="text-xs text-stone-500">
              Được lưu tại bộ nhớ trình duyệt
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

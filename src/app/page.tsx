'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FeedItem, CategoryId } from '@/types';
import { CATEGORIES, RSS_FEEDS } from '@/lib/sources';
import { Navbar } from '@/components/Navbar';
import { StatsBanner } from '@/components/StatsBanner';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ArticleCard } from '@/components/ArticleCard';
import { ReaderModal } from '@/components/ReaderModal';
import { BookmarksDrawer } from '@/components/BookmarksDrawer';
import { Utensils, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const [articles, setArticles] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters & State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('tat-ca');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Bookmarks & Reader Mode State
  const [bookmarks, setBookmarks] = useState<FeedItem[]>([]);
  const [activeReaderArticle, setActiveReaderArticle] = useState<FeedItem | null>(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Load Bookmarks & Theme from localStorage
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('bitecraft_bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }

      const savedTheme = localStorage.getItem('bitecraft_theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('LocalStorage not accessible:', e);
    }
  }, []);

  // Fetch feeds từ API Server
  const fetchFeeds = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'tat-ca') params.set('category', selectedCategory);
      if (selectedSource !== 'all') params.set('source', selectedSource);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      if (sortBy) params.set('sort', sortBy);

      const res = await fetch(`/api/feed?${params.toString()}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.items)) {
        setArticles(data.items);
      } else {
        throw new Error(data.error || 'Lỗi khi tải dữ liệu feeds.');
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError('Đang sử dụng bộ dữ liệu dự phòng do giới hạn mạng.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, selectedSource, sortBy]);

  // Debounced Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchFeeds();
    }, 350);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Toggle Dark Mode
  const handleToggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('bitecraft_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bitecraft_theme', 'light');
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = (item: FeedItem) => {
    let updated: FeedItem[];
    const exists = bookmarks.some(b => b.id === item.id);
    if (exists) {
      updated = bookmarks.filter(b => b.id !== item.id);
    } else {
      updated = [item, ...bookmarks];
    }
    setBookmarks(updated);
    try {
      localStorage.setItem('bitecraft_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('bitecraft_bookmarks', JSON.stringify(updated));
  };

  const handleClearAllBookmarks = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ danh sách bài viết đã lưu?')) {
      setBookmarks([]);
      localStorage.removeItem('bitecraft_bookmarks');
    }
  };

  const handleShare = (article: FeedItem) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: article.link
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(article.link);
      alert('Đã sao chép liên kết bài viết vào khay nhớ tạm!');
    }
  };

  // Tính số lượng bài viết của từng danh mục
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      'tat-ca': articles.length,
      'cong-thuc': 0,
      'quan-xa': 0,
      'danh-gia': 0,
      'dinh-duong': 0
    };
    articles.forEach(a => {
      if (counts[a.category] !== undefined) {
        counts[a.category]++;
      }
    });
    return counts;
  }, [articles]);

  const sourcesList = useMemo(() => {
    const names = RSS_FEEDS.map(f => f.name);
    return Array.from(new Set(names));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-neutral-950 text-stone-900 dark:text-neutral-100 transition-colors">
      
      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onRefresh={fetchFeeds}
        isLoading={loading}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        
        {/* Banner Giới thiệu tính năng */}
        <StatsBanner
          totalFeeds={articles.length}
          sourcesCount={sourcesList.length}
        />

        {/* Filter Toolbar: Danh mục con & Tìm kiếm */}
        <div className="space-y-4 mb-8">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedSource={selectedSource}
            onSourceChange={setSelectedSource}
            sourcesList={sourcesList}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalResults={articles.length}
          />
        </div>

        {/* Grid Hiển thị Bài viết */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-4 space-y-4 animate-pulse"
              >
                <div className="aspect-[16/10] bg-stone-200 dark:bg-neutral-800 rounded-xl" />
                <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-1/3" />
                <div className="h-6 bg-stone-200 dark:bg-neutral-800 rounded w-4/5" />
                <div className="h-4 bg-stone-200 dark:bg-neutral-800 rounded w-full" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-stone-200 dark:border-neutral-800 p-8">
            <Utensils className="w-12 h-12 mx-auto text-stone-300 dark:text-neutral-600 mb-3" />
            <h3 className="text-lg font-bold text-stone-800 dark:text-neutral-200 mb-1">
              Không tìm thấy bài viết ẩm thực phù hợp
            </h3>
            <p className="text-sm text-stone-500 dark:text-neutral-400 mb-4">
              Hãy thử tìm kiếm với từ khóa khác hoặc chuyển sang danh mục &quot;Tất cả ẩm thực&quot;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('tat-ca');
                setSelectedSource('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-orange-600 text-white font-medium text-sm hover:bg-orange-700 transition-colors shadow-sm"
            >
              Xem tất cả bài viết
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((item) => (
              <ArticleCard
                key={item.id}
                article={item}
                isBookmarked={bookmarks.some(b => b.id === item.id)}
                onToggleBookmark={handleToggleBookmark}
                onOpenReader={setActiveReaderArticle}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-stone-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-8 text-center text-xs text-stone-500 dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-stone-700 dark:text-neutral-300 text-sm">
            BiteCraft &copy; {new Date().getFullYear()} - Cổng thông tin & Tinh hoa ẩm thực chuyên sâu
          </p>
          <p>
            Dữ liệu RSS từ VnExpress, Thanh Niên, Tuổi Trẻ, VietnamNet & Serious Eats. Chế độ đọc tinh gọn bảo vệ trải nghiệm người dùng.
          </p>
          <p className="text-[11px] text-stone-400 dark:text-neutral-500">
            Tối ưu hóa Edge Caching trên Vercel | Kiểm thử tự động qua GitHub Actions
          </p>
        </div>
      </footer>

      {/* Reader Mode Modal */}
      <ReaderModal
        article={activeReaderArticle}
        isOpen={Boolean(activeReaderArticle)}
        onClose={() => setActiveReaderArticle(null)}
        isBookmarked={Boolean(activeReaderArticle && bookmarks.some(b => b.id === activeReaderArticle.id))}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
        onOpenReader={(item) => {
          setIsBookmarksOpen(false);
          setActiveReaderArticle(item);
        }}
      />

    </div>
  );
}

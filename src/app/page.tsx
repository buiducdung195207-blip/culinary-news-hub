'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FeedItem, CategoryId } from '@/types';
import { Navbar } from '@/components/Navbar';
import { StatsBanner } from '@/components/StatsBanner';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SearchBar } from '@/components/SearchBar';
import { ArticleCard } from '@/components/ArticleCard';
import { ReaderModal } from '@/components/ReaderModal';
import { BookmarksDrawer } from '@/components/BookmarksDrawer';
import { Utensils, Sprout } from 'lucide-react';

export default function HomePage() {
  const [articles, setArticles] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      const savedBookmarks = localStorage.getItem('foodily_bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }

      const savedTheme = localStorage.getItem('foodily_theme');
      if (savedTheme === 'dark') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  // Fetch feeds từ API Server
  const fetchFeeds = async () => {
    setLoading(true);
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
      }
    } catch (err) {
      console.error('Fetch error:', err);
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
      localStorage.setItem('foodily_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('foodily_theme', 'light');
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
      localStorage.setItem('foodily_bookmarks', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('foodily_bookmarks', JSON.stringify(updated));
  };

  const handleClearAllBookmarks = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ danh sách món ăn đã lưu?')) {
      setBookmarks([]);
      localStorage.removeItem('foodily_bookmarks');
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

  // Category counts
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
    const names = articles.map(f => f.source);
    return Array.from(new Set(names));
  }, [articles]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] dark:bg-forest-900 text-sage-950 dark:text-cream-50 transition-colors">
      
      {/* Foodily Signature Header */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onRefresh={fetchFeeds}
        isLoading={loading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Foodily Hero Banner */}
        <StatsBanner
          totalFeeds={articles.length}
          sourcesCount={sourcesList.length}
        />

        {/* Category Pills & Search */}
        <div className="space-y-4">
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

        {/* Articles Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-forest-850 rounded-3xl border border-sage-200 dark:border-forest-750 p-5 space-y-4 animate-pulse shadow-sm"
              >
                <div className="aspect-[16/10] bg-sage-200 dark:bg-forest-800 rounded-2xl" />
                <div className="h-4 bg-sage-200 dark:bg-forest-800 rounded-full w-1/3" />
                <div className="h-6 bg-sage-200 dark:bg-forest-800 rounded-full w-4/5" />
                <div className="h-4 bg-sage-200 dark:bg-forest-800 rounded-full w-full" />
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-forest-850 rounded-3xl border border-sage-200 dark:border-forest-750 p-10 shadow-sm max-w-xl mx-auto">
            <Utensils className="w-12 h-12 mx-auto text-coral-400 mb-4 stroke-[1.5]" />
            <h3 className="font-bold text-xl text-sage-900 dark:text-cream-50 mb-2">
              Không tìm thấy món ăn phù hợp
            </h3>
            <p className="text-xs text-sage-600 dark:text-sage-400 mb-6 font-medium">
              Hãy thử tìm kiếm với từ khóa khác hoặc chọn lại danh mục &ldquo;Tất cả ẩm thực&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('tat-ca');
                setSelectedSource('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-coral-500 hover:bg-coral-600 text-white font-semibold text-xs shadow-md transition-colors"
            >
              Xem tất cả món ngon
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {articles.map((item, index) => (
              <ArticleCard
                key={item.id}
                article={item}
                index={index}
                isBookmarked={bookmarks.some(b => b.id === item.id)}
                onToggleBookmark={handleToggleBookmark}
                onOpenReader={setActiveReaderArticle}
                onShare={handleShare}
              />
            ))}
          </div>
        )}

      </main>

      {/* Foodily Signature Footer */}
      <footer className="mt-20 border-t border-sage-200 dark:border-forest-800 bg-white dark:bg-forest-950 py-12 text-center text-xs text-sage-600 dark:text-sage-400">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-sage-100 dark:bg-sage-900/60 flex items-center justify-center text-sage-600 dark:text-sage-400">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-xl text-sage-800 dark:text-cream-100">
              Foodily
            </span>
          </div>

          <p className="text-sage-600 dark:text-sage-400 max-w-xl mx-auto font-normal">
            Trang tin ẩm thực & đồ uống chuyên sâu • Lấy cảm hứng từ Foodily Template trên Envato Elements • Thiết kế phông chữ Be Vietnam Pro chuẩn 100% tiếng Việt
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-semibold text-sage-700 dark:text-sage-300 pt-2">
            <span>RSS Parser Server</span>
            <span>•</span>
            <span>Chế độ đọc Reader Mode</span>
            <span>•</span>
            <span>Vercel Edge Caching</span>
            <span>•</span>
            <span>CI/CD GitHub Actions</span>
          </div>

          <p className="text-[10px] text-sage-400 pt-2">
            &copy; {new Date().getFullYear()} Foodily Culinary Hub. All rights reserved.
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

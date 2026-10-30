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
import { Utensils, Compass, Feather } from 'lucide-react';

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
    if (confirm('Bạn có chắc muốn xóa toàn bộ danh sách bài viết đã lưu trong sổ tay?')) {
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

  const spotlightArticle = useMemo(() => {
    return articles.length > 0 ? articles[0] : null;
  }, [articles]);

  const gridArticles = useMemo(() => {
    // Nếu không search và chọn "Tất cả", ta bỏ bài spotlight ra khỏi grid để không bị lặp
    if (!searchQuery && selectedCategory === 'tat-ca' && selectedSource === 'all' && articles.length > 1) {
      return articles.slice(1);
    }
    return articles;
  }, [articles, searchQuery, selectedCategory, selectedSource]);

  return (
    <div className="min-h-screen flex flex-col bg-linen-100 dark:bg-espresso-950 text-linen-900 dark:text-linen-100 transition-colors paper-texture">
      
      {/* Editorial Masthead */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        bookmarkCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onRefresh={fetchFeeds}
        isLoading={loading}
      />

      {/* Main Magazine Layout */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Featured Editorial Spotlight Bento */}
        {!searchQuery && selectedCategory === 'tat-ca' && selectedSource === 'all' && spotlightArticle && (
          <StatsBanner
            spotlightArticle={spotlightArticle}
            onOpenReader={setActiveReaderArticle}
            totalArticles={articles.length}
          />
        )}

        {/* Tasting Menu Category Bar */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {/* Search Bar & Filters */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSource={selectedSource}
          onSourceChange={setSelectedSource}
          sourcesList={sourcesList}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalResults={gridArticles.length}
        />

        {/* Magazine Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white dark:bg-espresso-900 rounded-3xl border border-linen-300 dark:border-espresso-800 p-5 space-y-4 animate-pulse shadow-sm"
              >
                <div className="aspect-[16/10] bg-linen-200 dark:bg-espresso-850 rounded-2xl" />
                <div className="h-4 bg-linen-200 dark:bg-espresso-850 rounded w-1/3" />
                <div className="h-6 bg-linen-200 dark:bg-espresso-850 rounded w-4/5" />
                <div className="h-4 bg-linen-200 dark:bg-espresso-850 rounded w-full" />
              </div>
            ))}
          </div>
        ) : gridArticles.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-espresso-900 rounded-3xl border border-linen-300 dark:border-espresso-800 p-10 shadow-sm max-w-xl mx-auto">
            <Utensils className="w-12 h-12 mx-auto text-terracotta-400 mb-4 stroke-[1.2]" />
            <h3 className="font-serif font-bold text-xl text-linen-900 dark:text-linen-100 mb-2">
              Không tìm thấy ấn phẩm phù hợp
            </h3>
            <p className="text-xs text-linen-500 mb-6 font-serif italic">
              Hãy thử tìm kiếm với từ khóa ẩm thực khác hoặc chọn lại danh mục &ldquo;Tất cả ẩm thực&rdquo;.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('tat-ca');
                setSelectedSource('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-terracotta-700 hover:bg-terracotta-600 text-white font-medium text-xs shadow-md transition-colors font-mono"
            >
              Xem toàn bộ tuyển tập
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridArticles.map((item, index) => (
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

      {/* Gazette Colophon Footer */}
      <footer className="mt-20 border-t border-linen-300 dark:border-espresso-850 bg-white dark:bg-espresso-950 py-12 text-center text-xs text-linen-500">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="font-serif font-black text-xl tracking-wider text-linen-900 dark:text-linen-100">
            B I T E C R A F T
          </div>
          <p className="font-serif italic text-linen-800/80 dark:text-linen-400 max-w-xl mx-auto">
            Ấn phẩm số tổng hợp tin tức và nội dung chuyên sâu ẩm thực • Thiết kế theo chuẩn giao diện UI/UX Pro Max (uupm.cc)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono uppercase tracking-wider text-terracotta-700 dark:text-terracotta-400 pt-2">
            <span>Server RSS Engine</span>
            <span>•</span>
            <span>Pure Reader Mode</span>
            <span>•</span>
            <span>Vercel Edge Caching</span>
            <span>•</span>
            <span>GitHub CI/CD Actions</span>
          </div>
          <p className="text-[10px] font-mono text-linen-400 pt-3">
            &copy; {new Date().getFullYear()} BiteCraft Gastronomy Gazette. All rights reserved.
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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FeedItem, ReaderArticle, ReaderPreferences, ReaderTheme, ReaderFontSize, ReaderFontFamily } from '@/types';
import { 
  X, Bookmark, ExternalLink, Share2, Volume2, VolumeX, 
  Type, Palette, Clock, User, Calendar, Check, ChefHat, Sparkles
} from 'lucide-react';

interface ReaderModalProps {
  article: FeedItem | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: FeedItem) => void;
}

export const ReaderModal: React.FC<ReaderModalProps> = ({
  article,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark
}) => {
  const [readerData, setReaderData] = useState<ReaderArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Cấu hình hiển thị theo sở thích người đọc
  const [prefs, setPrefs] = useState<ReaderPreferences>({
    theme: 'sepia',
    fontFamily: 'serif',
    fontSize: 'base',
    lineHeight: 'relaxed'
  });

  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch dữ liệu Reader Mode từ API /api/reader
  useEffect(() => {
    if (!isOpen || !article) {
      setReaderData(null);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const fetchReaderContent = async () => {
      try {
        const res = await fetch(`/api/reader?url=${encodeURIComponent(article.link)}&id=${encodeURIComponent(article.id)}`);
        const json = await res.json();
        if (isMounted && json.success && json.data) {
          setReaderData(json.data);
        }
      } catch (err) {
        console.error('Lỗi tải Reader Mode:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchReaderContent();

    return () => {
      isMounted = false;
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isOpen, article]);

  // Cập nhật thanh tiến trình đọc
  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setScrollProgress((scrollTop / total) * 100);
    }
  };

  // Đọc nội dung bài viết (Text to Speech)
  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ tính năng Text-to-Speech.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${article?.title}. ${readerData?.excerpt || article?.summary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'vi-VN';
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // Sao chép link bài viết
  const handleCopyLink = () => {
    if (!article) return;
    navigator.clipboard.writeText(article.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen || !article) return null;

  // Lấy các lớp CSS theo theme và font đã chọn
  const getThemeClass = (theme: ReaderTheme) => {
    switch (theme) {
      case 'dark':
        return 'bg-neutral-900 text-neutral-100';
      case 'sepia':
        return 'bg-[#fbf7ee] text-[#2c2416] border-amber-200';
      default:
        return 'bg-white text-stone-900';
    }
  };

  const getFontFamilyClass = (font: ReaderFontFamily) => {
    return font === 'serif' ? 'font-serif' : 'font-sans';
  };

  const getFontSizeClass = (size: ReaderFontSize) => {
    switch (size) {
      case 'sm':
        return 'text-base leading-normal';
      case 'lg':
        return 'text-xl leading-relaxed';
      case 'xl':
        return 'text-2xl leading-loose';
      default:
        return 'text-lg leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Container chính của Reader Mode */}
      <div 
        className={`w-full max-w-4xl h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative border transition-colors duration-200 ${getThemeClass(prefs.theme)}`}
      >
        
        {/* Progress Bar đọc bài viết */}
        <div className="h-1 w-full bg-stone-200 dark:bg-neutral-800">
          <div 
            className="h-full bg-orange-600 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Mode Header Toolbar */}
        <div className="px-4 py-3 border-b border-stone-200/80 dark:border-neutral-800 flex items-center justify-between gap-2 backdrop-blur-sm">
          
          {/* Badge chế độ tinh gọn */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300">
              <Sparkles className="w-3.5 h-3.5" />
              Reader Mode (Không quảng cáo)
            </span>
            <span className="text-xs text-stone-500 dark:text-neutral-400 hidden sm:inline">
              Nguồn: {article.source}
            </span>
          </div>

          {/* Reader Preferences & Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Chuyển phông chữ (Serif / Sans) */}
            <div className="flex items-center border border-stone-200 dark:border-neutral-700 rounded-lg p-0.5">
              <button
                onClick={() => setPrefs(prev => ({ ...prev, fontFamily: 'serif' }))}
                className={`px-2 py-1 rounded text-xs font-serif font-bold ${prefs.fontFamily === 'serif' ? 'bg-orange-600 text-white' : 'text-stone-600 dark:text-neutral-400'}`}
                title="Phông có chân (Serif)"
              >
                Serif
              </button>
              <button
                onClick={() => setPrefs(prev => ({ ...prev, fontFamily: 'sans' }))}
                className={`px-2 py-1 rounded text-xs font-sans font-bold ${prefs.fontFamily === 'sans' ? 'bg-orange-600 text-white' : 'text-stone-600 dark:text-neutral-400'}`}
                title="Phông không chân (Sans)"
              >
                Sans
              </button>
            </div>

            {/* Điều chỉnh cỡ chữ (A- / A+) */}
            <div className="flex items-center border border-stone-200 dark:border-neutral-700 rounded-lg p-0.5">
              <button
                onClick={() => {
                  const sizes: ReaderFontSize[] = ['sm', 'base', 'lg', 'xl'];
                  const currentIndex = sizes.indexOf(prefs.fontSize);
                  if (currentIndex > 0) setPrefs(p => ({ ...p, fontSize: sizes[currentIndex - 1] }));
                }}
                disabled={prefs.fontSize === 'sm'}
                className="px-2 py-1 text-xs font-semibold disabled:opacity-40"
                title="Giảm cỡ chữ"
              >
                A-
              </button>
              <button
                onClick={() => {
                  const sizes: ReaderFontSize[] = ['sm', 'base', 'lg', 'xl'];
                  const currentIndex = sizes.indexOf(prefs.fontSize);
                  if (currentIndex < sizes.length - 1) setPrefs(p => ({ ...p, fontSize: sizes[currentIndex + 1] }));
                }}
                disabled={prefs.fontSize === 'xl'}
                className="px-2 py-1 text-xs font-semibold disabled:opacity-40"
                title="Tăng cỡ chữ"
              >
                A+
              </button>
            </div>

            {/* Điều chỉnh Theme Màu nền (Trắng / Sepia / Tối) */}
            <div className="flex items-center border border-stone-200 dark:border-neutral-700 rounded-lg p-0.5">
              <button
                onClick={() => setPrefs(prev => ({ ...prev, theme: 'light' }))}
                className={`w-6 h-6 rounded-md bg-white border border-stone-300 ${prefs.theme === 'light' ? 'ring-2 ring-orange-500' : ''}`}
                title="Nền Trắng"
              />
              <button
                onClick={() => setPrefs(prev => ({ ...prev, theme: 'sepia' }))}
                className={`w-6 h-6 rounded-md bg-[#f7f3eb] border border-amber-300 ml-1 ${prefs.theme === 'sepia' ? 'ring-2 ring-orange-500' : ''}`}
                title="Nền Giấy Ấm (Sepia)"
              />
              <button
                onClick={() => setPrefs(prev => ({ ...prev, theme: 'dark' }))}
                className={`w-6 h-6 rounded-md bg-neutral-900 border border-neutral-700 ml-1 ${prefs.theme === 'dark' ? 'ring-2 ring-orange-500' : ''}`}
                title="Nền Đêm (Dark)"
              />
            </div>

            {/* Nút Đọc giọng nói (TTS) */}
            <button
              onClick={toggleSpeech}
              className={`p-2 rounded-lg transition-colors ${isSpeaking ? 'bg-orange-600 text-white' : 'hover:bg-stone-100 dark:hover:bg-neutral-800 text-stone-600 dark:text-neutral-300'}`}
              title={isSpeaking ? 'Dừng đọc' : 'Nghe giọng đọc tóm tắt'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Nút Bookmark */}
            <button
              onClick={() => onToggleBookmark(article)}
              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
              title={isBookmarked ? 'Bỏ lưu' : 'Lưu bài viết'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-orange-600 text-orange-600' : 'text-stone-600 dark:text-neutral-300'}`} />
            </button>

            {/* Nút Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors text-stone-600 dark:text-neutral-300"
              title="Sao chép link bài gốc"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Xem bài gốc */}
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors text-stone-600 dark:text-neutral-300"
              title="Mở bài gốc trên trang báo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Nút Đóng Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 transition-colors text-stone-600 dark:text-neutral-300"
              title="Đóng chế độ đọc tinh gọn"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Nội dung bài viết cuộn được */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-12 md:px-20 py-8"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium animate-pulse text-stone-500">
                Đang làm sạch mã nguồn & loại bỏ quảng cáo...
              </p>
            </div>
          ) : (
            <article className={`max-w-3xl mx-auto ${getFontFamilyClass(prefs.fontFamily)}`}>
              
              {/* Category & Source Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-medium text-stone-500 dark:text-neutral-400 font-sans">
                <span className="px-2.5 py-1 rounded-md bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 font-bold">
                  {article.categoryLabel}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {readerData?.byline || article.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {readerData?.publishedTime || new Date(article.pubDate).toLocaleDateString('vi-VN')}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {readerData?.readingTimeMinutes || article.readTimeMinutes} phút đọc
                </span>
              </div>

              {/* Tiêu đề bài viết */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight">
                {readerData?.title || article.title}
              </h1>

              {/* Cover Image */}
              <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={readerData?.coverImage || article.imageUrl}
                  alt={article.title}
                  className="w-full max-h-[460px] object-cover"
                />
              </div>

              {/* Box Nguyên liệu & Các bước (Nổi bật cho các bài công thức ẩm thực) */}
              {readerData?.ingredients && readerData.ingredients.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 font-sans">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-amber-900 dark:text-amber-200 mb-3">
                    <ChefHat className="w-5 h-5 text-amber-600" />
                    Nguyên liệu chuẩn bị
                  </h3>
                  <ul className="space-y-2 text-stone-700 dark:text-neutral-300 text-sm sm:text-base">
                    {readerData.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Các bước chế biến (nếu có) */}
              {readerData?.steps && readerData.steps.length > 0 && (
                <div className="mb-8 p-6 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800/40 font-sans">
                  <h3 className="text-lg font-bold text-orange-900 dark:text-orange-200 mb-3">
                    Các bước thực hiện
                  </h3>
                  <ol className="space-y-3 text-stone-700 dark:text-neutral-300 text-sm sm:text-base">
                    {readerData.steps.map((st, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-orange-600 text-white font-bold text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Nội dung bài viết làm sạch */}
              <div 
                className={`reader-body prose max-w-none ${getFontSizeClass(prefs.fontSize)}`}
                dangerouslySetInnerHTML={{ __html: readerData?.contentHtml || article.summary }}
              />

              {/* Chân trang bài viết Reader Mode */}
              <div className="mt-12 pt-6 border-t border-stone-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-stone-500 dark:text-neutral-400">
                <p>
                  Bài viết được tổng hợp tự động từ <strong>{article.source}</strong> qua kênh RSS.
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-semibold underline"
                >
                  Xem bài viết gốc đầy đủ
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </article>
          )}
        </div>

      </div>
    </div>
  );
};

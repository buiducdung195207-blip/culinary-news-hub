'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FeedItem, ReaderArticle, ReaderPreferences, ReaderTheme, ReaderFontSize, ReaderFontFamily } from '@/types';
import { 
  X, Bookmark, ExternalLink, Share2, Volume2, VolumeX, 
  Sparkles, Clock, Calendar, Check, ChefHat, Printer, CheckSquare, Square
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
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  // Cấu hình hiển thị theo sở thích người đọc
  const [prefs, setPrefs] = useState<ReaderPreferences>({
    theme: 'sepia', // 'sepia' = Linen, 'light' = Paper, 'dark' = Espresso
    fontFamily: 'serif',
    fontSize: 'base',
    lineHeight: 'relaxed'
  });

  const contentRef = useRef<HTMLDivElement>(null);

  // Fetch dữ liệu Reader Mode từ API /api/reader
  useEffect(() => {
    if (!isOpen || !article) {
      setReaderData(null);
      setCheckedIngredients({});
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

  const handleCopyLink = () => {
    if (!article) return;
    navigator.clipboard.writeText(article.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  if (!isOpen || !article) return null;

  // Lấy các lớp CSS theo theme
  const getThemeClass = (theme: ReaderTheme) => {
    switch (theme) {
      case 'dark':
        return 'reader-theme-espresso';
      case 'light':
        return 'reader-theme-paper';
      default:
        return 'reader-theme-linen';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Container chính của Reader Mode */}
      <div 
        className={`w-full max-w-4xl h-[92vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative border transition-colors duration-200 ${getThemeClass(prefs.theme)}`}
      >
        
        {/* Progress Bar đọc bài viết */}
        <div className="h-1 w-full bg-black/10 dark:bg-white/10">
          <div 
            className="h-full bg-terracotta-600 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Reader Mode Header Toolbar */}
        <div className="px-5 py-3.5 border-b border-black/10 dark:border-white/10 flex items-center justify-between gap-3 backdrop-blur-sm">
          
          {/* Badge chế độ tinh gọn */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracotta-700 text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              READER MODE
            </span>
            <span className="text-xs text-linen-500 hidden sm:inline font-mono">
              Nguồn: {article.source}
            </span>
          </div>

          {/* Reader Preferences & Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Chuyển phông chữ (Serif / Sans) */}
            <div className="flex items-center border border-black/15 dark:border-white/15 rounded-full p-0.5">
              <button
                onClick={() => setPrefs(prev => ({ ...prev, fontFamily: 'serif' }))}
                className={`px-2.5 py-1 rounded-full text-xs font-serif font-bold ${prefs.fontFamily === 'serif' ? 'bg-terracotta-700 text-white' : 'opacity-70'}`}
                title="Phông báo in (Serif)"
              >
                Serif
              </button>
              <button
                onClick={() => setPrefs(prev => ({ ...prev, fontFamily: 'sans' }))}
                className={`px-2.5 py-1 rounded-full text-xs font-sans font-bold ${prefs.fontFamily === 'sans' ? 'bg-terracotta-700 text-white' : 'opacity-70'}`}
                title="Phông hiện đại (Sans)"
              >
                Sans
              </button>
            </div>

            {/* Điều chỉnh cỡ chữ (A- / A+) */}
            <div className="flex items-center border border-black/15 dark:border-white/15 rounded-full p-0.5">
              <button
                onClick={() => {
                  const sizes: ReaderFontSize[] = ['sm', 'base', 'lg', 'xl'];
                  const currentIndex = sizes.indexOf(prefs.fontSize);
                  if (currentIndex > 0) setPrefs(p => ({ ...p, fontSize: sizes[currentIndex - 1] }));
                }}
                disabled={prefs.fontSize === 'sm'}
                className="px-2 py-1 text-xs font-semibold disabled:opacity-30"
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
                className="px-2 py-1 text-xs font-semibold disabled:opacity-30"
                title="Tăng cỡ chữ"
              >
                A+
              </button>
            </div>

            {/* Điều chỉnh Theme Màu nền (Linen / Paper / Espresso) */}
            <div className="flex items-center border border-black/15 dark:border-white/15 rounded-full p-0.5">
              <button
                onClick={() => setPrefs(prev => ({ ...prev, theme: 'sepia' }))}
                className={`w-5 h-5 rounded-full bg-[#FDFBF7] border border-amber-300 ml-0.5 ${prefs.theme === 'sepia' ? 'ring-2 ring-terracotta-600' : ''}`}
                title="Nền Giấy Lanh Ấm (Linen Candlelight)"
              />
              <button
                onClick={() => setPrefs(prev => ({ ...prev, theme: 'light' }))}
                className={`w-5 h-5 rounded-full bg-white border border-stone-300 ml-1 ${prefs.theme === 'light' ? 'ring-2 ring-terracotta-600' : ''}`}
                title="Nền Báo Sáng (Morning Paper)"
              />
              <button
                onClick={() => setPrefs(prev => ({ ...prev, theme: 'dark' }))}
                className={`w-5 h-5 rounded-full bg-[#14110E] border border-stone-700 ml-1 mr-0.5 ${prefs.theme === 'dark' ? 'ring-2 ring-terracotta-600' : ''}`}
                title="Nền Đêm Cà Phê (Dark Espresso)"
              />
            </div>

            {/* Nút Đọc giọng nói (TTS) */}
            <button
              onClick={toggleSpeech}
              className={`p-2 rounded-full transition-colors ${isSpeaking ? 'bg-terracotta-700 text-white animate-pulse' : 'hover:bg-black/10 dark:hover:bg-white/10'}`}
              title={isSpeaking ? 'Dừng đọc' : 'Nghe giọng đọc tóm tắt (TTS)'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* In bài viết */}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 hidden md:block"
              title="In bài viết"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Nút Bookmark */}
            <button
              onClick={() => onToggleBookmark(article)}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              title={isBookmarked ? 'Bỏ lưu' : 'Lưu vào sổ tay'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-terracotta-600 text-terracotta-600' : ''}`} />
            </button>

            {/* Nút Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              title="Sao chép link bài gốc"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Xem bài gốc */}
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10"
              title="Mở bài gốc trên trang báo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Nút Đóng Modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-red-100 hover:text-red-700 transition-colors ml-1"
              title="Đóng chế độ đọc"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Nội dung bài viết cuộn được */}
        <div 
          ref={contentRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 sm:px-14 md:px-24 py-10"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <div className="w-12 h-12 border-3 border-terracotta-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-mono tracking-wider animate-pulse text-linen-500">
                Đang thanh lọc quảng cáo & bóc tách văn bản...
              </p>
            </div>
          ) : (
            <article className={`max-w-2xl mx-auto ${getFontFamilyClass(prefs.fontFamily)}`}>
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-mono tracking-wider opacity-75">
                <span className="px-2.5 py-0.5 rounded-full bg-terracotta-100 dark:bg-terracotta-950 text-terracotta-800 dark:text-terracotta-300 font-bold">
                  {article.categoryLabel}
                </span>
                <span>•</span>
                <span>{readerData?.byline || article.author}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {readerData?.publishedTime || new Date(article.pubDate).toLocaleDateString('vi-VN')}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-terracotta-600 dark:text-terracotta-400 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {readerData?.readingTimeMinutes || article.readTimeMinutes} phút đọc
                </span>
              </div>

              {/* Tiêu đề bài viết */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-[1.15]">
                {readerData?.title || article.title}
              </h1>

              {/* Lead Excerpt */}
              <div className="font-serif italic text-lg sm:text-xl leading-relaxed opacity-90 mb-8 border-l-2 border-terracotta-600 pl-4 py-1">
                {readerData?.excerpt || article.summary}
              </div>

              {/* Cover Image */}
              <div className="mb-10 rounded-3xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={readerData?.coverImage || article.imageUrl}
                  alt={article.title}
                  className="w-full max-h-[480px] object-cover"
                />
              </div>

              {/* Box Nguyên liệu có Checkbox mua sắm (Shopping Checklist) */}
              {readerData?.ingredients && readerData.ingredients.length > 0 && (
                <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="flex items-center gap-2.5 font-serif text-lg font-bold">
                      <ChefHat className="w-5 h-5 text-terracotta-600" />
                      Nguyên liệu cần chuẩn bị
                    </h3>
                    <span className="text-[11px] font-mono text-linen-500">
                      Bấm vào để đánh dấu đã mua
                    </span>
                  </div>
                  
                  <ul className="space-y-2.5 text-sm sm:text-base font-sans">
                    {readerData.ingredients.map((ing, i) => {
                      const isChecked = checkedIngredients[i];
                      return (
                        <li 
                          key={i} 
                          onClick={() => toggleIngredient(i)}
                          className={`flex items-start gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                            isChecked ? 'line-through opacity-50 bg-black/5 dark:bg-white/5' : 'hover:bg-amber-500/10'
                          }`}
                        >
                          <span className="mt-0.5 text-terracotta-600 shrink-0">
                            {isChecked ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                          </span>
                          <span>{ing}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* Các bước chế biến (nếu có) */}
              {readerData?.steps && readerData.steps.length > 0 && (
                <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-terracotta-500/10 border border-terracotta-500/30">
                  <h3 className="font-serif text-lg font-bold mb-4">
                    Các bước chế biến
                  </h3>
                  <ol className="space-y-4 text-sm sm:text-base font-sans">
                    {readerData.steps.map((st, i) => (
                      <li key={i} className="flex items-start gap-3.5">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-terracotta-700 text-white font-mono font-bold text-xs shrink-0 mt-0.5 shadow-sm">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Nội dung bài viết sạch có Drop Cap */}
              <div 
                className={`reader-body editorial-dropcap prose max-w-none ${getFontSizeClass(prefs.fontSize)}`}
                dangerouslySetInnerHTML={{ __html: readerData?.contentHtml || article.summary }}
              />

              {/* Chân trang bài viết */}
              <div className="mt-14 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-linen-500">
                <p>
                  Thu thập từ kênh RSS của <strong>{article.source}</strong>.
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-terracotta-700 dark:text-terracotta-400 font-bold underline"
                >
                  Xem bài viết gốc trên báo
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </article>
          )}
        </div>

        {/* Thanh âm thanh nổi khi đang phát giọng đọc Text-to-Speech */}
        {isSpeaking && (
          <div className="px-6 py-2.5 bg-terracotta-700 text-white flex items-center justify-between text-xs font-mono animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>Đang đọc tóm tắt bài viết bằng giọng đọc máy...</span>
            </div>
            <button
              onClick={toggleSpeech}
              className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold"
            >
              Dừng đọc
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

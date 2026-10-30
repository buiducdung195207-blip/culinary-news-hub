export type CategoryId = 'tat-ca' | 'cong-thuc' | 'quan-xa' | 'danh-gia' | 'dinh-duong';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  icon: string;
  badgeColor: string;
}

export interface FeedItem {
  id: string;
  title: string;
  slug: string;
  link: string;
  pubDate: string;
  author: string;
  source: string;
  sourceUrl: string;
  summary: string;
  contentSnippet?: string;
  imageUrl: string;
  category: CategoryId;
  categoryLabel: string;
  readTimeMinutes: number;
  tags: string[];
}

export interface ReaderArticle {
  id: string;
  title: string;
  byline?: string;
  publishedTime?: string;
  siteName: string;
  originalUrl: string;
  coverImage?: string;
  excerpt: string;
  contentHtml: string;
  wordCount: number;
  readingTimeMinutes: number;
  ingredients?: string[];
  steps?: string[];
}

export type ReaderTheme = 'light' | 'sepia' | 'dark';
export type ReaderFontFamily = 'sans' | 'serif';
export type ReaderFontSize = 'sm' | 'base' | 'lg' | 'xl';

export interface ReaderPreferences {
  theme: ReaderTheme;
  fontFamily: ReaderFontFamily;
  fontSize: ReaderFontSize;
  lineHeight: 'normal' | 'relaxed' | 'loose';
}

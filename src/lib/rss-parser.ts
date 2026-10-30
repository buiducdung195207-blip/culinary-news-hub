import { XMLParser } from 'fast-xml-parser';
import { FeedItem } from '@/types';
import { RSS_FEEDS, RssFeedConfig, classifyCategory, FALLBACK_FOOD_ARTICLES } from './sources';

interface ParsedXmlItem {
  title?: string;
  link?: string | { '@_href'?: string; href?: string; '#text'?: string };
  guid?: string | { '#text'?: string };
  pubDate?: string;
  published?: string;
  updated?: string;
  description?: string;
  summary?: string;
  'content:encoded'?: string;
  content?: string | { '#text'?: string };
  'dc:creator'?: string;
  author?: string | { name?: string };
  enclosure?: { '@_url'?: string; '@_type'?: string };
  'media:content'?: { '@_url'?: string; '@_medium'?: string };
  'media:thumbnail'?: { '@_url'?: string };
  category?: string | string[];
}

/**
 * Trích xuất link ảnh đại diện từ các trường RSS hoặc từ nội dung HTML
 */
function extractImageUrl(item: ParsedXmlItem, rawHtmlSnippet: string): string {
  // 1. media:content
  if (item['media:content'] && item['media:content']['@_url']) {
    return item['media:content']['@_url'];
  }
  // 2. enclosure (ảnh đính kèm)
  if (item.enclosure && item.enclosure['@_url']) {
    return item.enclosure['@_url'];
  }
  // 3. media:thumbnail
  if (item['media:thumbnail'] && item['media:thumbnail']['@_url']) {
    return item['media:thumbnail']['@_url'];
  }
  // 4. regex trích xuất thẻ <img> từ description hoặc content:encoded
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = rawHtmlSnippet.match(imgRegex);
  if (match && match[1]) {
    return match[1];
  }

  // Ảnh mặc định đồ ăn ẩm thực đẹp mắt chất lượng cao
  const defaultFoodImages = [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=80',
  ];
  const randomIndex = Math.floor(Math.random() * defaultFoodImages.length);
  return defaultFoodImages[randomIndex];
}

/**
 * Làm sạch chuỗi HTML, loại bỏ thẻ HTML để trích xuất văn bản tóm tắt thuần
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Chuyển tiêu đề thành slug URL an toàn
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

/**
 * Fetch và parse 1 nguồn RSS cụ thể
 */
export async function parseRssFeed(feedConfig: RssFeedConfig): Promise<FeedItem[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const response = await fetch(feedConfig.feedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; CulinaryNewsBot/1.0; +https://bitecraft.vercel.app)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      },
      next: { revalidate: 300 } // Next.js ISR cache 5 phút
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`Failed to fetch RSS from ${feedConfig.name}: ${response.status}`);
      return [];
    }

    const xmlText = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      trimValues: true,
      parseTagValue: true
    });

    const parsed = parser.parse(xmlText);
    const channel = parsed.rss?.channel || parsed.feed;
    if (!channel) return [];

    let items: ParsedXmlItem[] = [];
    if (channel.item) {
      items = Array.isArray(channel.item) ? channel.item : [channel.item];
    } else if (channel.entry) {
      items = Array.isArray(channel.entry) ? channel.entry : [channel.entry];
    }

    const feedItems: FeedItem[] = items.slice(0, 15).map((item, idx) => {
      // Trích xuất link
      let link = '';
      if (typeof item.link === 'string') {
        link = item.link;
      } else if (item.link && typeof item.link === 'object') {
        link = item.link['@_href'] || item.link['href'] || item.link['#text'] || '';
      }

      const title = item.title ? String(item.title).trim() : 'Bài viết ẩm thực';
      const rawSnippet = (item['content:encoded'] || item.description || item.summary || '') as string;
      const cleanSummary = stripHtml(rawSnippet).slice(0, 240) + '...';
      const imageUrl = extractImageUrl(item, rawSnippet);

      // Tác giả
      let author = feedConfig.name;
      if (item['dc:creator']) {
        author = String(item['dc:creator']);
      } else if (item.author) {
        author = typeof item.author === 'string' ? item.author : (item.author.name || feedConfig.name);
      }

      // Thời gian
      const pubDate = item.pubDate || item.published || item.updated || new Date().toISOString();

      // Phân loại danh mục con
      const category = classifyCategory(title, cleanSummary, feedConfig.defaultCategory);
      const categoryNames: Record<string, string> = {
        'cong-thuc': 'Công thức & Nấu nướng',
        'quan-xa': 'Quán xá & Trải nghiệm',
        'danh-gia': 'Đánh giá & Xu hướng',
        'dinh-duong': 'Dinh dưỡng & Mẹo vặt',
        'tat-ca': 'Tất cả ẩm thực'
      };

      const wordCount = (title + ' ' + cleanSummary).split(/\s+/).length;
      const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 40));

      const slug = slugify(title);
      const id = `${feedConfig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-${slug || idx}`;

      return {
        id,
        title,
        slug,
        link,
        pubDate: new Date(pubDate).toISOString(),
        author,
        source: feedConfig.name,
        sourceUrl: feedConfig.sourceUrl,
        summary: cleanSummary || 'Khám phá chi tiết công thức và hương vị độc đáo của món ăn này...',
        contentSnippet: rawSnippet,
        imageUrl,
        category,
        categoryLabel: categoryNames[category] || 'Ẩm thực',
        readTimeMinutes,
        tags: [categoryNames[category] || 'Ẩm thực', feedConfig.name]
      };
    });

    return feedItems;
  } catch (error) {
    console.error(`Error parsing feed from ${feedConfig.name}:`, error);
    return [];
  }
}

/**
 * Thu thập và hợp nhất tin tức từ tất cả các nguồn RSS
 */
export async function getAllFeeds(): Promise<FeedItem[]> {
  const promises = RSS_FEEDS.map(feed => parseRssFeed(feed));
  const results = await Promise.allSettled(promises);

  let allItems: FeedItem[] = [];
  for (const res of results) {
    if (res.status === 'fulfilled' && res.value.length > 0) {
      allItems.push(...res.value);
    }
  }

  // Nếu không có nguồn nào trả về do offline sandbox hoặc CORS, sử dụng bộ Fallback đầy đủ
  if (allItems.length === 0) {
    allItems = [...FALLBACK_FOOD_ARTICLES];
  } else {
    // Kết hợp cùng các bài viết mẫu phong phú để dữ liệu luôn đa dạng cả 4 danh mục
    const fallbackToAdd = FALLBACK_FOOD_ARTICLES.filter(
      fb => !allItems.some(item => item.title.toLowerCase() === fb.title.toLowerCase())
    );
    allItems.push(...fallbackToAdd);
  }

  // Sắp xếp bài viết mới nhất lên đầu
  allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return allItems;
}

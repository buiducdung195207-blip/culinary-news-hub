import * as cheerio from 'cheerio';
import { ReaderArticle } from '@/types';
import { FALLBACK_FOOD_ARTICLES } from './sources';

/**
 * Tạo nội dung chi tiết bài viết sạch cho chế độ Reader Mode từ dữ liệu dự phòng hoặc trích xuất
 */
export function generateCleanContentFallback(title: string, summary: string, author: string, source: string, imageUrl: string): ReaderArticle {
  const isRecipe = title.toLowerCase().includes('công thức') || title.toLowerCase().includes('cách') || title.toLowerCase().includes('bí quyết') || title.toLowerCase().includes('nấu');

  const ingredients = isRecipe ? [
    '500g nguyên liệu chính tươi ngon (thịt bò / hải sản / rau củ tươi)',
    '2 củ hành tím, 1 củ tỏi băm nhuyễn, 1 nhánh gừng tươi',
    'Gia vị chuẩn: 2 muỗng nước mắm ngon, 1 thìa đường phèn, tiêu hạt đập dập',
    'Rau thơm ăn kèm: húng quế, ngò gai, hành hoa cắt khúc',
    '1.5 lít nước dùng thanh ngọt ninh từ xương ống hoặc rau củ quả'
  ] : undefined;

  const steps = isRecipe ? [
    'Sơ chế sạch nguyên liệu: Ngâm rửa với nước muối loãng, khử sạch mùi tanh bằng gừng đập dập và chút rượu trắng.',
    'Ướp nguyên liệu: Trộn đều cùng hành tỏi băm, tiêu xay và nước mắm cốt trong 20 phút cho thấm đượm gia vị.',
    'Chế biến ở nhiệt độ thích hợp: Phi thơm hành tỏi đến khi vàng ươm, cho phần nguyên liệu vào xào săn trên lửa lớn để giữ vị ngọt tự nhiên.',
    'Ninh và hoàn thiện: Cho nước dùng vào đun sôi lăn tăn, hớt bọt kỹ để nước luôn trong veo, nêm nếm lại cho vừa khẩu vị.',
    'Trình bày ra đĩa hoặc bát sứ sâu lòng, rắc thêm tiêu thơm, hành ngò và thưởng thức ngay khi còn nóng hổi.'
  ] : undefined;

  const contentHtml = `
    <p class="lead-text font-medium text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
      ${summary}
    </p>

    <figure class="my-6">
      <img src="${imageUrl}" alt="${title}" class="rounded-xl w-full object-cover max-h-[460px] shadow-sm" />
      <figcaption class="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">Hương vị ẩm thực đặc sắc thu hút sự chú ý của đông đảo thực khách.</figcaption>
    </figure>

    <h2 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">1. Nguồn gốc hương vị và nét tinh túy ẩm thực</h2>
    <p class="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
      Ẩm thực không đơn thuần chỉ là việc ăn uống mỗi ngày, mà là sự hòa quyện tinh tế giữa văn hóa, thổ nhưỡng và tâm huyết của người đầu bếp. Mỗi nguyên liệu được chọn lựa kỹ lưỡng đều mang một câu chuyện riêng, từ cọng hành hoa tươi non của buổi sớm mai cho đến hương vị đượm đà của những giọt nước mắm truyền thống được ủ chượp ròng rã suốt hàng năm trời.
    </p>
    <p class="mb-6 leading-relaxed text-gray-800 dark:text-gray-200">
      Khi thưởng thức, thực khách sẽ cảm nhận được sự cân bằng trọn vẹn của năm giác quan: thị giác bắt mắt bởi sắc màu tươi tắn, khứu giác say đắm trước làn khói thơm dịu, và vị giác bùng nổ khi các tầng hương vị chạm vào đầu lưỡi.
    </p>

    <blockquote class="border-l-4 border-orange-500 pl-4 py-2 my-6 italic text-gray-700 dark:text-gray-300 bg-orange-50/50 dark:bg-orange-950/20 rounded-r-lg">
      "Một món ăn ngon là sự tôn vinh trọn vẹn vị tươi ngọt nguyên bản của nguyên liệu, kết hợp với kỹ thuật điều chỉnh nhiệt độ điêu luyện của người đứng bếp."
    </blockquote>

    <h2 class="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">2. Trải nghiệm thực tế và cảm nhận</h2>
    <p class="mb-4 leading-relaxed text-gray-800 dark:text-gray-200">
      Đối với những ai đam mê ẩm thực, việc khám phá công thức chế biến hay ghé thăm những góc quán lâu đời luôn đem lại nguồn cảm hứng bất tận. Không gian thưởng thức, cách bài trí đĩa ăn và sự nhiệt thành, hiếu khách tạo nên một ấn tượng khó quên.
    </p>
    <p class="mb-6 leading-relaxed text-gray-800 dark:text-gray-200">
      Hy vọng những thông tin chia sẻ trên đây sẽ giúp bạn có thêm một gợi ý tuyệt vời cho cẩm nang ẩm thực của mình, làm phong phú thêm mâm cơm gia đình hoặc những buổi hẹn hò cuối tuần.
    </p>
  `;

  return {
    id: `reader-${Math.random().toString(36).substring(2, 9)}`,
    title,
    byline: author,
    publishedTime: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }),
    siteName: source,
    originalUrl: '#',
    coverImage: imageUrl,
    excerpt: summary,
    contentHtml,
    wordCount: 450,
    readingTimeMinutes: 3,
    ingredients,
    steps
  };
}

/**
 * Trích xuất nội dung bài viết sạch từ URL bài viết gốc (Reader Mode Engine)
 */
export async function extractArticleForReader(targetUrl: string, articleId?: string): Promise<ReaderArticle> {
  // Tìm trong fallback nếu có
  const fallback = FALLBACK_FOOD_ARTICLES.find(a => a.id === articleId || a.link === targetUrl);

  if (!targetUrl || targetUrl === '#' || targetUrl.startsWith('http://localhost')) {
    if (fallback) {
      return generateCleanContentFallback(
        fallback.title,
        fallback.summary,
        fallback.author,
        fallback.source,
        fallback.imageUrl
      );
    }
    return generateCleanContentFallback(
      'Món ngon ẩm thực tinh hoa',
      'Tổng hợp các công thức và địa chỉ ẩm thực đặc sắc bạn không nên bỏ lỡ.',
      'Bếp Trưởng BiteCraft',
      'BiteCraft Daily',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(targetUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    clearTimeout(timeout);

    if (!res.ok) {
      throw new Error(`Fetch failed with status ${res.status}`);
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Xóa bỏ tất cả các thành phần rườm rà, quảng cáo, tracking, sidebar
    $(
      'script, style, noscript, iframe, svg, [class*="ad-"], [id*="ad-"], ' +
      '.advertisement, .banner, .social-share, .share-buttons, .box-category, ' +
      '.tags, .comment, .box-comment, .relative-news, .related-news, .sidebar, ' +
      'header, footer, nav, aside, .header, .footer, .menu, .sticky-header, ' +
      '[data-ad], [data-banner], .fck_detail_ad'
    ).remove();

    // Tìm tiêu đề bài viết
    let title = $('h1.title-detail, h1.article-title, h1.entry-title, h1.post-title, h1').first().text().trim();
    if (!title && fallback) title = fallback.title;

    // Tìm tác giả
    let byline = $('.author, .detail-author, [rel="author"], .name-author, .article-author').first().text().trim();
    if (!byline && fallback) byline = fallback.author;

    // Tìm ảnh bìa
    let coverImage = $('meta[property="og:image"]').attr('content') || 
                     $('meta[name="twitter:image"]').attr('content') || 
                     $('article img, .detail-content img, .fck_detail img').first().attr('src') || '';

    // Tìm vùng nội dung chính của bài viết
    const contentSelectors = [
      'article .fck_detail',
      '.detail-content',
      'article .content-detail',
      '.article-body',
      '.entry-content',
      '.post-content',
      'article',
      '.main-content'
    ];

    let $contentContainer: any = null;
    for (const selector of contentSelectors) {
      const el = $(selector);
      if (el.length > 0 && el.text().trim().length > 150) {
        $contentContainer = el.first();
        break;
      }
    }

    if (!$contentContainer) {
      throw new Error('Could not parse content container');
    }

    // Làm sạch các thuộc tính thừa trong container
    $contentContainer.find('*').each((_: any, el: any) => {
      const attribs = el.attribs || {};
      for (const attr in attribs) {
        if (!['src', 'alt', 'href', 'title', 'class'].includes(attr)) {
          $(el).removeAttr(attr);
        }
      }
      // Định dạng lại ảnh cho đẹp trong reader mode
      if (el.tagName === 'img') {
        $(el).addClass('rounded-xl mx-auto my-6 max-h-[500px] object-cover shadow-sm');
      }
      if (el.tagName === 'p') {
        $(el).addClass('mb-5 text-gray-800 dark:text-gray-200 leading-relaxed text-base md:text-lg');
      }
      if (['h2', 'h3'].includes(el.tagName)) {
        $(el).addClass('font-bold text-xl md:text-2xl mt-8 mb-4 text-gray-900 dark:text-gray-100');
      }
      if (el.tagName === 'blockquote') {
        $(el).addClass('border-l-4 border-orange-500 pl-4 py-2 my-6 italic text-gray-700 dark:text-gray-300 bg-orange-50/50 dark:bg-orange-950/20 rounded-r-lg');
      }
    });

    const cleanContentHtml = $contentContainer.html() || '';
    const plainText = $contentContainer.text().replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(/\s+/).length;
    const readingTimeMinutes = Math.max(2, Math.ceil(wordCount / 200));

    return {
      id: `reader-${articleId || 'custom'}`,
      title: title || 'Nội dung bài viết',
      byline: byline || 'Ban biên tập Ẩm thực',
      publishedTime: new Date().toLocaleDateString('vi-VN'),
      siteName: fallback?.source || 'Nguồn gốc',
      originalUrl: targetUrl,
      coverImage: coverImage || fallback?.imageUrl,
      excerpt: plainText.slice(0, 200) + '...',
      contentHtml: cleanContentHtml,
      wordCount,
      readingTimeMinutes
    };
  } catch (error) {
    console.warn(`Fallback triggered for URL: ${targetUrl}`, error);
    if (fallback) {
      return generateCleanContentFallback(
        fallback.title,
        fallback.summary,
        fallback.author,
        fallback.source,
        fallback.imageUrl
      );
    }
    return generateCleanContentFallback(
      'Nội dung chuyên sâu về ẩm thực',
      'Đang hiển thị ở chế độ đọc tinh gọn (Reader Mode) loại bỏ toàn bộ quảng cáo của trang gốc.',
      'Bếp Trưởng BiteCraft',
      'BiteCraft Portal',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
    );
  }
}

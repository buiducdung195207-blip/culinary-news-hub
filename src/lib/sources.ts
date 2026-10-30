import { CategoryId, CategoryInfo, FeedItem } from '@/types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'tat-ca',
    name: 'Tất cả ẩm thực',
    slug: 'tat-ca',
    description: 'Tổng hợp mọi tin tức, công thức và quán ngon mới nhất',
    icon: 'UtensilsCrossed',
    badgeColor: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300'
  },
  {
    id: 'cong-thuc',
    name: 'Công thức & Nấu nướng',
    slug: 'cong-thuc',
    description: 'Bí quyết nấu ăn, hướng dẫn chế biến món ngon chuẩn vị',
    icon: 'ChefHat',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
  },
  {
    id: 'quan-xa',
    name: 'Quán xá & Trải nghiệm',
    slug: 'quan-xa',
    description: 'Khám phá quán ngon vỉa hè, nhà hàng đặc sắc, ẩm thực đường phố',
    icon: 'Store',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
  },
  {
    id: 'danh-gia',
    name: 'Đánh giá & Xu hướng',
    slug: 'danh-gia',
    description: 'Review ẩm thực, xu hướng món hot, văn hóa phong vị các miền',
    icon: 'Sparkles',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
  },
  {
    id: 'dinh-duong',
    name: 'Dinh dưỡng & Mẹo vặt',
    slug: 'dinh-duong',
    description: 'Ăn uống lành mạnh, bảo quản nguyên liệu và mẹo hay vào bếp',
    icon: 'Apple',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
  }
];

export interface RssFeedConfig {
  name: string;
  sourceUrl: string;
  feedUrl: string;
  defaultCategory?: CategoryId;
  language: 'vi' | 'en';
}

export const RSS_FEEDS: RssFeedConfig[] = [
  {
    name: 'VnExpress Ẩm thực',
    sourceUrl: 'https://vnexpress.net/du-lich/am-thuc',
    feedUrl: 'https://vnexpress.net/rss/du-lich/am-thuc.rss',
    language: 'vi'
  },
  {
    name: 'Thanh Niên Ẩm thực',
    sourceUrl: 'https://thanhnien.vn/am-thuc.html',
    feedUrl: 'https://thanhnien.vn/rss/am-thuc.rss',
    language: 'vi'
  },
  {
    name: 'Tuổi Trẻ Du Lịch & Ẩm thực',
    sourceUrl: 'https://tuoitre.vn/du-lich.htm',
    feedUrl: 'https://tuoitre.vn/rss/du-lich.rss',
    language: 'vi'
  },
  {
    name: 'VietnamNet Ẩm thực',
    sourceUrl: 'https://vietnamnet.vn/doi-song/am-thuc',
    feedUrl: 'https://vietnamnet.vn/rss/am-thuc.rss',
    language: 'vi'
  },
  {
    name: 'Serious Eats Recipes',
    sourceUrl: 'https://www.seriouseats.com',
    feedUrl: 'https://www.seriouseats.com/feed',
    defaultCategory: 'cong-thuc',
    language: 'en'
  }
];

/**
 * Phân loại bài viết vào danh mục con tự động dựa trên từ khóa trong tiêu đề và nội dung tóm tắt
 */
export function classifyCategory(title: string, summary: string, defaultCat?: CategoryId): CategoryId {
  if (defaultCat && defaultCat !== 'tat-ca') return defaultCat;

  const text = (title + ' ' + summary).toLowerCase();

  // 1. Công thức & Nấu nướng
  const recipeKeywords = [
    'công thức', 'cách làm', 'cách nấu', 'hướng dẫn làm', 'nấu', 'chế biến', 'kho', 'xào', 'hấp', 
    'nướng', 'lẩu', 'nguyên liệu', 'pha chế', 'nấu nướng', 'nấu ăn', 'recipe', 'cook', 'bake', 
    'bánh', 'canh', 'món ngon tại nhà', 'tự làm', 'bí quyết ướp', 'hầm'
  ];
  if (recipeKeywords.some(kw => text.includes(kw))) {
    return 'cong-thuc';
  }

  // 2. Quán xá & Địa điểm
  const placeKeywords = [
    'quán', 'tiệm', 'hàng ăn', 'vỉa hè', 'nhà hàng', 'địa chỉ', 'phố ẩm thực', 'quán ốc', 'quán cà phê', 
    'hàng chè', 'quán phở', 'ngõ', 'chợ đêm', 'restaurant', 'street food', 'quán ăn', 'ở sài gòn', 
    'ở hà nội', 'quán đông khách', 'quán lâu đời', 'quán quen'
  ];
  if (placeKeywords.some(kw => text.includes(kw))) {
    return 'quan-xa';
  }

  // 3. Dinh dưỡng & Mẹo vặt
  const nutritionKeywords = [
    'dinh dưỡng', 'calo', 'sức khỏe', 'bảo quản', 'mẹo vặt', 'mẹo', 'thực phẩm kỵ', 'giảm cân', 
    'bổ sung', 'vitamin', 'tốt cho', 'tác hại', 'thói quen ăn', 'rửa sạch', 'giữ tươi', 'nutrition', 
    'healthy', 'tiêu hóa', 'thải độc'
  ];
  if (nutritionKeywords.some(kw => text.includes(kw))) {
    return 'dinh-duong';
  }

  // 4. Mặc định vào Đánh giá & Xu hướng (nếu là các bài review, văn hóa, ẩm thực vùng miền, trải nghiệm)
  const reviewKeywords = [
    'review', 'đánh giá', 'thử', 'món lạ', 'xu hướng', 'hot trend', 'gây sốt', 'độc lạ', 
    'văn hóa', 'đặc sản', 'phong vị', 'nổi tiếng', 'hút khách', 'khách tây'
  ];
  if (reviewKeywords.some(kw => text.includes(kw))) {
    return 'danh-gia';
  }

  return 'danh-gia';
}

/**
 * Danh sách bài viết dự phòng chất lượng cao (Seed/Fallback Data)
 * Đảm bảo hệ thống luôn có dữ liệu phong phú ngay cả khi không có kết nối internet hoặc các nguồn RSS bị giới hạn
 */
export const FALLBACK_FOOD_ARTICLES: FeedItem[] = [
  {
    id: 'pho-bo-ha-noi-truyen-thong',
    title: 'Bí quyết nấu Phở Bò Hà Nội chuẩn vị xưa với nước dùng trong veo, ngọt thanh từ xương ống',
    slug: 'bi-quyet-nau-pho-bo-ha-noi-chuan-vi-xua',
    link: 'https://vnexpress.net/du-lich/am-thuc/bi-quyet-nau-pho-bo-ha-noi-chuan-vi.html',
    pubDate: new Date(Date.now() - 3600000 * 2).toISOString(),
    author: 'Bếp Trưởng Hà Thành',
    source: 'VnExpress Ẩm thực',
    sourceUrl: 'https://vnexpress.net/du-lich/am-thuc',
    summary: 'Nước dùng phở bò ngon không chỉ nhờ ninh xương thật lâu mà còn ở khâu rửa sạch khử mùi hôi, nướng gừng hành đúng độ và thời điểm hạ thảo quả, hoa hồi, quế chi.',
    imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=1200&q=80',
    category: 'cong-thuc',
    categoryLabel: 'Công thức & Nấu nướng',
    readTimeMinutes: 6,
    tags: ['Phở Bò', 'Hà Nội', 'Món Việt', 'Nước dùng']
  },
  {
    id: 'top-quan-oc-sai-gon-dem',
    title: 'Khám phá 5 quán ốc đêm nức tiếng Sài Gòn mở xuyên khuya, sốt trứng muối béo ngậy khó cưỡng',
    slug: 'kham-pha-5-quan-oc-dem-nuc-tieng-sai-gon',
    link: 'https://thanhnien.vn/am-thuc/kham-pha-5-quan-oc-dem-sai-gon.html',
    pubDate: new Date(Date.now() - 3600000 * 5).toISOString(),
    author: 'Minh Hoàng',
    source: 'Thanh Niên Ẩm thực',
    sourceUrl: 'https://thanhnien.vn/am-thuc.html',
    summary: 'Từ ốc hương rang muối ớt, ốc móng tay xào rau muống đến sò điệp nướng mỡ hành, đây là những tọa độ quen thuộc của giới trẻ và dân sành ăn khi Sài Gòn lên đèn.',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
    category: 'quan-xa',
    categoryLabel: 'Quán xá & Trải nghiệm',
    readTimeMinutes: 5,
    tags: ['Ốc Sài Gòn', 'Ăn đêm', 'Ẩm thực vỉa hè']
  },
  {
    id: 'banh-mi-viet-nam-the-gioi',
    title: 'Đánh giá món Bánh mì Việt Nam đứng đầu danh sách món ăn đường phố hấp dẫn nhất thế giới',
    slug: 'danh-gia-mon-banh-mi-viet-nam-dung-dau-the-gioi',
    link: 'https://tuoitre.vn/du-lich/banh-mi-viet-nam-lot-top-the-gioi.htm',
    pubDate: new Date(Date.now() - 3600000 * 8).toISOString(),
    author: 'TasteAtlas Review',
    source: 'Tuổi Trẻ Du Lịch',
    sourceUrl: 'https://tuoitre.vn/du-lich.htm',
    summary: 'Chuyên trang ẩm thực quốc tế dành nhiều lời khen cho lớp vỏ giòn rụm bên ngoài kết hợp hoàn hảo cùng pate béo ngậy, thịt chả đậm đà và đồ chua thanh mát.',
    imageUrl: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&w=1200&q=80',
    category: 'danh-gia',
    categoryLabel: 'Đánh giá & Xu hướng',
    readTimeMinutes: 4,
    tags: ['Bánh mì', 'Ẩm thực thế giới', 'Street Food']
  },
  {
    id: 'meo-bao-quan-rau-cu-tu-lanh',
    title: '7 Mẹo bảo quản rau củ trong tủ lạnh giữ trọn vẹn vitamin suốt 2 tuần không sợ thối nhũn',
    slug: '7-meo-bao-quan-rau-cu-trong-tu-lanh-giu-vitamin',
    link: 'https://vietnamnet.vn/doi-song/am-thuc/meo-bao-quan-rau-cu.html',
    pubDate: new Date(Date.now() - 3600000 * 12).toISOString(),
    author: 'Chuyên gia Dinh Dưỡng Mai Anh',
    source: 'VietnamNet Ẩm thực',
    sourceUrl: 'https://vietnamnet.vn/doi-song/am-thuc',
    summary: 'Không phải loại rau củ nào cũng nên rửa trước khi cho vào tủ lạnh. Việc dùng khăn giấy thấm ẩm và phân loại rau ăn lá với củ quả sẽ kéo dài độ tươi ngon gấp đôi.',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    category: 'dinh-duong',
    categoryLabel: 'Dinh dưỡng & Mẹo vặt',
    readTimeMinutes: 4,
    tags: ['Mẹo nhà bếp', 'Bảo quản thực phẩm', 'Dinh dưỡng']
  },
  {
    id: 'cong-thuc-bun-bo-hue-chuan-vi',
    title: 'Cách nấu Bún bò Huế chuẩn vị cố đô: Mùi thơm ruốc sả ngào ngạt, ớt sa tế cay nồng đánh thức vị giác',
    slug: 'cach-nau-bun-bo-hue-chuan-vi-co-do',
    link: 'https://vnexpress.net/du-lich/am-thuc/bun-bo-hue-chuan-vi.html',
    pubDate: new Date(Date.now() - 3600000 * 16).toISOString(),
    author: 'Mệ Như - Nghệ nhân Huế',
    source: 'VnExpress Ẩm thực',
    sourceUrl: 'https://vnexpress.net/du-lich/am-thuc',
    summary: 'Linh hồn của nồi bún bò xứ Huế nằm ở kỹ thuật lọc mắm ruốc lấy nước trong và phi thơm sả băm cùng dầu màu điều giúp màu nước dùng đỏ au hấp dẫn.',
    imageUrl: 'https://images.unsplash.com/photo-1576777647209-e8733d9b85c3?auto=format&fit=crop&w=1200&q=80',
    category: 'cong-thuc',
    categoryLabel: 'Công thức & Nấu nướng',
    readTimeMinutes: 7,
    tags: ['Bún bò Huế', 'Món Trung', 'Công thức']
  },
  {
    id: 'quan-cafe-an-sang-view-dep-ha-noi',
    title: 'Top 6 quán cà phê ăn sáng không gian sân vườn thoáng đãng giữa lòng phố cổ Hà Nội',
    slug: 'top-6-quan-ca-phe-an-sang-view-dep-ha-noi',
    link: 'https://thanhnien.vn/am-thuc/quan-cafe-an-sang-ha-noi.html',
    pubDate: new Date(Date.now() - 3600000 * 24).toISOString(),
    author: 'Thu Thảo',
    source: 'Thanh Niên Ẩm thực',
    sourceUrl: 'https://thanhnien.vn/am-thuc.html',
    summary: 'Vừa thưởng thức ly cà phê trứng thơm nức hay ly đen đá đậm đà, vừa nhâm nhi ổ bánh mì nóng hay đĩa bánh cuốn nóng hổi dưới vòm cây xanh mát.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80',
    category: 'quan-xa',
    categoryLabel: 'Quán xá & Trải nghiệm',
    readTimeMinutes: 5,
    tags: ['Cà phê', 'Phố cổ Hà Nội', 'Ăn sáng']
  },
  {
    id: 'giai-ma-trao-luu-lau-kem-pho-mai',
    title: 'Giải mã trào lưu "Lẩu kem phô mai" và đồ ăn kết hợp mặn ngọt đang gây sốt trong giới trẻ Gen Z',
    slug: 'giai-ma-trao-luu-lau-kem-pho-mai-va-do-an-man-ngot',
    link: 'https://tuoitre.vn/du-lich/trao-luu-lau-kem-pho-mai.htm',
    pubDate: new Date(Date.now() - 3600000 * 30).toISOString(),
    author: 'Linh Đan',
    source: 'Tuổi Trẻ Du Lịch',
    sourceUrl: 'https://tuoitre.vn/du-lich.htm',
    summary: 'Sự sáng tạo hay thử thách vị giác? Chuyên gia ẩm thực phân tích lý do vì sao những món ăn có sự kết hợp đối lập về nhiệt độ và hương vị lại kích thích sự tò mò mạnh mẽ.',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1200&q=80',
    category: 'danh-gia',
    categoryLabel: 'Đánh giá & Xu hướng',
    readTimeMinutes: 4,
    tags: ['Food Trend', 'Gen Z', 'Review']
  },
  {
    id: 'thuc-don-eat-clean-7-ngay',
    title: 'Gợi ý thực đơn Eat Clean 7 ngày dễ làm cho người bận rộn: Đủ chất, nhẹ bụng, da dẻ hồng hào',
    slug: 'goi-y-thuc-don-eat-clean-7-ngay-cho-nguoi-ban-ron',
    link: 'https://vietnamnet.vn/doi-song/am-thuc/thuc-don-eat-clean-7-ngay.html',
    pubDate: new Date(Date.now() - 3600000 * 36).toISOString(),
    author: 'HLV Dinh Dưỡng Quốc Bảo',
    source: 'VietnamNet Ẩm thực',
    sourceUrl: 'https://vietnamnet.vn/doi-song/am-thuc',
    summary: 'Tập trung vào các nguyên liệu tươi sống chưa qua tinh chế công nghiệp: ức gà áp chảo, yến mạch ngâm qua đêm, cá hồi sốt bơ tỏi và các loại salad củ quả nhiều màu sắc.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
    category: 'dinh-duong',
    categoryLabel: 'Dinh dưỡng & Mẹo vặt',
    readTimeMinutes: 6,
    tags: ['Eat Clean', 'Healthy Food', 'Thực đơn tuần']
  }
];

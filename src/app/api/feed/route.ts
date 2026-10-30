import { NextRequest, NextResponse } from 'next/server';
import { getAllFeeds } from '@/lib/rss-parser';
import { CategoryId } from '@/types';

// Tận dụng Edge/Server Caching của Vercel (stale-while-revalidate)
export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 phút

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as CategoryId | null;
    const search = searchParams.get('search')?.toLowerCase().trim() || '';
    const source = searchParams.get('source');
    const sort = searchParams.get('sort') || 'newest'; // 'newest' | 'readTime'

    let items = await getAllFeeds();

    // 1. Lọc theo danh mục con
    if (category && category !== 'tat-ca') {
      items = items.filter(item => item.category === category);
    }

    // 2. Lọc theo nguồn tin tức
    if (source && source !== 'all') {
      items = items.filter(item => item.source.toLowerCase().includes(source.toLowerCase()));
    }

    // 3. Tìm kiếm theo từ khóa
    if (search) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(search) ||
        item.summary.toLowerCase().includes(search) ||
        item.tags.some(tag => tag.toLowerCase().includes(search)) ||
        item.author.toLowerCase().includes(search)
      );
    }

    // 4. Sắp xếp
    if (sort === 'readTime') {
      items.sort((a, b) => b.readTimeMinutes - a.readTimeMinutes);
    } else {
      // Mặc định: mới nhất
      items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    }

    return NextResponse.json(
      {
        success: true,
        total: items.length,
        timestamp: new Date().toISOString(),
        items
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
        }
      }
    );
  } catch (error: any) {
    console.error('API /api/feed Error:', error);
    return NextResponse.json(
      { success: false, error: 'Không thể thu thập dữ liệu RSS lúc này.' },
      { status: 500 }
    );
  }
}

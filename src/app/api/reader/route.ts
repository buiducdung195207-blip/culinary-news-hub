import { NextRequest, NextResponse } from 'next/server';
import { extractArticleForReader } from '@/lib/reader-extractor';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Cache 1 giờ cho nội dung đã bóc tách

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') || '';
    const id = searchParams.get('id') || '';

    if (!url && !id) {
      return NextResponse.json(
        { success: false, error: 'Thiếu tham số url hoặc id bài viết.' },
        { status: 400 }
      );
    }

    const readerData = await extractArticleForReader(url, id);

    return NextResponse.json(
      {
        success: true,
        data: readerData
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
          'Vercel-CDN-Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
        }
      }
    );
  } catch (error: any) {
    console.error('API /api/reader Error:', error);
    return NextResponse.json(
      { success: false, error: 'Lỗi khi trích xuất chế độ đọc tinh gọn.' },
      { status: 500 }
    );
  }
}

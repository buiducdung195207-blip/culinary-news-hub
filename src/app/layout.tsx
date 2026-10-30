import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BiteCraft - Tinh Hoa Ẩm Thực & Chế Độ Đọc Tinh Gọn',
  description: 'Cổng thông tin ẩm thực chuyên sâu tổng hợp từ các nguồn báo chí uy tín. Chế độ đọc tinh gọn Reader Mode loại bỏ quảng cáo, phân loại công thức, quán xá, đánh giá và dinh dưỡng.',
  keywords: ['ẩm thực', 'công thức nấu ăn', 'quán ngon', 'reader mode', 'ăn uống', 'tin tức ẩm thực'],
  openGraph: {
    title: 'BiteCraft - Tinh Hoa Ẩm Thực & Chế Độ Đọc Tinh Gọn',
    description: 'Tổng hợp tin tức ẩm thực chuyên sâu với chế độ đọc Reader Mode không quảng cáo.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="font-sans antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

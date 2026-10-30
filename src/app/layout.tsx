import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Foodily - Tạp Chí Ẩm Thực & Chế Độ Đọc Tinh Gọn',
  description: 'Khám phá món ngon mỗi ngày, công thức nấu nướng chuẩn vị, quán xá đặc sắc và chế độ đọc tinh gọn loại bỏ hoàn toàn quảng cáo.',
  keywords: ['Foodily', 'ẩm thực', 'công thức nấu ăn', 'quán ngon', 'reader mode', 'tin tức ẩm thực'],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: 'Foodily - Tạp Chí Ẩm Thực & Chế Độ Đọc Tinh Gọn',
    description: 'Tổng hợp tin tức ẩm thực chuyên sâu với chế độ đọc Reader Mode sạch quảng cáo.',
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
      <body className="font-sans antialiased selection:bg-coral-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

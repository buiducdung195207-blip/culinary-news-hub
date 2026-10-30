# 🍲 BiteCraft - Web Tổng Hợp Tin Tức & Nội Dung Chuyên Sâu Ẩm Thực

> Dự án thực hiện cho **Đề bài 2: Web tổng hợp tin tức & nội dung chuyên sâu theo lĩnh vực Ăn uống (Ẩm thực)**.  
> Ứng dụng tích hợp công nghệ **Chế độ đọc tinh gọn (Reader Mode)**, phân loại chuyên sâu, Edge Caching trên Vercel và CI/CD với GitHub Actions.

---

## 🌟 1. Các Tính Năng Nổi Bật

### 📡 1.1 Thu thập và phân loại tin tức đa nguồn (RSS Parser Server-side)
- Thu thập bài viết từ các nguồn báo chí ẩm thực uy tín: **VnExpress Ẩm thực**, **Thanh Niên**, **Tuổi Trẻ Du Lịch - Ẩm thực**, **VietnamNet** và **Serious Eats**.
- Tự động chuẩn hóa dữ liệu, trích xuất ảnh bìa chất lượng cao, tác giả, thời gian xuất bản và thời gian đọc ước tính.
- **Tự động phân loại (Smart Classifier)** vào 4 danh mục con chuyên sâu:
  1. 🍲 **Công thức & Nấu nướng**: Bí quyết nêm nếm, công thức chuẩn vị cho bữa cơm gia đình và tiệc tùng.
  2. 📍 **Quán xá & Trải nghiệm**: Tọa độ hàng quán vỉa hè, ẩm thực đường phố, tiệm cà phê, nhà hàng đặc sắc.
  3. ⭐ **Đánh giá & Xu hướng**: Review món ngon, trào lưu ẩm thực mới, văn hóa ẩm thực các vùng miền.
  4. 🥗 **Dinh dưỡng & Mẹo vặt**: Ăn uống lành mạnh (Eat Clean), bảo quản thực phẩm, mẹo nhà bếp.

### 📖 1.2 Chế độ đọc tinh gọn (Reader Mode)
- **Loại bỏ 100% quảng cáo**, pop-up, banner che khuất và giao diện rườm rà của trang gốc.
- **Tùy biến trải nghiệm đọc**:
  - Đổi màu nền đọc: **Trắng sáng (Light)**, **Giấy ấm cổ điển (Warm Sepia)**, **Ban đêm dịu mắt (Dark Night)**.
  - Đổi phông chữ: **Sans-serif (Hiện đại)** hoặc **Serif (Báo in cổ điển)**.
  - Tăng / giảm cỡ chữ tùy ý (A- / A+).
  - Thanh tiến trình đọc bài viết (Reading Progress bar).
- **Hỗ trợ bài viết công thức**: Tự động bóc tách hộp **"Nguyên liệu cần chuẩn bị"** và **"Các bước thực hiện"** trực quan.
- **Text-to-Speech (TTS)**: Tích hợp giọng đọc tóm tắt thông minh ngay trên trình duyệt.
- Hỗ trợ xem bài gốc, sao chép liên kết và chia sẻ nhanh.

### 🔍 1.3 Lọc & Tìm kiếm tức thì
- Tìm kiếm từ khóa theo thời gian thực (Search with debounce) theo tiêu đề, mô tả và thẻ tag.
- Lọc theo từng danh mục con hoặc theo từng nguồn báo cụ thể.
- Sắp xếp linh hoạt: Mới nhất hoặc Thời gian đọc dài.

### 🔖 1.4 Lưu trữ bài viết (Bookmarks / Read Later)
- Lưu danh sách bài viết yêu thích vào `localStorage` (không cần đăng nhập hoặc kết nối cơ sở dữ liệu nặng nề).
- Quản lý danh sách tiện lợi với thanh trượt bên (Drawer).

### ⚡ 1.5 Tối ưu hiệu năng & Edge Caching
- Cấu hình header caching `Cache-Control: public, s-maxage=300, stale-while-revalidate=600`.
- Tận dụng mạng phân phối biên (Edge Network) của Vercel giúp tốc độ phản hồi cực nhanh, giảm tải tối đa cho các trang báo gốc.

---

## 🛠️ 2. Công Nghệ Sử Dụng

- **Frontend / Fullstack**: [Next.js 15 (App Router)](https://nextjs.org/), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Server Parser**: `fast-xml-parser` (phân tích cấu trúc XML/RSS/Atom), `cheerio` (trích xuất nội dung bài viết sạch)
- **CI/CD Pipeline**: GitHub Actions (`.github/workflows/ci.yml`)
- **Deployment Platform**: Vercel (`vercel.json`)

---

## 🚀 3. Hướng Dẫn Cài Đặt & Chạy Môi Trường Cục Bộ (Local)

### Yêu cầu:
- Node.js version 18 trở lên (khuyên dùng Node.js 20 hoặc 22 LTS).
- Trình quản lý gói npm.

### Các bước thực hiện:
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Kiểm tra tính hợp lệ của mã nguồn (Linting & TypeScript)
npm run lint
npm run typecheck

# 3. Chạy môi trường phát triển (Dev Server)
npm run dev
```
Mở trình duyệt truy cập: `http://localhost:3000`

### Build phiên bản Production:
```bash
npm run build
npm start
```

---

## 🔄 4. Quy Trình CI/CD & Tự Động Deploy Lên Vercel

### 4.1 Quy trình kiểm tra tính hợp lệ bằng GitHub Actions:
Quy trình được định nghĩa tại file [`.github/workflows/ci.yml`](.github/workflows/ci.yml). Khi có bất kỳ commit nào được push lên nhánh `main` hoặc `master`:
1. Tự động khởi chạy môi trường Ubuntu với Node.js.
2. Kiểm tra type của toàn bộ dự án (`npm run typecheck`).
3. Kiểm tra tiêu chuẩn mã nguồn (`npm run lint`).
4. Tiến hành build thử nghiệm dự án (`npm run build`). Nếu có bất kỳ lỗi cú pháp nào, GitHub Actions sẽ báo đỏ ngăn chặn triển khai lỗi.

### 4.2 Thiết lập tự động deploy qua Vercel:
1. Đẩy mã nguồn lên repository GitHub của bạn:
   ```bash
   git remote add origin <URL_GITHUB_REPOSITORY_CỦA_BẠN>
   git branch -M main
   git push -u origin main
   ```
2. Truy cập [vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub.
3. Chọn **Add New...** -> **Project** -> Chọn repository vừa push.
4. Framework Preset sẽ tự động nhận diện là **Next.js**.
5. Nhấn **Deploy**.
6. Từ nay, mỗi khi bạn push code mới lên nhánh `main`, Vercel sẽ tự động kích hoạt tiến trình build và deploy phiên bản mới nhất chỉ trong vòng 30 - 60 giây.

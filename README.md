# Thiệp mời cưới — Nuxt + MongoDB

Website thiệp mời ảnh cưới (tiếng Việt): gallery, form lời chúc, xác nhận tham dự (RSVP).

## Stack

- Nuxt 3 + Nitro API
- MongoDB (`wishes`, `rsvps`)
- Ảnh đã tối ưu WebP trong `public/images/`

## Chạy local

```bash
# 1. MongoDB đang chạy (local hoặc Atlas URI)
cp .env.example .env

# 2. Cài & chạy
npm install
npm run dev
```

Mở http://localhost:3000

Nếu macOS báo `EMFILE: too many open files` khi `npm run dev`, tăng limit rồi chạy lại:

```bash
ulimit -n 10240
npm run dev
```

Hoặc dùng bản build (không watch file):

```bash
npm run build && node .output/server/index.mjs
```


## Cấu hình nội dung

Sửa placeholder tên / ngày / địa điểm trong `app.config.ts`.

## API

- `GET /api/wishes` — danh sách lời chúc
- `POST /api/guest` — `{ name, guests, status: yes|no|maybe, message }` (một form: RSVP + lời chúc)

Xem dữ liệu trong MongoDB: `guests` (chính), đồng bộ thêm `wishes` / `rsvps`.

## Ảnh

Ảnh gốc nằm ngoài git. Bản tối ưu:

- `public/images/hero` (~1200w)
- `public/images/gallery` (~900w)
- `public/images/thumb` (~400w)

Nén lại (nếu có folder gốc):

```bash
npm run optimize-images
```

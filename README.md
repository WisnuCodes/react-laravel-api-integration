# React Laravel API Integration

Aplikasi frontend React yang terhubung ke backend Laravel REST API. Dibuat menggunakan Vite sebagai build tool dan Material UI untuk komponen antarmuka.

## Tech Stack

| Library | Fungsi |
| :--- | :--- |
| React | Library utama untuk UI |
| React Router DOM | Navigasi halaman (SPA) |
| Material UI (MUI) | Komponen UI siap pakai |
| Emotion | Styling engine untuk MUI |
| Axios | HTTP client untuk request API |
| Vite | Build tool & dev server |
| ESLint | Linting & code quality |

## Cara Menjalankan

```bash
# install dependencies
npm install

# jalankan dev server
npm run dev
```

Pastikan backend Laravel sudah berjalan di `http://localhost:8000` sebelum mengakses aplikasi.

## Fitur

- **Login & Register** — autentikasi menggunakan token dari Laravel Sanctum
- **Halaman Users** — menampilkan daftar user dengan pagination
- **Detail User** — info lengkap user (role, saldo, tanggal daftar)
- **Katalog Produk** — list produk dari API, tampil dalam card grid
- **Protected Route** — halaman tertentu hanya bisa diakses setelah login
- **Auto-login** — setelah register, langsung masuk tanpa perlu login ulang

## Struktur Folder

```
src/
├── api/
│   └── client.ts          # axios instance + interceptor token
├── components/
│   └── Navbar.tsx         # navigasi utama
├── context/
│   └── AuthContext.tsx    # global state untuk auth
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Users.tsx
│   ├── UserDetail.tsx
│   └── Products.tsx
└── App.tsx                # routing & layout
```

## API Endpoints

Endpoint yang dipakai dari backend Laravel:

| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| POST | `/api/login` | Login, dapat token |
| POST | `/api/register` | Register user baru |
| POST | `/api/logout` | Logout (perlu token) |
| GET | `/api/users` | Ambil semua user (perlu token) |
| GET | `/api/users/{id}` | Detail user (perlu token) |
| GET | `/api/products` | Ambil semua produk |

## Catatan

- Semua request API yang butuh autentikasi sudah otomatis menyertakan token lewat Axios interceptor di `api/client.ts`
- Styling menggunakan pendekatan component-based lewat Material UI, bukan CSS global
- State autentikasi dikelola secara global pakai React Context (`AuthContext`)

## Repository

[https://github.com/WisnuCodes/react-laravel-api-integration](https://github.com/WisnuCodes/react-laravel-api-integration)

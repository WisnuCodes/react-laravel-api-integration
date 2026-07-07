# Dokumentasi Project

## Daftar Library

| Library | Versi | Kegunaan |
| :--- | :---: | :--- |
| React | ^19.x | Library utama untuk bikin UI |
| React Router DOM | ^7.x | Routing antar halaman |
| Material UI | ^6.x | Komponen UI (Button, Card, Table, dll) |
| Emotion | ^11.x | Styling engine buat MUI |
| Axios | ^1.x | HTTP client buat panggil API |
| Vite | ^8.x | Dev server & build tool |
| ESLint | latest | Linting kode |

## Fitur Tambahan

Selain fitur wajib (login, register, list user, detail user, list produk), ada beberapa tambahan:

1. **Reusable API Client** — semua panggilan API lewat satu file `api/client.ts` yang otomatis pasang token di header. Jadi ga perlu nulis logic fetch berulang-ulang di setiap halaman.

2. **Auth Context (Global State)** — pakai React Context API buat simpan data user & token secara global. Komponen manapun bisa akses info login tanpa prop drilling.

3. **Protected Route** — halaman `/users` dan `/users/:id` dibungkus komponen khusus yang cek status login. Kalau belum login, otomatis redirect ke `/login`.

4. **Auto-login setelah Register** — begitu register berhasil, user langsung masuk tanpa harus balik ke halaman login lagi.

5. **Component-Based Styling (MUI)** — semua styling pakai komponen Material UI, bukan CSS biasa. Jadi konsisten dan responsive tanpa perlu atur breakpoint manual.

## Link Repository

- GitHub: [https://github.com/WisnuCodes/react-laravel-api-integration](https://github.com/WisnuCodes/react-laravel-api-integration)

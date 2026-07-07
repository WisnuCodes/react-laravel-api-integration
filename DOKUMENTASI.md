<div align="center">
  <h1>🚀 React API Integration Project</h1>
  <p>
    <i>Aplikasi Single Page Application (SPA) modern yang dibangun menggunakan React dan Vite. Terintegrasi dengan Laravel REST API.</i>
  </p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)](https://mui.com/)
</div>

<br />

## 📖 Daftar Isi
- [Tentang Proyek](#-tentang-proyek)
- [Daftar Library & Teknologi](#-daftar-library--teknologi)
- [Fitur Utama](#-fitur-utama)
- [🌟 Fitur Tambahan (Extra Features)](#-fitur-tambahan-extra-features)
- [🔗 Repositori & Commit](#-repositori--commit)

---

## 🎯 Tentang Proyek
Proyek ini merupakan implementasi *frontend* berbasis **React** yang bertugas untuk mengkonsumsi layanan RESTful API dari *backend* Laravel. Aplikasi ini menyediakan antarmuka pengguna yang mulus untuk otentikasi, manajemen data pengguna, hingga katalog produk secara responsif.

---

## 🛠 Daftar Library & Teknologi

Aplikasi ini mengandalkan _stack_ teknologi modern yang memastikan performa, skalabilitas, serta kerapian penulisan kode:

| Library / Tool | Versi | Deskripsi Penggunaan |
| :--- | :---: | :--- |
| **React** | `^19.x` | Inti dari ekosistem *frontend* untuk pembuatan UI. |
| **React Router DOM** | `^7.x` | Menangani navigasi antar-halaman (*routing*) layaknya aplikasi SPA sesungguhnya. |
| **Material UI (MUI)** | `^6.x` | Digunakan untuk arsitektur *Component-Based UI*. MUI memberikan tata letak dan estetika kelas enterprise tanpa perlu pusing mengatur CSS kustom. |
| **Emotion** | `^11.x` | Bertindak sebagai *Styling Engine* (CSS-in-JS) untuk komponen-komponen Material UI. |
| **Vite** | `^6.x` | Berperan sebagai *build tool* generasi terbaru yang menawarkan *Hot Module Replacement* (HMR) sangat cepat. |

---

## 🚀 Fitur Utama
Sesuai dengan _requirements_ utama, proyek ini telah mengimplementasikan:
- [x] **Autentikasi Aman:** Fungsionalitas Login dan Registrasi pengguna yang terhubung langsung ke _backend_.
- [x] **Daftar User:** Menampilkan seluruh entitas *user* yang terdaftar menggunakan desain tabel/grid yang rapi.
- [x] **Detail User:** Menampilkan rincian informasi spesifik dari salah satu *user* (berdasarkan ID).
- [x] **Product Listing API:** Mengambil dan merender *Katalog Produk* beserta kategori, gambar *placeholder*, harga, hingga rating.

---

## 🌟 Fitur Tambahan (Extra Features)
Proyek ini dirancang **melebihi ekspektasi standar** dengan mengusung beberapa pendekatan *best-practices* industri, antara lain:

1. 🎨 **Full Component-Based Architecture (MUI Implementation)**
   Seluruh UI dibangun menggunakan *reusable components* (seperti `Card`, `Box`, `Typography`, dan `Grid`) milik **Material UI**. Ini memastikan desain yang konsisten, jarak (*spacing*) yang proporsional, dan adaptif di layar ponsel maupun desktop, menghindari ketergantungan pada HTML statis atau *inline-styling* konvensional.

2. 🔐 **Global Auth Context & Protected Routing**
   Proyek ini menggunakan React Context API (`AuthContext`) sebagai *Global State* untuk autentikasi. Halaman-halaman rahasia (seperti `/users` dan `/products`) dilindungi oleh lapisan `<ProtectedRoute>`, sehingga tamu (*guest*) yang mencoba mengakses URL tersebut akan secara otomatis **dihalau dan diarahkan kembali ke halaman Login**.

3. ⚡ **Smart Reusable API Client**
   Pemanggilan API ke *backend* tidak dilakukan secara berulang. Terdapat file isolasi utilitas `api/client.ts` yang menangani semua eksekusi *request* (mengotomatisasi injeksi Header `Authorization: Bearer <token>` dan manipulasi *error* global).

4. 🤖 **Auto-Login Pasca Registrasi (QoL Improvement)**
   Meningkatkan *User Experience* (UX): Apabila *user* berhasil melakukan registrasi, sistem akan secara instan menyimpan *session token* dan membawa *user* meluncur langsung ke halaman Dashboard, tanpa perlu memaksa mereka mengetik ulang kredensial untuk login.

---

## 🔗 Repositori & Commit

Seluruh *source code* tersimpan dan dikelola secara aman menggunakan Git dan GitHub.

🌍 **Link Repository GitHub:** 
> [**https://github.com/WisnuCodes/react-laravel-api-integration**](https://github.com/WisnuCodes/react-laravel-api-integration)
*(Catatan: Silakan sesuaikan/perbarui link di atas jika repositori Anda berada di URL yang berbeda)*

<br />

<div align="center">
  <sub>Dibangun dengan 💙 menggunakan React & Vite.</sub>
</div>

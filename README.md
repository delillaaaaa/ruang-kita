# Ruang Kita 💫

**Ruang digital pribadi untuk mendokumentasikan tempat yang sudah dikunjungi, ulasan kuliner & aktivitas, serta daftar impian (*bucket list*) bersama antara Januar & Adel.**

Aplikasi ini dibangun menggunakan arsitektur **Mobile-First** yang responsif, cepat diakses dari ponsel saat bepergian, dan mudah dikelola tanpa ribet.

---

## 🌟 Fitur Utama (Berdasarkan PRD)

### 1. 🏡 Halaman Utama (*Landing Page*)
- **Hero Section:** Salam hangat, tagline personal, dan navigasi cepat.
- **Counter Statistik Mini:**
  - Total tempat dikunjungi.
  - Progres impian *Bucket List* (Tercapai vs Total).
  - Rata-rata skor versi **Januar** vs **Adel**.
- **Cuplikan Kenangan Terbaru:** Menampilkan kenangan terakhir lengkap dengan cover foto, kategori, dan pratinjau *Dual Rating*.
- **Cuplikan Bucket List Aktif:** Kartu rencana impian terdekat dengan tombol cepat tandai selesai.

### 2. 📱 Sistem Navigasi & Menu (Mobile-First)
- **Desktop Top Navbar:** Menu utama, logo Ruang Kita, tombol pintasan *Tulis Jurnal*, *Bucket List*, dan tombol cepat *Terserah*.
- **Mobile Bottom Navigation Bar:** Navigasi ramah satu jempol (*thumb-friendly*) di bawah layar HP.
- **Floating Action Button (`+` FAB):** Tombol aksi cepat untuk menambah Jurnal Baru, menambah Bucket List, atau membuka tombol "Terserah".
- **Persona Switcher:** Beralih dengan mudah antara sudut pandang **Januar** (Aksen Biru) dan **Adel** (Aksen Pink).

### 3. ⭐ Dual Rating System (Skor Versi Berdua)
- **Januar:** Skor rating (1.0 – 5.0) dengan visual bintang biru dan satu kalimat *verdict* khas Januar.
- **Adel:** Skor rating (1.0 – 5.0) dengan visual bintang pink dan satu kalimat *verdict* khas Adel.
- Tampil harmonis di setiap kartu kenangan dan halaman detail jurnal.

### 4. 📝 Jurnal & Ulasan Kenangan (`/jurnal`)
- **Pencarian Cepat:** Cari berdasarkan nama tempat, judul, kota, atau cerita momen.
- **Filter Kategori:** Kuliner, Trip, Aktivitas, dan Lainnya.
- **Pengurutan Fleksibel:** Berdasarkan tanggal terbaru, terlama, rating tertinggi Januar, atau rating tertinggi Adel.
- **Tampilan Grid & List:** Pilihan layout tampilan katalog kenangan.

### 5. 📸 Halaman Detail Jurnal (`/jurnal/:id`)
- **Galeri Foto:** Pratinjau 1–3 foto dengan thumbnail interaktif dan navigasi gambar.
- **Cerita Momen:** Catatan cerita lengkap dan kenangan di balik perjalanan.
- **Komponen Dual Rating:** Visual komparasi penilaian objektif berdua.
- **Aksi Cepat:** Tombol Edit, Hapus, dan Bagikan (Salin tautan instan).

### 6. 🎯 Bucket List Impian (`/bucket-list`)
- **Tab Filter:** Pisahkan antara *Belum Tercapai (Wishlist)* dan *Sudah Terwujud (Done)*.
- **Animasi Centang & Konfeti:** Efek perayaan konfeti saat rencana berhasil dicapai!
- **Konversi Otomatis:** Ubah rencana impian menjadi entri Jurnal lengkap secara langsung sekali klik.

### 7. 🎲 Fitur Spesial: Tombol "Terserah" (*Randomizer*)
- Solusi saat kalian bingung mau makan atau kencan ke mana!
- Mengacak salah satu rencana dari daftar *Bucket List* dengan animasi shuffle dan konfeti.
- Dapat difilter khusus kategori Kuliner, Trip, maupun Aktivitas.

### 8. 🛡️ Dashboard & Kontrol Pribadi (`/dashboard`, `/login`)
- **Passcode Gate:** Keamanan privasi berdua (Default PIN: `1234`).
- **Tabel Kelola Data:** Manajemen cepat untuk melihat, mengedit, dan menghapus seluruh entri Jurnal dan Bucket List.
- **Backup & Restore (Ekspor / Impor JSON):** Unduh cadangan data ke file JSON agar dapat dipindahkan ke HP baru tanpa server backend yang rumit.
- **Reset Data Demo:** Kemudahan untuk memulihkan data contoh awal kapan pun dibutuhkan.

---

## 🛠️ Teknologi yang Digunakan
- **Frontend Framework:** React 18 (TypeScript)
- **Styling:** Tailwind CSS (dengan palet warna *cream, terracotta, rosewood, sage*)
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Efek Visual:** Canvas Confetti & Glassmorphism
- **Penyimpanan:** Local Storage browser dengan dukungan Ekspor & Impor JSON
- **Build Tool:** Vite 6

---

## 🚀 Cara Menjalankan Aplikasi

1. Pastikan Node.js sudah terpasang.
2. Buka terminal di folder proyek:
   ```bash
   pnpm install
   # atau
   npm install
   ```
3. Jalankan server pengembangan lokal:
   ```bash
   pnpm dev
   # atau
   npm run dev
   ```
4. Buka tautan lokal yang muncul (biasanya `http://localhost:5173`) di browser atau buka dari browser HP kalian melalui IP WiFi lokal.
5. Untuk membangun versi produksi:
   ```bash
   pnpm build
   # atau
   npm run build
   ```

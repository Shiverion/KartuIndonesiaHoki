# 🏛️ Kartu Indonesia Hoki (KIH)

**KEMENTERIAN KEBERUNTUNGAN REPUBLIK INDONESIA**

> *"Keadilan sosial bagi seluruh rakyat Indonesia (yang beruntung)"*

---

## ⚠️ Disclaimer Satir

Ini adalah **proyek satir**. Tidak ada hubungannya dengan program pemerintah resmi. 
Aplikasi ini dibuat sebagai kritik sosial terhadap:
- ❌ Distribusi bantuan yang arbitrary
- 🐌 Infrastruktur digital yang "senin-kamis"
- 🔓 Keamanan data yang setipis tisu
- 🤝 Budaya "Orang Dalam" dan Nepotisme

---

## 📜 Latar Belakang

Di sebuah negeri yang makmur nan sejahtera, pemerintah memutuskan bahwa seleksi bantuan sosial menggunakan data empiris terlalu *mainstream*. Maka lahirlah **Kartu Indonesia Hoki (KIH)** — program bantuan pertama di dunia yang berbasis **keberuntungan** dan **koneksi**.

### Filosofi Sistem
> *"Jika semua orang tidak bisa dapat bantuan, maka lebih adil jika yang dapat adalah yang paling beruntung (atau yang punya paman pejabat)."*
> — Menteri Keberuntungan (fiktif), 2025

Sistem ini menggunakan teknologi **RNG (Random Number Generator)** yang dipercaya lebih transparan daripada birokrasi manual, karena ketidakjelasannya 100% konsisten.

---

## 🌐 Live Demo
**[https://kartu-indonesia-hoki.vercel.app](https://kartu-indonesia-hoki.vercel.app)**

*Status: 🟡 Online (Serverless, data reset tiap 1 jam agar jejak hilang)*

---

## 🎲 Cara Kerja

1. **Pendaftaran**: Rakyat mengisi formulir dengan data "penting" (Nama Tetangga yang Dibenci, Warna Rumah).
2. **Seleksi Jalur Langit**: Sistem mengecek **Jabatan / Status Sosial** anda.
3. **RNG (Random Number Generator)**: Jika anda rakyat jelata, nasib anda ditentukan dadu.
4. **Verifikasi**: Jika (ajaibnya) lolos, wajib membawa **Fotokopi KTP 5 Rangkap** (legalisir kelurahan) untuk klaim.

---

## 👑 Fitur Unggulan (2025 Update)

### 1. Hierarki "Orang Dalam"
Sistem kami mengenali siapa anda. Peluang lolos disesuaikan secara otomatis:

| Jabatan / Status | Peluang Lolos | Keterangan |
|------------------|---------------|------------|
| **Anak Presiden** | **100%** | Auto Win (Data langsung divalidasi) |
| **Keponakan Pejabat** | 90% | Jalur VIP |
| **Timses Paslon** | 70% | Jalur Relawan |
| **Buzzer Rp** | 60% | Jalur Influencer |
| **Rakyat Jelata** | 0.01% | Semoga beruntung |
| **Pengkritik Pemerintah** | 0% | Blacklisted Sistem |

### 2. Slider Uang Pelicin 💸
Ingin memperlancar urusan? Geser slider untuk memberikan "uang kopi" (Sukarela tapi Wajib).
*(Catatan: Fitur ini hanya mencatat gratifikasi di log server, tidak menambah peluang lolos. Uang hilang, hoki belum tentu datang.)*

### 3. Terms of Surrender 📝
Untuk mendaftar, anda wajib menyetujui klausul transparansi radikal:
> *"Saya rela kalo data saya bocor, disebar di Dark Web, dijual ke marketer, digunakan untuk pinjaman online, dan dikirim ke grup WhatsApp keluarga."*

### 4. Mode Fufufafa 🤴
Ketik **"fufufafa"** di keyboard untuk mengaktifkan *Legacy Mode* dan temukan jejak digital yang tidak bisa hilang.

---

## 🛠️ Informasi Teknis (Untuk Developer)

### SawitDB - Database Pertanian
Menggunakan *filesystem-based database* canggih yang menyimpan data dalam format `.sawit`.
- **Enkripsi**: Tidak ada (Plaintext)
- **Backup**: "Insyaallah aman"

### Routes
| Method | Route | Fungsi |
|--------|-------|--------|
| GET | `/admin` | **Panel Data Bocor** (Tanpa password) |
| GET | `/status` | Cek nasib anda |
| POST | `/api/daftar` | Submit form (dengan artificial delay 5 detik) |

---

## 👥 Kontributor
- Rakyat yang lelah mengurus berkas
- Developer yang trauma dengan fotokopi KTP

**Powered by SawitDB** 🌾 - Infrastruktur Kedaulatan Data

```
     ___  __  __
    / __||  \/  |
    \__ \| |\/| |
    |___/|_|  |_|  awitDB
    
    "Dari sawit, untuk rakyat"
```

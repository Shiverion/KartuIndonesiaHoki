# 🏛️ Kartu Indonesia Hoki (KIH)

**KEMENTERIAN KEBERUNTUNGAN REPUBLIK INDONESIA**

> "Keadilan sosial bagi seluruh rakyat Indonesia (yang beruntung)"

---

## ⚠️ Disclaimer

Ini adalah **proyek satir**. Tidak ada hubungannya dengan program pemerintah resmi. Semua kesamaan dengan sistem nyata adalah kebetulan (atau mungkin tidak).

Proyek ini dibuat untuk kritik sosial mengenai:
- ❌ Distribusi bantuan sosial yang arbitrary
- 🐌 Infrastruktur digital pemerintah yang lambat
- 📋 Persyaratan verifikasi yang absurd
- 🔓 Kebocoran data pribadi penduduk

---

## 🌐 Live Demo
**[https://kartu-indonesia-hoki.vercel.app](https://kartu-indonesia-hoki.vercel.app)**

*Status: � Online (Vercel serverless)*

---

## 🎲 Cara Kerja

1. Pengguna mengisi form dengan pertanyaan absurd (jumlah genteng, tetangga yang dibenci, dll)
2. Sistem menggunakan RNG (Gacha) untuk menentukan kelayakan
3. Peluang lolos: **0.01%** (1 dari 10,000)
4. Data disimpan di SawitDB (tidak aman, tanpa enkripsi)
5. Data bisa diintip siapa saja di `/admin`

### Statistik Keberuntungan

| Status | Peluang | Keterangan |
|--------|---------|------------|
| ✅ LOLOS | 0.01% | Dana cair dalam 100 tahun |
| ⏰ ANTRIAN | ~10% | Estimasi proses: 47 tahun 3 bulan |
| ❌ DITOLAK | ~90% | Kurang beruntung, coba lagi tahun depan |

---

## 🛠️ Teknologi

### SawitDB - Database Pertanian

Database dengan sintaks pertanian yang unik:

```sql
LAHAN pendaftar           -- CREATE TABLE
TANAM KE pendaftar BIBIT (...) -- INSERT
PANEN DARI pendaftar      -- SELECT
GUSUR DARI pendaftar      -- DELETE
PUPUK pendaftar           -- Korupsi data random (Easter egg)
```

### JokoUI - Framework UI "Resmi"

- Warna: Merah (#DC2626), Putih, Abu-abu
- Style: Boxy, rigid, tanpa rounded corners
- Font: Arial (karena Inter terlalu modern)
- Shadow: Harsh 4px offset (no blur)

---

## 🚀 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/kartu-indonesia-hoki.git
cd kartu-indonesia-hoki

# Install dependencies
npm install

# Start server
npm start
```

Buka browser: `http://localhost:3000`

---

## 📁 File Structure

```
kartu-indonesia-hoki/
├── server.js              # Express server dengan delay satiris
├── database.sawit         # SawitDB data file (auto-generated)
├── lib/
│   └── sawitdb.js        # SawitDB engine
├── public/
│   ├── style.css         # JokoUI styles
│   └── script.js         # Frontend dengan loading messages
└── views/
    ├── index.html        # Form pendaftaran
    ├── status.html       # Cek status
    └── admin.html        # Data leak page
```

---

## 📌 Routes

| Method | Route | Deskripsi |
|--------|-------|-----------|
| GET | `/` | Form pendaftaran |
| GET | `/status` | Cek status pendaftaran |
| GET | `/admin` | Data bocor 🔓 |
| POST | `/api/daftar` | Submit pendaftaran |
| GET | `/api/status/:id` | Get status by nomor |
| GET | `/api/admin/intip` | API data leak |
| GET | `/api/stats` | Statistik pendaftar |

---

## 🎭 Easter Eggs

1. **Konami Code**: Ketik ↑↑↓↓←→←→BA di keyboard
2. **NIK Ajaib**: Submit dengan NIK `1234567890123456` (always approved)
3. **Logo Click**: Klik logo 10 kali untuk rahasia
4. **Console Logs**: Buka DevTools untuk pesan satiris
5. **PUPUK API**: POST ke `/api/admin/pupuk` untuk korupsi data random

---

## 📸 Features

### Form Pendaftaran
- Pertanyaan absurd (genteng, tetangga dibenci, warna rumah)
- Fake CAPTCHA (tidak divalidasi)
- Loading dengan pesan satiris (3-7 detik delay)

### Result Page
- Animasi loading dengan progress bar stuck di 99%
- Rotating satirical messages
- Status dengan styling berbeda (merah/kuning/hijau)

### Admin Page
- Tanpa autentikasi (by design)
- Expose semua PII
- Statistik pendaftar

---

## ⚠️ Content Warning

Proyek ini mengandung:
- Satir politik dan sosial
- Parodi birokrasi pemerintah
- Simulasi kebocoran data
- Humor absurd

**Gunakan dengan bijak untuk kritik konstruktif.**

---

## 📜 License

MIT - Gunakan dengan bebas untuk kritik sosial

---

## 👥 Contributors

- Rakyat Indonesia yang lelah mengurus berkas
- Developer yang frustasi dengan sistem digital pemerintah

---

**Powered by SawitDB** 🌾 - Infrastruktur Kedaulatan Data

```
     ___  __  __
    / __||  \/  |
    \__ \| |\/| |
    |___/|_|  |_|  awitDB
    
    "Dari sawit, untuk rakyat"
```

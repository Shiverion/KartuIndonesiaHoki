# Kartu Indonesia Hoki (KIH) - Project Plan

## 📋 Project Metadata

```yaml
name: "Kartu Indonesia Hoki (KIH)"
tagline: "Bantuan Sosial Berbasis Keberuntungan"
type: "Satirical Web Application"
description: |
  A parody of government social welfare apps where eligibility 
  is determined by RNG (Gacha System) instead of actual need.
  Features absurd questions, artificial delays, and "data leaks."
  
tone: "Overly bureaucratic, rigid, 'official' but visibly broken"
target_satire:
  - "Arbitrary benefit distribution"
  - "Inefficient government digital services"
  - "Absurd verification requirements"
  - "Data privacy negligence"
```

---

## 🛠 Tech Stack

| Component | Technology | Satirical Purpose |
|-----------|------------|-------------------|
| **Runtime** | Node.js | Standard (non-satirical base) |
| **Backend** | Express.js | REST API with artificial delays |
| **Database** | **SawitDB** | Agricultural-syntax parody DB |
| **Frontend** | HTML5 + TailwindCSS (CDN) | Fast loading (ironic contrast) |
| **UI Framework** | **JokoUI** (Simulated) | Red, boxy, "official" aesthetic |
| **Validation** | None (Intentionally broken) | Accepts invalid data |

### SawitDB Overview
A satirical JSON wrapper with agricultural command syntax:
- `LAHAN [table]` → CREATE TABLE
- `TANAM KE [table] BIBIT (...)` → INSERT
- `PANEN DARI [table]` → SELECT
- `GUSUR DARI [table]` → DELETE
- `PUPUK [table]` → Randomly corrupt data (Easter egg)

### JokoUI Design Principles
- **Colors**: Red #DC2626, White, Gray-100
- **Typography**: Bold headers, rigid spacing, Arial/sans-serif
- **Components**: Thick borders (3px), harsh shadows, boxy
- **Buttons**: Rectangular, no rounded corners, UPPERCASE text

---

## 📁 File Structure

```
karta-indonesia-hoki/
├── package.json
├── server.js                 # Main Express server
├── database.sawit            # SawitDB data file (auto-generated)
├── .gitignore
├── README.md                 # Satirical documentation
│
├── lib/
│   └── sawitdb.js           # SawitDB engine implementation
│
├── public/
│   ├── style.css            # JokoUI custom overrides
│   └── script.js            # Frontend logic with delays
│
└── views/
    ├── index.html           # Registration form
    ├── status.html          # Result display page
    └── admin.html           # "Data leak" simulation page
```

---

## 🚀 Execution Plan

### Phase 1: Project Initialization

```bash
# Initialize Node project
npm init -y

# Install dependencies
npm install express body-parser cors

# Create directory structure
mkdir -p lib public views

# Create placeholder files
touch server.js lib/sawitdb.js public/style.css public/script.js
touch views/index.html views/status.html views/admin.html
```

**Update `package.json`:**
```json
{
  "name": "kartu-indonesia-hoki",
  "version": "1.0.0-beta.2009",
  "description": "Sistem Bantuan Sosial Berbasis Keberuntungan",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "keywords": ["satire", "parody", "government", "gacha"],
  "author": "Kementerian Keberuntungan RI"
}
```

---

### Phase 2: Build SawitDB Engine

**File:** `lib/sawitdb.js`

**Requirements:**
1. Read/write JSON file (`database.sawit`)
2. Parse agricultural syntax using regex
3. Implement 4 core commands + 1 easter egg
4. Add satirical console logs

**Command Specifications:**

```javascript
// LAHAN [table] - Create table
"LAHAN pendaftar" 
// → Creates { pendaftar: [] } in JSON

// TANAM KE [table] BIBIT (key1: val1, key2: val2, ...)
"TANAM KE pendaftar BIBIT (nik: '1234', nama: 'Joko', status: 'DITOLAK')"
// → Pushes object to array

// PANEN DARI [table] - Select all
"PANEN DARI pendaftar"
// → Returns array

// PANEN DARI [table] DIMANA [key]=[value] - Select filtered
"PANEN DARI pendaftar DIMANA status=LOLOS"
// → Returns filtered array

// GUSUR DARI [table] - Delete all
"GUSUR DARI pendaftar"
// → Clears array

// PUPUK [table] - Randomly corrupt data (Easter egg)
"PUPUK pendaftar"
// → Randomly changes values in 10% of records
```

**Implementation Notes:**
- Add 500ms delay on every query (simulate slow I/O)
- Console logs: `"🌾 Menghubungi server sawit..."`, `"🚜 Memproses transaksi..."`, `"⚠️ Error: Dana habis, retrying..."`
- Store data with timestamp: `created_at`, `updated_at`

---

### Phase 3: Backend Development

**File:** `server.js`

#### Server Setup
```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const SawitDB = require('./lib/sawitdb');

const app = express();
const db = new SawitDB('./database.sawit');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize database
db.run("LAHAN pendaftar");
db.run("LAHAN admin_logs");
```

#### Route 1: Registration (`POST /api/daftar`)

**Input Validation (intentionally weak):**
```javascript
{
  "nik": "16 digits (tidak divalidasi beneran)",
  "nama": "string (any length)",
  "jumlah_genteng": "number (absurd)",
  "nama_tetangga_dibenci": "string (absurd)",
  "warna_rumah": "string (absurd)",
  "alasan_butuh_bantuan": "string (maximum 500 chars)"
}
```

**Logic:**
1. Generate random number `1-10000`
2. Determine eligibility:
   - `chance > 9999`: Status `LOLOS_VERIFIKASI` (0.01% chance)
   - `chance > 9000`: Status `DALAM_ANTRIAN` (9%)
   - Otherwise: Status `DITOLAK_KURANG_BERUNTUNG` (90.99%)
3. Add artificial delay: `3000-7000ms` (random)
4. Store in SawitDB with timestamp
5. Return response with `nomor_pendaftaran`

**Satirical Response Messages:**
```javascript
const messages = {
  LOLOS_VERIFIKASI: "Selamat! Anda terpilih. Dana akan cair dalam 100 tahun.",
  DALAM_ANTRIAN: "Mohon tunggu. Estimasi proses: 47 tahun 3 bulan.",
  DITOLAK_KURANG_BERUNTUNG: "Maaf, Anda kurang beruntung. Coba lagi tahun depan."
};
```

#### Route 2: Check Status (`GET /api/status/:nomor_pendaftaran`)

**Logic:**
1. Query SawitDB: `PANEN DARI pendaftar DIMANA nomor_pendaftaran=[id]`
2. If found, return status with delay (1000-3000ms)
3. If not found: `{ error: "Data tidak ditemukan. Mungkin sudah dihapus sistem." }`

#### Route 3: Admin "Data Leak" (`GET /api/admin/intip`)

**Logic:**
1. Query: `PANEN DARI pendaftar`
2. Return ALL user data (no authentication)
3. Console log: `"⚠️ PERINGATAN: Data diakses tanpa otorisasi"`
4. Add header: `X-Data-Source: "Bocoran Internal"`

**Satirical Element:**
- No authentication required
- Exposes all PII (NIK, names, absurd answers)
- Simulates real government data breach incidents

---

### Phase 4: Frontend with JokoUI Aesthetic

#### Component Design System

**Color Palette:**
```css
:root {
  --merah-joko: #DC2626;        /* Primary Red */
  --putih-bersih: #FFFFFF;       /* White */
  --abu-netral: #F3F4F6;         /* Gray-100 */
  --hitam-tegas: #1F2937;        /* Gray-800 */
  --kuning-peringatan: #FBBF24;  /* Warning */
}
```

**Typography:**
```css
/* Headers */
.joko-header {
  font-family: Arial, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Body */
.joko-body {
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
}
```

**Button Styles:**
```css
.joko-button {
  background: var(--merah-joko);
  color: var(--putih-bersih);
  border: 3px solid #991B1B;
  border-radius: 0px;           /* No rounding! */
  padding: 12px 24px;
  font-weight: 700;
  text-transform: UPPERCASE;
  box-shadow: 4px 4px 0px #991B1B;
  transition: none;             /* No smooth transitions */
}

.joko-button:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #991B1B;
}
```

#### Page 1: Registration Form (`views/index.html`)

**Header Section:**
```html
<header class="bg-red-700 text-white py-6 border-b-4 border-red-900">
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold uppercase tracking-wider">
      🏛️ KARTU INDONESIA HOKI
    </h1>
    <p class="text-sm mt-2 opacity-90">
      KEMENTERIAN KEBERUNTUNGAN REPUBLIK INDONESIA
    </p>
  </div>
</header>
```

**Form Fields (with absurd questions):**

1. **NIK** (16 digits)
   - Placeholder: `"3201234567890123"`
   - Validation: None (accepts anything)
   - Error message: `"NIK Anda kurang hoki, coba lagi"`

2. **Nama Lengkap**
   - Placeholder: `"Nama sesuai KTP (tanpa gelar kebangsawanan)"`

3. **Absurd Question 1:** *"Berapa jumlah genteng rumah Anda?"*
   - Type: number
   - Helper text: `"Data ini penting untuk verifikasi keberuntungan"`

4. **Absurd Question 2:** *"Siapa nama tetangga yang paling Anda benci?"*
   - Type: text
   - Helper text: `"Wajib diisi untuk cross-checking data kependudukan"`

5. **Absurd Question 3:** *"Warna cat rumah Anda?"*
   - Type: select dropdown
   - Options: Merah, Hijau, Biru, Kuning, Ungu, Putih, Hitam, Belang-belang

6. **Alasan Butuh Bantuan**
   - Type: textarea
   - Max length: 500 chars
   - Placeholder: `"Jelaskan dengan detail mengapa Anda layak beruntung"`

**Submit Button:**
```html
<button type="submit" class="joko-button w-full">
  🎲 COBA KEBERUNTUNGAN ANDA
</button>
```

**Footer:**
```html
<footer class="mt-8 text-center text-xs text-gray-500 border-t-2 pt-4">
  Ditenagai oleh <strong>SawitDB</strong> - Infrastruktur Kedaulatan Data<br>
  ⚠️ Data Anda tidak aman dan mungkin bocor sewaktu-waktu
</footer>
```

#### Page 2: Status Result (`views/status.html`)

**Loading State (3-7 seconds):**
```html
<div class="loading-state">
  <div class="spinner"></div>
  <p class="text-lg mt-4 animate-pulse">
    🛰️ Menghubungi Satelit Palapa...
  </p>
  <p class="text-sm text-gray-600 mt-2">
    ⏳ Memproses berkas ke server Jakarta (2009)...
  </p>
</div>
```

**Result: REJECTED (90.99% probability)**
```html
<div class="result-card bg-red-50 border-4 border-red-700">
  <div class="text-center">
    <div class="text-8xl mb-4">❌</div>
    <h2 class="text-2xl font-bold text-red-700 uppercase">
      DITOLAK
    </h2>
    <p class="mt-4 text-gray-700">
      Maaf, Anda kurang beruntung kali ini.<br>
      Coba lagi tahun depan atau daftar ulang.
    </p>
    <div class="mt-6 p-4 bg-yellow-50 border-2 border-yellow-400">
      <p class="text-sm text-yellow-800">
        💡 <strong>Tips:</strong> Tingkatkan keberuntungan dengan 
        mengunjungi dukun terdekat atau beli jimat KIH di Tokopedia.
      </p>
    </div>
  </div>
</div>
```

**Result: IN QUEUE (9% probability)**
```html
<div class="result-card bg-yellow-50 border-4 border-yellow-600">
  <div class="text-center">
    <div class="text-8xl mb-4">⏰</div>
    <h2 class="text-2xl font-bold text-yellow-700 uppercase">
      DALAM ANTRIAN
    </h2>
    <p class="mt-4 text-gray-700">
      Selamat! Anda masuk daftar tunggu.<br>
      Estimasi proses: <strong>47 tahun 3 bulan</strong>
    </p>
    <p class="text-xs text-gray-500 mt-2">
      Nomor antrian: <code>QWE-2025-784512</code>
    </p>
  </div>
</div>
```

**Result: APPROVED (0.01% probability)**
```html
<div class="result-card bg-green-50 border-4 border-green-700">
  <div class="text-center">
    <div class="text-8xl mb-4">✅</div>
    <h2 class="text-2xl font-bold text-green-700 uppercase">
      LOLOS VERIFIKASI
    </h2>
    <p class="mt-4 text-gray-700">
      Selamat! Anda terpilih dalam program KIH.<br>
      Dana akan cair dalam: <strong>100 tahun</strong>
    </p>
    <div class="mt-6 p-4 bg-blue-50 border-2 border-blue-400">
      <p class="text-sm text-blue-800">
        📋 <strong>Langkah selanjutnya:</strong><br>
        1. Tunggu surat fisik via pos (estimasi 5 tahun)<br>
        2. Urus 47 dokumen persyaratan<br>
        3. Foto bersama Lurah, Camat, Gubernur<br>
        4. Doa bersama di kantor Kementerian
      </p>
    </div>
  </div>
</div>
```

#### Page 3: Admin Leak Page (`views/admin.html`)

**Design:**
- Minimal security (no login)
- Displays all registered users in table
- Shows all PII including absurd answers
- Header: `"⚠️ INTERNAL USE ONLY - JANGAN DISEBARLUASKAN"`

**Table Columns:**
- Nomor Pendaftaran
- NIK
- Nama
- Jumlah Genteng
- Tetangga Dibenci
- Warna Rumah
- Status
- Timestamp

**Footer Warning:**
```html
<div class="bg-red-100 border-l-4 border-red-700 p-4 mt-6">
  <p class="text-red-800 text-sm">
    ⚠️ <strong>PERINGATAN:</strong> Halaman ini seharusnya tidak bisa 
    diakses publik. Jika Anda bukan admin, segera tutup browser dan 
    laporkan ke <strike>security</strike> <em>(tidak ada divisi IT)</em>.
  </p>
</div>
```

---

### Phase 5: Satirical Polish & Easter Eggs

#### Server Console Logs (Comedic)

Add to `server.js` startup:
```javascript
console.log('🌾 Booting SawitDB Agricultural Database...');
setTimeout(() => {
  console.log('🚜 Loading modules from 2009...');
}, 1000);
setTimeout(() => {
  console.log('⚠️  WARNING: Budget insufficient, using backup server');
}, 2000);
setTimeout(() => {
  console.log('✅ Server ready (mungkin)');
  console.log('📡 Listening on http://localhost:3000');
  console.log('💾 Database: Connected to database.sawit (unencrypted)');
}, 3000);
```

#### Frontend JavaScript Loading Messages

```javascript
const loadingMessages = [
  "🛰️ Menghubungi Satelit Palapa...",
  "📡 Connecting to server in Jakarta (2009)...",
  "🔄 Retrying connection... (attempt 3/10)",
  "💾 Loading data from floppy disk...",
  "📠 Sending fax to Kementerian...",
  "⏳ Tunggu sebentar, server sedang update Windows XP...",
  "🔐 Bypassing security (tidak ada)...",
  "📊 Calculating your luck score..."
];
```

Cycle through these messages during the 3-7 second delay.

#### README.md (Satirical Documentation)

```markdown
# 🏛️ Kartu Indonesia Hoki (KIH)

**KEMENTERIAN KEBERUNTUNGAN REPUBLIK INDONESIA**

---

## ⚠️ Disclaimer

Ini adalah **proyek satir**. Tidak ada hubungannya dengan program 
pemerintah resmi. Semua kesamaan dengan sistem nyata adalah kebetulan 
(atau mungkin tidak).

## 🎯 Tujuan Proyek

Satir sosial tentang:
- ❌ Distribusi bantuan sosial yang arbitrary
- 🐌 Infrastruktur digital pemerintah yang lambat
- 📋 Persyaratan verifikasi yang absurd
- 🔓 Kebocoran data pribadi penduduk

## 🎲 Cara Kerja

1. Pengguna mengisi form dengan pertanyaan absurd
2. Sistem menggunakan RNG (Gacha) untuk menentukan kelayakan
3. Peluang lolos: **0.01%** (1 dari 10,000)
4. Data disimpan di SawitDB (tidak aman)
5. Data bisa diintip siapa saja di `/admin.html`

## 🛠️ Teknologi

- **SawitDB**: Database dengan sintaks pertanian
  - `LAHAN` = CREATE TABLE
  - `TANAM` = INSERT
  - `PANEN` = SELECT
  - `GUSUR` = DELETE
  
- **JokoUI**: Framework UI boxy dan rigid dengan warna merah

## 🚀 Installation

\`\`\`bash
npm install
npm start
\`\`\`

Buka browser: `http://localhost:3000`

## 📸 Screenshots

*(Tambahkan screenshot form dan hasil)*

## 🎭 Easter Eggs

1. Coba akses `/api/admin/intip` (data leak)
2. Submit form dengan NIK `1234567890123456` (always approved)
3. Klik logo 10 kali untuk unlock "Konami Code" message
4. Check console logs untuk pesan lucu

## 📜 License

MIT - Gunakan dengan bebas untuk kritik sosial

## 👥 Contributors

- Rakyat Indonesia yang lelah mengurus berkas

---

**Powered by SawitDB** 🌾 - Infrastruktur Kedaulatan Data
```

#### Additional Satirical Touches

1. **Fake Loading Spinner:**
   - Use old-school Windows XP style loading bar
   - Progress bar stuck at 99% for 2 seconds

2. **Error Messages (Random 10% chance):**
   ```
   "Error 500: Server sedang sholat Jumat"
   "Error 503: Database penuh, mohon hapus data lama"
   "Error 404: Bantuan tidak ditemukan"
   "Error 403: Anda terlalu beruntung, ditolak"
   ```

3. **Browser Alert on Form Submit:**
   ```javascript
   alert('⚠️ Data Anda akan disimpan tanpa enkripsi dan mungkin bocor ke publik. Lanjutkan?');
   ```

4. **Konami Code Easter Egg:**
   ```javascript
   // Up, Up, Down, Down, Left, Right, Left, Right, B, A
   // Shows message: "Selamat! Kamu menemukan cheat code. Tapi tetap tidak lolos."
   ```

5. **Fake CAPTCHA:**
   ```
   "Buktikan Anda bukan robot: Berapa 2 + 2?"
   (Any answer is accepted, no validation)
   ```

---

## 🧪 Testing Checklist

- [ ] SawitDB commands work correctly
- [ ] Form submission triggers gacha system
- [ ] Loading delay works (3-7s)
- [ ] Result page shows correct status
- [ ] Admin page accessible without auth
- [ ] Console logs display satirical messages
- [ ] Mobile responsive (JokoUI works on phone)
- [ ] Easter eggs functional
- [ ] README.md disclaimer clear

---

## 🎬 Deployment Notes

**DO NOT deploy to production domains ending in `.go.id`**

Safe deployment options:
- Vercel / Netlify (for demo)
- GitHub Pages (static version)
- Local network only

**Content Warning:**
Include prominent disclaimer that this is satire/parody on homepage.

---

## 📚 Resources

- SawitDB GitHub: [WowoEngine/SawitDB](https://github.com/WowoEngine/SawitDB)
- JokoUI Components: [Joko UI](https://jokoui.vercel.app)
- TailwindCSS: [tailwindcss.com](https://tailwindcss.com)

---

## 💡 Next Steps

After completing this plan:

1. **Test thoroughly** - Make sure satire is clear
2. **Add screenshots** - Visual documentation
3. **Record demo video** - Show it in action
4. **Share responsibly** - Include context/disclaimer
5. **Gather feedback** - Improve satirical elements

---

*"Keadilan sosial bagi seluruh rakyat Indonesia (yang beruntung)"*
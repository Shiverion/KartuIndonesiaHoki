/**
 * Kartu Indonesia Hoki (KIH) - Server
 * Kementerian Keberuntungan Republik Indonesia
 * 
 * "Keadilan sosial bagi seluruh rakyat Indonesia (yang beruntung)"
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const SawitDB = require('./lib/sawitdb');

const app = express();
const PORT = process.env.PORT || 3001;
const db = new SawitDB(path.join(__dirname, 'database.sawit'));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// DEBUG: Log every request
app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming Request: ${req.method} ${req.url} | Headers: ${JSON.stringify(req.headers['user-agent'])}`);
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// Health check endpoint
app.get('/ping', (req, res) => {
    res.send('pong');
});

// Initialize database tables
(async () => {
    await db.run("LAHAN pendaftar");
    await db.run("LAHAN admin_logs");
})();

// Explicit route for home page
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'views', 'index.html');
    console.log(`Serve index.html from: ${indexPath}`);
    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error serving index.html:', err);
            res.status(500).send('Error loading page');
        }
    });
});

// Explicit route for status page
app.get('/status', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'status.html'));
});

// Explicit route for admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin.html'));
});

// Satirical response messages
const messages = {
    LOLOS_VERIFIKASI: "Selamat! Anda terpilih. Dana akan cair dalam 100 tahun.",
    DALAM_ANTRIAN: "Mohon tunggu. Estimasi proses: 47 tahun 3 bulan.",
    DITOLAK_KURANG_BERUNTUNG: "Maaf, Anda kurang beruntung. Coba lagi tahun depan."
};

// Generate registration number
function generateNomorPendaftaran() {
    const prefix = ['KIH', 'HOK', 'GAC', 'RNG'][Math.floor(Math.random() * 4)];
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 999999).toString().padStart(6, '0');
    return `${prefix}-${year}-${random}`;
}

// Determine eligibility using RNG (Gacha System)
function determineStatus(nik) {
    // Easter egg: NIK 1234567890123456 always approved
    if (nik === '1234567890123456') {
        return 'LOLOS_VERIFIKASI';
    }

    const chance = Math.floor(Math.random() * 10000) + 1;

    if (chance > 9999) {
        return 'LOLOS_VERIFIKASI'; // 0.01% chance
    } else if (chance > 9000) {
        return 'DALAM_ANTRIAN'; // ~10% chance
    } else {
        return 'DITOLAK_KURANG_BERUNTUNG'; // ~90% chance
    }
}

// Random delay to simulate slow government servers
function randomDelay() {
    return Math.floor(Math.random() * 4000) + 3000; // 3000-7000ms
}

// ===== ROUTES =====

// Route 1: Registration (POST /api/daftar)
app.post('/api/daftar', async (req, res) => {
    console.log('📋 Pendaftaran baru diterima...');
    console.log('⏳ Memproses berkas ke server Jakarta (2009)...');

    const {
        nik,
        nama,
        jumlah_genteng,
        nama_tetangga_dibenci,
        warna_rumah,
        alasan_butuh_bantuan,
        captcha_answer
    } = req.body;

    // Intentionally weak validation (just check if fields exist)
    if (!nik || !nama) {
        return res.status(400).json({
            success: false,
            error: 'NIK dan Nama wajib diisi (minimal)',
            kode_error: 'ERR_KURANG_LENGKAP'
        });
    }

    // Add artificial delay
    const delay = randomDelay();
    await new Promise(resolve => setTimeout(resolve, delay));

    // Random error (10% chance)
    if (Math.random() < 0.1) {
        const errors = [
            { code: 500, message: 'Server sedang sholat Jumat' },
            { code: 503, message: 'Database penuh, mohon hapus data lama' },
            { code: 504, message: 'Timeout: Satelit Palapa tidak merespons' },
            { code: 418, message: 'Server kelelahan, coba lagi besok' }
        ];
        const randomError = errors[Math.floor(Math.random() * errors.length)];

        // But we still process it anyway (satirical)
        console.log(`⚠️ Error ${randomError.code}: ${randomError.message} (diabaikan)`);
    }

    // Generate status using gacha system
    const status = determineStatus(nik);
    const nomor_pendaftaran = generateNomorPendaftaran();

    // Store in SawitDB
    const record = await db.insert('pendaftar', {
        nomor_pendaftaran,
        nik,
        nama,
        jumlah_genteng: jumlah_genteng || '0',
        nama_tetangga_dibenci: nama_tetangga_dibenci || '-',
        warna_rumah: warna_rumah || '-',
        alasan_butuh_bantuan: alasan_butuh_bantuan || '-',
        status,
        pesan: messages[status],
        processing_time_ms: delay
    });

    console.log(`✅ Pendaftaran selesai: ${nomor_pendaftaran} - ${status}`);

    res.json({
        success: true,
        nomor_pendaftaran,
        status,
        pesan: messages[status],
        estimasi_proses: status === 'LOLOS_VERIFIKASI' ? '100 tahun' :
            status === 'DALAM_ANTRIAN' ? '47 tahun 3 bulan' :
                'Tidak ada harapan',
        data: {
            nama,
            nik: nik.substring(0, 4) + '****' + nik.substring(12), // Partially mask
            waktu_daftar: new Date().toISOString()
        }
    });
});

// Route 2: Check Status (GET /api/status/:nomor_pendaftaran)
app.get('/api/status/:nomor_pendaftaran', async (req, res) => {
    console.log('🔍 Pengecekan status...');

    const { nomor_pendaftaran } = req.params;

    // Add delay
    const delay = Math.floor(Math.random() * 2000) + 1000;
    await new Promise(resolve => setTimeout(resolve, delay));

    const result = await db.findOne('pendaftar', 'nomor_pendaftaran', nomor_pendaftaran);

    if (!result) {
        return res.status(404).json({
            success: false,
            error: 'Data tidak ditemukan. Mungkin sudah dihapus sistem atau dimakan rayap digital.',
            kode_error: 'ERR_HILANG_MISTERIUS'
        });
    }

    res.json({
        success: true,
        data: {
            nomor_pendaftaran: result.nomor_pendaftaran,
            nama: result.nama,
            status: result.status,
            pesan: result.pesan || messages[result.status],
            waktu_daftar: result.created_at
        }
    });
});

// Route 3: Admin "Data Leak" (GET /api/admin/intip)
app.get('/api/admin/intip', async (req, res) => {
    console.log('⚠️ PERINGATAN: Data diakses tanpa otorisasi');
    console.log('🔓 Keamanan: TIDAK ADA');

    // Log this "breach"
    await db.insert('admin_logs', {
        action: 'DATA_LEAK',
        ip: req.ip || 'unknown',
        user_agent: req.headers['user-agent'] || 'unknown'
    });

    const allData = await db.findAll('pendaftar');

    res.set('X-Data-Source', 'Bocoran Internal');
    res.set('X-Security-Level', 'Tidak Ada');
    res.set('X-Warning', 'Data ini seharusnya tidak bisa diakses');

    res.json({
        success: true,
        peringatan: '⚠️ DATA INI BOCOR KARENA TIDAK ADA AUTENTIKASI',
        jumlah_data: allData.length,
        data: allData,
        metadata: {
            server: 'SawitDB Agricultural Database',
            versi: '1.0.0-beta.2009',
            enkripsi: false,
            keamanan: 'Tidak Ada'
        }
    });
});

// Easter egg: PUPUK endpoint (corrupt random data)
app.post('/api/admin/pupuk', async (req, res) => {
    console.log('☠️ PUPUK: Meracuni data...');
    const result = await db.run('PUPUK pendaftar');
    res.json({
        success: true,
        message: 'Data berhasil dipupuk (dirusak)',
        ...result
    });
});

// Statistics endpoint
app.get('/api/stats', async (req, res) => {
    const allData = await db.findAll('pendaftar');

    const stats = {
        total_pendaftar: allData.length,
        lolos: allData.filter(d => d.status === 'LOLOS_VERIFIKASI').length,
        antrian: allData.filter(d => d.status === 'DALAM_ANTRIAN').length,
        ditolak: allData.filter(d => d.status === 'DITOLAK_KURANG_BERUNTUNG').length
    };

    res.json({
        success: true,
        stats,
        persentase: {
            lolos: ((stats.lolos / stats.total_pendaftar) * 100 || 0).toFixed(2) + '%',
            antrian: ((stats.antrian / stats.total_pendaftar) * 100 || 0).toFixed(2) + '%',
            ditolak: ((stats.ditolak / stats.total_pendaftar) * 100 || 0).toFixed(2) + '%'
        }
    });
});

// DEBUG: Catch-all 404 handler
app.use('*', (req, res) => {
    console.log(`[DEBUG] 404 Hit: ${req.method} ${req.url}`);
    res.status(404).send(`KARTU INDONESIA HOKI - 404 NOT FOUND (Debug Mode)<br>URL: ${req.url}`);
});

// Start server (Cloud Run uses PORT env variable)
app.listen(PORT, '0.0.0.0', () => {
    // Satirical startup sequence
    console.log('');
    console.log('🌾 ═══════════════════════════════════════════════════════');
    console.log('🌾   KARTU INDONESIA HOKI (KIH) - Server Initialization');
    console.log('🌾   Kementerian Keberuntungan Republik Indonesia');
    console.log('🌾 ═══════════════════════════════════════════════════════');
    console.log('');
    console.log('🌾 Booting SawitDB Agricultural Database...');

    setTimeout(() => {
        console.log('🚜 Loading modules from 2009...');
    }, 500);

    setTimeout(() => {
        console.log('⚠️  WARNING: Budget insufficient, using backup server');
    }, 1000);

    setTimeout(() => {
        console.log('🔓 Security module: NOT FOUND (skipping)');
    }, 1500);

    setTimeout(() => {
        console.log('');
        console.log('✅ Server ready (mungkin)');
        console.log(`📡 Listening on http://localhost:${PORT}`);
        console.log('💾 Database: Connected to database.sawit (unencrypted)');
        console.log('');
        console.log('📌 Available routes:');
        console.log(`   GET  http://localhost:${PORT}/          - Form Pendaftaran`);
        console.log(`   GET  http://localhost:${PORT}/status    - Cek Status`);
        console.log(`   GET  http://localhost:${PORT}/admin     - Data Bocor 🔓`);
        console.log('');
        console.log('🎲 "Keadilan sosial bagi seluruh rakyat Indonesia (yang beruntung)"');
        console.log('');
    }, 2000);
});

// Export for Vercel serverless
module.exports = app;


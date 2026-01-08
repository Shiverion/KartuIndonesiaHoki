/**
 * Kartu Indonesia Hoki - Frontend JavaScript
 * "Keadilan sosial bagi seluruh rakyat Indonesia (yang beruntung)"
 */

// Loading messages for satirical delays
const loadingMessages = [
  "🛰️ Menghubungi Satelit Palapa...",
  "📡 Connecting to server in Jakarta (2009)...",
  "🔄 Retrying connection... (attempt 3/10)",
  "💾 Loading data from floppy disk...",
  "📠 Sending fax to Kementerian...",
  "⏳ Tunggu sebentar, server sedang update Windows XP...",
  "🔐 Bypassing security (tidak ada)...",
  "📊 Calculating your luck score...",
  "🎲 Mengocok dadu keberuntungan...",
  "📋 Memverifikasi jumlah genteng rumah Anda...",
  "🔍 Cross-checking data tetangga yang dibenci...",
  "🎰 Spinning the gacha wheel...",
  "☕ Server sedang istirahat minum kopi...",
  "🐌 Memproses data dengan kecepatan optimal (lambat)...",
  "📞 Menunggu approval dari Pak RT..."
];

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    showKonamiEasterEgg();
  }
});

function showKonamiEasterEgg() {
  alert('🎮 KONAMI CODE ACTIVATED!\n\nSelamat! Kamu menemukan cheat code.\nTapi tetap tidak lolos.\n\n"Keberuntungan tidak bisa di-cheat"');
}

// Fufufafa Easter Egg (Typing "fufufafa")
let fufufafaBuffer = '';
document.addEventListener('keydown', (e) => {
  if (e.key.length === 1) { // Only letters
    fufufafaBuffer += e.key.toLowerCase();
    if (fufufafaBuffer.length > 8) fufufafaBuffer = fufufafaBuffer.slice(-8);

    if (fufufafaBuffer === 'fufufafa') {
      activateFufufafaMode();
      fufufafaBuffer = ''; // Reset
    }
  }
});

function activateFufufafaMode() {
  alert('👑 SYSTEM OVERRIDE: AKUN FUFUFAFA DETECTED 👑\n\n"Jejak digital tidak bisa hilang..."');

  // Glitch effects
  document.body.style.transition = 'all 0.5s ease';
  document.body.style.filter = 'invert(1) contrast(1.5)';
  document.body.style.fontFamily = '"Comic Sans MS", cursive';

  // Change headings
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(h => {
    h.innerText = 'JEJAK DIGITAL TIDAK BISA HILANG!';
    h.style.color = '#FF0000';
  });

  // Auto-fill form with "Orang Dalam" perks
  const jabatanSelect = document.querySelector('select[name="jabatan"]');
  if (jabatanSelect) {
    jabatanSelect.value = 'Anak Presiden';
    jabatanSelect.style.border = '3px solid gold';
  }
}

// Logo click counter for easter egg
let logoClickCount = 0;
function handleLogoClick() {
  logoClickCount++;
  if (logoClickCount >= 10) {
    alert('🏛️ Anda telah mengklik logo 10 kali!\n\nRahasia: NIK 1234567890123456 selalu lolos.\n\n(Jangan bilang siapa-siapa)');
    logoClickCount = 0;
  }
}

// Show loading state with rotating messages
function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let messageIndex = 0;
  let progress = 0;

  container.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text" id="loading-message">${loadingMessages[0]}</p>
      <p class="loading-subtext">Mohon tunggu, proses ini memakan waktu...</p>
      <div class="progress-container mt-2">
        <div class="progress-bar" id="progress-bar"></div>
        <span class="progress-text" id="progress-text">0%</span>
      </div>
    </div>
  `;
  container.classList.remove('hidden');

  // Rotate messages
  const messageInterval = setInterval(() => {
    messageIndex = (messageIndex + 1) % loadingMessages.length;
    const msgElement = document.getElementById('loading-message');
    if (msgElement) {
      msgElement.textContent = loadingMessages[messageIndex];
    }
  }, 1500);

  // Animate progress bar (with intentional 99% stall)
  const progressInterval = setInterval(() => {
    if (progress < 99) {
      progress += Math.random() * 15;
      if (progress > 99) progress = 99;
    }
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    if (progressBar && progressText) {
      progressBar.style.width = progress + '%';
      progressText.textContent = Math.floor(progress) + '%';
    }
  }, 300);

  return { messageInterval, progressInterval };
}

function hideLoading(containerId, intervals) {
  if (intervals) {
    clearInterval(intervals.messageInterval);
    clearInterval(intervals.progressInterval);
  }

  // Set to 100% before hiding
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  if (progressBar && progressText) {
    progressBar.style.width = '100%';
    progressText.textContent = '100%';
  }

  setTimeout(() => {
    const container = document.getElementById(containerId);
    if (container) {
      container.classList.add('hidden');
    }
  }, 500);
}

// Form submission handler
async function handleFormSubmit(event) {
  event.preventDefault();
  console.log('🎲 Form submission started...');

  // Satirical warning (no blocking dialog)
  console.log('⚠️ PERINGATAN: Data Anda akan disimpan tanpa enkripsi!');

  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log('📋 Form data:', data);

  // Hide form, show loading
  const formContainer = document.getElementById('registration-form');
  if (formContainer) {
    formContainer.classList.add('hidden');
  }
  const intervals = showLoading('loading-state');

  try {
    console.log('📡 Sending request to /api/daftar...');
    const response = await fetch('/api/daftar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    console.log('📨 Response status:', response.status);
    const result = await response.json();
    console.log('✅ Result:', result);

    // Hide loading
    hideLoading('loading-state', intervals);

    setTimeout(() => {
      // Show result
      showResult(result);
    }, 600);

  } catch (error) {
    console.error('❌ Error:', error);
    hideLoading('loading-state', intervals);
    showError('Gagal menghubungi server. Server mungkin sedang sholat. Error: ' + error.message);
  }
}

// Display result based on status
function showResult(result) {
  const container = document.getElementById('result-container');
  if (!container) return;

  let cardClass = 'rejected';
  let icon = '❌';
  let title = 'DITOLAK';
  let titleColor = '#DC2626';
  let tips = '';

  if (result.status === 'LOLOS_VERIFIKASI') {
    cardClass = 'approved';
    icon = '✅';
    title = 'LOLOS VERIFIKASI';
    titleColor = '#059669';
    tips = `
      <div class="joko-alert joko-alert-info mt-3">
        <p><strong>📋 Langkah selanjutnya:</strong></p>
        <ol style="margin-left: 20px; margin-top: 8px;">
          <li>Tunggu surat fisik via pos (estimasi 5 tahun)</li>
          <li>Urus 47 dokumen persyaratan</li>
          <li>Foto bersama Lurah, Camat, Gubernur</li>
          <li>Doa bersama di kantor Kementerian</li>
        </ol>
      </div>
    `;
  } else if (result.status === 'DALAM_ANTRIAN') {
    cardClass = 'queued';
    icon = '⏰';
    title = 'DALAM ANTRIAN';
    titleColor = '#D97706';
    tips = `
      <div class="joko-alert joko-alert-warning mt-3">
        <p><strong>⏳ Info Antrian:</strong></p>
        <p>Anda berada di antrian ke-${Math.floor(Math.random() * 999999)}</p>
        <p>Estimasi waktu: <strong>${result.estimasi_proses}</strong></p>
      </div>
    `;
  } else {
    tips = `
      <div class="joko-alert joko-alert-warning mt-3">
        <p><strong>💡 Tips:</strong> Tingkatkan keberuntungan dengan mengunjungi dukun terdekat atau beli jimat KIH di marketplace.</p>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="result-card ${cardClass}">
      <div class="result-icon">${icon}</div>
      <h2 class="result-title" style="color: ${titleColor}">${title}</h2>
      <p class="result-message">${result.pesan}</p>
      
      <div class="joko-card mt-3" style="text-align: left;">
        <p><strong>Nomor Pendaftaran:</strong></p>
        <p style="font-size: 18px; font-family: monospace; margin: 8px 0;">${result.nomor_pendaftaran}</p>
        <p class="text-muted" style="font-size: 12px;">Simpan nomor ini untuk pengecekan status</p>
      </div>
      
      ${tips}
      
      <div class="mt-4">
        <button onclick="window.location.reload()" class="joko-button joko-button-secondary">
          🎲 COBA LAGI
        </button>
        <button onclick="window.location.href='/status?no=${result.nomor_pendaftaran}'" class="joko-button mt-2">
          📋 CEK STATUS
        </button>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
}

// Check status handler
async function checkStatus(nomorPendaftaran) {
  if (!nomorPendaftaran) {
    nomorPendaftaran = document.getElementById('nomor-input')?.value;
  }

  if (!nomorPendaftaran) {
    alert('Masukkan nomor pendaftaran terlebih dahulu!');
    return;
  }

  document.getElementById('status-form-container')?.classList.add('hidden');
  const intervals = showLoading('loading-state');

  try {
    const response = await fetch(`/api/status/${nomorPendaftaran}`);
    const result = await response.json();

    hideLoading('loading-state', intervals);

    setTimeout(() => {
      if (result.success) {
        showStatusResult(result.data);
      } else {
        showError(result.error || 'Data tidak ditemukan');
      }
    }, 600);

  } catch (error) {
    hideLoading('loading-state', intervals);
    showError('Gagal menghubungi server');
  }
}

function showStatusResult(data) {
  const container = document.getElementById('result-container');
  if (!container) return;

  let cardClass = 'rejected';
  let icon = '❌';
  let titleColor = '#DC2626';

  if (data.status === 'LOLOS_VERIFIKASI') {
    cardClass = 'approved';
    icon = '✅';
    titleColor = '#059669';
  } else if (data.status === 'DALAM_ANTRIAN') {
    cardClass = 'queued';
    icon = '⏰';
    titleColor = '#D97706';
  }

  container.innerHTML = `
    <div class="result-card ${cardClass}">
      <div class="result-icon">${icon}</div>
      <h2 class="result-title" style="color: ${titleColor}">${data.status.replace(/_/g, ' ')}</h2>
      <p class="result-message">${data.pesan}</p>
      
      <div class="joko-card mt-3" style="text-align: left;">
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0;"><strong>Nomor:</strong></td>
            <td style="font-family: monospace;">${data.nomor_pendaftaran}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Nama:</strong></td>
            <td>${data.nama}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Waktu Daftar:</strong></td>
            <td>${new Date(data.waktu_daftar).toLocaleString('id-ID')}</td>
          </tr>
        </table>
      </div>
      
      <div class="mt-4">
        <button onclick="window.location.href='/'" class="joko-button">
          📝 DAFTAR ULANG
        </button>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
}

function showError(message) {
  const container = document.getElementById('result-container');
  if (!container) return;

  container.innerHTML = `
    <div class="joko-card joko-card-red">
      <div class="text-center">
        <div style="font-size: 60px; margin-bottom: 20px;">❌</div>
        <h2 class="text-danger">ERROR</h2>
        <p class="mt-2">${message}</p>
        <button onclick="window.location.reload()" class="joko-button mt-3">
          🔄 COBA LAGI
        </button>
      </div>
    </div>
  `;

  container.classList.remove('hidden');
}

// Admin page: Load all data
async function loadAdminData() {
  const container = document.getElementById('data-container');
  const statsContainer = document.getElementById('stats-container');

  if (!container) return;

  try {
    // Load stats
    const statsResponse = await fetch('/api/stats');
    const statsResult = await statsResponse.json();

    if (statsContainer && statsResult.success) {
      statsContainer.innerHTML = `
        <div style="display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;">
          <div class="joko-card" style="flex: 1; min-width: 150px; text-align: center;">
            <p class="text-muted">Total Pendaftar</p>
            <p style="font-size: 32px; font-weight: bold;">${statsResult.stats.total_pendaftar}</p>
          </div>
          <div class="joko-card" style="flex: 1; min-width: 150px; text-align: center; border-color: #059669;">
            <p class="text-muted">Lolos</p>
            <p style="font-size: 32px; font-weight: bold; color: #059669;">${statsResult.stats.lolos}</p>
            <p class="text-muted">${statsResult.persentase.lolos}</p>
          </div>
          <div class="joko-card" style="flex: 1; min-width: 150px; text-align: center; border-color: #D97706;">
            <p class="text-muted">Antrian</p>
            <p style="font-size: 32px; font-weight: bold; color: #D97706;">${statsResult.stats.antrian}</p>
            <p class="text-muted">${statsResult.persentase.antrian}</p>
          </div>
          <div class="joko-card" style="flex: 1; min-width: 150px; text-align: center; border-color: #DC2626;">
            <p class="text-muted">Ditolak</p>
            <p style="font-size: 32px; font-weight: bold; color: #DC2626;">${statsResult.stats.ditolak}</p>
            <p class="text-muted">${statsResult.persentase.ditolak}</p>
          </div>
        </div>
      `;
    }

    // Load all data (data leak)
    const response = await fetch('/api/admin/intip');
    const result = await response.json();

    if (result.success && result.data.length > 0) {
      let tableHTML = `
        <div style="overflow-x: auto;">
          <table class="joko-table">
            <thead>
              <tr>
                <th>No. Pendaftaran</th>
                <th>NIK</th>
                <th>Nama</th>
                <th>Genteng</th>
                <th>Tetangga Dibenci</th>
                <th>Warna Rumah</th>
                <th>Status</th>
                <th>Waktu</th>
              </tr>
            </thead>
            <tbody>
      `;

      result.data.forEach(item => {
        let statusClass = 'ditolak';
        if (item.status === 'LOLOS_VERIFIKASI') statusClass = 'lolos';
        if (item.status === 'DALAM_ANTRIAN') statusClass = 'antrian';

        tableHTML += `
          <tr>
            <td style="font-family: monospace; font-size: 11px;">${item.nomor_pendaftaran || '-'}</td>
            <td style="font-family: monospace;">${item.nik || '-'}</td>
            <td>${item.nama || '-'}</td>
            <td>${item.jumlah_genteng || '-'}</td>
            <td>${item.nama_tetangga_dibenci || '-'}</td>
            <td>${item.warna_rumah || '-'}</td>
            <td><span class="status-badge ${statusClass}">${item.status || '-'}</span></td>
            <td style="font-size: 11px;">${item.created_at ? new Date(item.created_at).toLocaleString('id-ID') : '-'}</td>
          </tr>
        `;
      });

      tableHTML += '</tbody></table></div>';
      container.innerHTML = tableHTML;
    } else {
      container.innerHTML = `
        <div class="joko-alert joko-alert-info">
          Belum ada data pendaftar. Silakan daftar di halaman utama.
        </div>
      `;
    }

  } catch (error) {
    container.innerHTML = `
      <div class="joko-alert joko-alert-danger">
        Gagal memuat data: ${error.message}
      </div>
    `;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if on status page with query param
  const urlParams = new URLSearchParams(window.location.search);
  const nomorParam = urlParams.get('no');

  if (nomorParam && document.getElementById('nomor-input')) {
    document.getElementById('nomor-input').value = nomorParam;
    checkStatus(nomorParam);
  }

  // Auto-load admin data if on admin page
  if (document.getElementById('data-container')) {
    loadAdminData();
  }

  console.log('🎲 Kartu Indonesia Hoki - Frontend Loaded');
  console.log('💡 Tip: Coba ketik Konami Code (↑↑↓↓←→←→BA)');
  console.log('💡 Tip: Klik logo 10 kali untuk rahasia');
});

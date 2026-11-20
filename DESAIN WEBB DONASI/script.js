/**
 * JiwaPeduli - Script Utama
 * Platform Donasi & Tanggap Bencana Indonesia
 * Tagline: Satu Jiwa, Sejuta Harapan
 */

// Eksekusi segera sebelum DOM siap untuk mencegah flashing
(function () {
  var savedTheme = localStorage.getItem("jp_theme");
  if (savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  // 0. Inisialisasi Sistem Tema Terang / Gelap
  initThemeSystem();
  enforceDarkModeHighContrast();

  // 1. Inisialisasi Database Lokal (localStorage) jika belum ada
  initLocalStorage();

  // 2. Navbar Scrolling Effect
  initNavbarScroll();

  // 3. Counter Animation
  initCounters();

  // 4. Reveal Animation on Scroll
  initScrollReveal();

  // 5. Countdown Timer
  initCountdown();

  // 6. Live Donation Feed Simulator & Real-time Update
  initDonationFeed();

  // 7. Back To Top Button
  initBackToTop();

  // 8. Ticker Animation Enhancer
  initTicker();

  // 9. Live Donation Toast Popup
  initLiveDonationToast();

  // 10. Mobile Navbar Auto-close on link click
  initMobileNavbarAutoClose();
});

/* ==========================================
   LOCAL STORAGE & DATA REALISTIS UNTUK LOMBA
========================================== */
function initLocalStorage(forceReset) {
  const defaultDonations = [
    { id: "JP-2026-842", name: "dr. Hendra Wijaya (Bandar Lampung)", program: "Bantuan Banjir Bandar Lampung", amount: 500000, date: "Hari ini, 13:42 WIB", status: "Berhasil" },
    { id: "JP-2026-841", name: "Siti Rahmawati (Padang)", program: "Dapur Umum Gempa Sumbar", amount: 250000, date: "Hari ini, 11:20 WIB", status: "Berhasil" },
    { id: "JP-2026-840", name: "Komunitas Sepeda Palembang", program: "Logistik Darurat Jawa Barat", amount: 1250000, date: "Hari ini, 09:15 WIB", status: "Berhasil" },
    { id: "JP-2026-839", name: "Hamba Allah (Banda Aceh)", program: "Bantuan Banjir Bandar Lampung", amount: 100000, date: "Kemarin, 21:05 WIB", status: "Berhasil" },
    { id: "JP-2026-838", name: "Ahmad Fauzi (Medan)", program: "Indonesia Sehat & Medis", amount: 300000, date: "Kemarin, 18:30 WIB", status: "Berhasil" },
    { id: "JP-2026-837", name: "PT Sinar Peduli Sesama (Jakarta)", program: "Dapur Umum Gempa Sumbar", amount: 2500000, date: "Kemarin, 14:10 WIB", status: "Berhasil" },
    { id: "JP-2026-836", name: "Rizky Pratama (Bandar Lampung)", program: "Pendidikan Anak Pengungsian", amount: 200000, date: "30 Okt 2026, 16:45 WIB", status: "Berhasil" },
    { id: "JP-2026-835", name: "Keluarga Halim (Pekanbaru)", program: "Bantuan Banjir Bandar Lampung", amount: 750000, date: "30 Okt 2026, 10:20 WIB", status: "Berhasil" },
    { id: "JP-2026-834", name: "Dewi Lestari (Bandung)", program: "Pembangunan Sumur Bor & Sanitasi Bersih", amount: 350000, date: "29 Okt 2026, 19:15 WIB", status: "Berhasil" },
    { id: "JP-2026-833", name: "Budi Santoso (Lampung Selatan)", program: "Bantuan Banjir Bandar Lampung", amount: 150000, date: "29 Okt 2026, 13:50 WIB", status: "Berhasil" },
    { id: "JP-2026-832", name: "dr. Ratna Juwita (Jakarta)", program: "Indonesia Sehat & Medis", amount: 1000000, date: "28 Okt 2026, 20:40 WIB", status: "Berhasil" },
    { id: "JP-2026-831", name: "Hamba Allah (Jambi)", program: "Dapur Umum Gempa Sumbar", amount: 100000, date: "28 Okt 2026, 15:25 WIB", status: "Berhasil" }
  ];

  const current = JSON.parse(localStorage.getItem("jp_donations") || "[]");
  // Bersihkan cache lama jika ada "Mega Safitri" berulang atau nama kembar berturut-turut
  const hasMegaSafitri = current.some(d => d.name && d.name.includes("Mega Safitri"));
  const hasDuplicates = current.length >= 2 && current[0].name === current[1].name;
  if (forceReset || !localStorage.getItem("jp_donations") || current.length < 6 || hasDuplicates || hasMegaSafitri) {
    localStorage.setItem("jp_donations", JSON.stringify(defaultDonations));
  }

  if (!localStorage.getItem("jp_volunteers")) {
    const dummyVolunteers = [
      { name: "Aditya Pratama", role: "Relawan Medis", city: "Bandar Lampung", scope: "Posko Induk Lampung (Bandar Lampung & Sekitarnya)", status: "Siaga Aktif" },
      { name: "Sarah Amanda", role: "Dapur Umum & Logistik", city: "Palembang", scope: "Posko Cabang Sumatera Selatan (Palembang & Ogan Ilir)", status: "Siaga Aktif" },
      { name: "Rian Hidayat", role: "Tim Evakuasi", city: "Padang", scope: "Posko Cabang Sumatera Barat (Padang & Bukittinggi)", status: "Siaga Aktif" },
      { name: "Fajar Nugraha", role: "Distribusi Sembako", city: "Bandung", scope: "Posko Cabang Jawa Barat (Bandung & Cimahi)", status: "Siaga Aktif" },
      { name: "dr. Maya Indah", role: "Dokter Posko Darurat", city: "Medan", scope: "Posko Cabang Sumatera Utara (Medan & Deli Serdang)", status: "Siaga Aktif" },
      { name: "Bambang Sugianto", role: "Logistik Darurat", city: "Sukabumi", scope: "Posko Aju Darurat Gempa & Longsor Sukabumi - Cianjur", status: "Siaga Aktif" }
    ];
    localStorage.setItem("jp_volunteers", JSON.stringify(dummyVolunteers));
  }
}

/* ==========================================
   NAVBAR SCROLL
========================================== */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* ==========================================
   COUNTER ANIMATION
========================================== */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const duration = 1800; // ms
          const stepTime = 20;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.innerText = target.toLocaleString("id-ID");
              clearInterval(timer);
            } else {
              counter.innerText = Math.floor(current).toLocaleString("id-ID");
            }
          }, stepTime);

          obs.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((c) => observer.observe(c));
}

/* ==========================================
   SCROLL REVEAL
========================================== */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active", "revealed");
        }
      });
    },
    { threshold: 0.1 },
  );

  reveals.forEach((el) => {
    observer.observe(el);
    // Jika posisi elemen sudah berada dalam viewport saat halaman dimuat
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      el.classList.add("active", "revealed");
    }
  });
}

/* ==========================================
   COUNTDOWN TIMER
========================================== */
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Set target 14 hari ke depan dari sekarang secara dinamis
  let targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 14);

  function update() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minutesEl.innerText = "00";
      secondsEl.innerText = "00";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    daysEl.innerText = d < 10 ? "0" + d : d;
    hoursEl.innerText = h < 10 ? "0" + h : h;
    minutesEl.innerText = m < 10 ? "0" + m : m;
    secondsEl.innerText = s < 10 ? "0" + s : s;
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================
   LIVE DONATION FEED
========================================== */
function initDonationFeed() {
  const feedContainer = document.getElementById("donationFeed");
  if (!feedContainer) return;

  let donations = JSON.parse(localStorage.getItem("jp_donations")) || [];

  function renderFeed() {
    feedContainer.innerHTML = "";
    donations.slice(0, 5).forEach((item) => {
      const initials = (item.name || "JP")
        .replace(/[^a-zA-Z ]/g, "")
        .split(" ")
        .filter(Boolean)
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
      const card = document.createElement("div");
      card.className = "donation-feed-item d-flex align-items-center p-3 mb-3 bg-white rounded-3 shadow-sm border-start border-4 border-danger";
      card.innerHTML = `
        <div class="feed-avatar me-3 rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width: 48px; height: 48px; background: linear-gradient(135deg, #e8491c, #ff6b3d); box-shadow: 0 4px 12px rgba(232, 73, 28, 0.25); flex-shrink: 0;">
          ${initials || "JP"}
        </div>
        <div class="feed-info flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h6 class="mb-0 fw-bold text-dark" style="font-size: 1rem; color: #0b1528 !important;">${item.name}</h6>
            <span class="badge bg-danger-subtle text-danger fw-bold">Rp ${Number(item.amount).toLocaleString("id-ID")}</span>
          </div>
          <small class="text-muted d-block fw-semibold"><i class="fas fa-hand-holding-heart text-danger me-1"></i> ${item.program}</small>
          <small class="text-secondary" style="font-size: 0.75rem;"><i class="far fa-clock me-1"></i> ${item.date || "Baru saja"}</small>
        </div>
      `;
      feedContainer.appendChild(card);
    });
  }

  renderFeed();

  // Koleksi donor bervariasi dari berbagai daerah Sumatera & Nasional (Realistis untuk Lomba)
  const donorPool = [
    { name: "dr. Hendra Wijaya (Lampung)", prog: "Bantuan Banjir Bandar Lampung", amt: 250000 },
    { name: "Siti Rahmawati (Padang)", prog: "Dapur Umum Gempa Sumbar", amt: 150000 },
    { name: "Ahmad Fauzi (Medan)", prog: "Bantuan Banjir Bandar Lampung", amt: 100000 },
    { name: "Komunitas Pemuda Palembang", prog: "Dapur Umum Gempa Sumbar", amt: 500000 },
    { name: "Hamba Allah (Banda Aceh)", prog: "Indonesia Sehat & Medis", amt: 200000 },
    { name: "Rian Pratama (Bandar Lampung)", prog: "Bantuan Banjir Bandar Lampung", amt: 100000 },
    { name: "Nur Hasanah (Jambi)", prog: "Pendidikan Anak Pengungsian", amt: 300000 },
    { name: "Keluarga dr. Hendarto", prog: "Indonesia Sehat & Medis", amt: 500000 },
    { name: "Fahmi Idris (Bukittinggi)", prog: "Dapur Umum Gempa Sumbar", amt: 150000 },
    { name: "Dewi Sartika (Bandung)", prog: "Logistik Darurat Jawa Barat", amt: 350000 },
    { name: "Hamba Allah (Riau)", prog: "Bantuan Banjir Bandar Lampung", amt: 50000 },
    { name: "dr. Ratna Juwita (Jakarta)", prog: "Indonesia Sehat & Medis", amt: 1000000 },
    { name: "Budi Santoso (Lampung Selatan)", prog: "Bantuan Banjir Bandar Lampung", amt: 150000 }
  ];

  let poolIndex = 0;
  let lastAddedName = donations[0]?.name || "";

  // Simulasi penambahan transaksi yang rapi tanpa menduplikasi nama berulang
  setInterval(() => {
    let candidate = donorPool[poolIndex % donorPool.length];
    poolIndex++;
    if (candidate.name === lastAddedName) {
      candidate = donorPool[poolIndex % donorPool.length];
      poolIndex++;
    }

    lastAddedName = candidate.name;
    const nowTime = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";

    donations.unshift({
      id: "JP-2026-" + Math.floor(850 + Math.random() * 150),
      name: candidate.name,
      program: candidate.prog,
      amount: candidate.amt,
      date: `Hari ini, ${nowTime}`,
      status: "Berhasil",
    });

    if (donations.length > 25) donations.pop();
    localStorage.setItem("jp_donations", JSON.stringify(donations));
    renderFeed();
  }, 22000);
}

/* ==========================================
   BACK TO TOP BUTTON
========================================== */
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      btn.classList.add("visible");
      btn.style.display = "flex";
    } else {
      btn.classList.remove("visible");
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================
   URGENCY TICKER
========================================== */
function initTicker() {
  const ticker = document.getElementById("tickerContent");
  if (!ticker) return;
  // Animasi dikendalikan CSS infinite marquee
}

/* ==========================================
   HELPER UTILITY FUNCTIONS
========================================== */
function formatRupiah(num) {
  return "Rp " + Number(num).toLocaleString("id-ID");
}

function generateDonationCode() {
  return "JP-" + Math.floor(100000 + Math.random() * 900000);
}

/* ==========================================
   LIVE POPUP TOAST NOTIFICATIONS
========================================== */
function initLiveDonationToast() {
  const toastContainer = document.createElement("div");
  toastContainer.id = "liveToastWrapper";
  toastContainer.style.cssText = "position:fixed; bottom:25px; left:25px; z-index:1050; max-width:340px; pointer-events:none;";
  document.body.appendChild(toastContainer);

  const donors = ["Hamba Allah", "Rizky Pratama", "Siti Nurhaliza", "Budi Santoso", "Mega Safitri", "Fahmi Idris", "Ahmad Dani"];
  const programs = ["Banjir Bandar Lampung", "Dapur Umum Siaga", "Gempa Sumbar", "Logistik Jabar"];
  const amounts = [50000, 100000, 250000, 500000];

  function showToast() {
    const name = donors[Math.floor(Math.random() * donors.length)];
    const prog = programs[Math.floor(Math.random() * programs.length)];
    const amt = amounts[Math.floor(Math.random() * amounts.length)];

    const toast = document.createElement("div");
    toast.style.cssText =
      'background:#ffffff; border-radius:14px; box-shadow:0 10px 30px rgba(255, 71, 66, 0.15); border-left:4px solid #ff4742; padding:12px 16px; margin-top:10px; display:flex; align-items:center; gap:12px; pointer-events:auto; transform:translateY(30px); opacity:0; transition:all 0.4s ease; font-family:"Poppins",sans-serif;';
    toast.innerHTML = `
      <div style="background:#fff1f0; color:#ff4742; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0;">
        <i class="fas fa-heart"></i>
      </div>
      <div style="flex-grow:1; font-size:12px;">
        <strong style="color:#0f172a; display:block; font-size:13px;">${name}</strong>
        <span style="color:#64748b;">Baru saja berdonasi </span><strong style="color:#ff4742;">Rp ${amt.toLocaleString("id-ID")}</strong>
        <div style="color:#94a3b8; font-size:11px; margin-top:2px;"><i class="fas fa-shield-heart me-1"></i> ${prog}</div>
      </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.transform = "translateY(0)";
      toast.style.opacity = "1";
    }, 50);

    setTimeout(() => {
      toast.style.transform = "translateY(20px)";
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  // Mulai pop-up toast secara santai agar tidak mengganggu fokus pengguna di HP
  setTimeout(showToast, 7000);
  setInterval(showToast, 25000);
}

/* ==========================================
   THEME SWITCHER SYSTEM (Dark / Light Mode)
========================================== */
function initThemeSystem() {
  const currentTheme = localStorage.getItem("jp_theme") || "light";
  applyTheme(currentTheme);

  // Pastikan floating theme toggle tersedia
  ensureFloatingThemeButton();

  // Bind click listeners ke semua toggle button
  bindThemeToggleEvents();
}

function bindThemeToggleEvents() {
  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    btn.removeEventListener("click", handleThemeToggle);
    btn.addEventListener("click", handleThemeToggle);
  });
}

function handleThemeToggle(e) {
  e.preventDefault();
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";

  localStorage.setItem("jp_theme", newTheme);
  applyTheme(newTheme);
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    if (document.body) document.body.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
    if (document.body) document.body.removeAttribute("data-theme");
  }

  updateThemeToggleButtons(theme);
  enforceDarkModeHighContrast();
}

function updateThemeToggleButtons(theme) {
  const isDark = theme === "dark";

  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    const icon = btn.querySelector(".theme-icon") || btn.querySelector("i");
    const text = btn.querySelector(".theme-text");

    if (btn.classList.contains("floating-theme-btn")) {
      if (icon) {
        icon.className = isDark ? "fas fa-sun text-warning" : "fas fa-moon text-warning";
      }
      btn.setAttribute("title", isDark ? "Ganti ke Mode Terang (Siang)" : "Ganti ke Mode Gelap (Malam)");
    } else {
      if (icon) {
        icon.className = isDark ? "fas fa-sun text-warning me-1 theme-icon" : "fas fa-moon me-1 theme-icon";
      }
      if (text) {
        text.textContent = isDark ? "Mode Terang" : "Mode Gelap";
      }
      btn.setAttribute("title", isDark ? "Klik untuk ganti ke Mode Terang (Siang)" : "Klik untuk ganti ke Mode Gelap (Malam)");
    }
  });
}

function ensureFloatingThemeButton() {
  if (!document.getElementById("themeFloatingToggle")) {
    const floatBtn = document.createElement("button");
    floatBtn.id = "themeFloatingToggle";
    floatBtn.className = "floating-theme-btn theme-toggle-btn shadow";
    floatBtn.type = "button";
    floatBtn.setAttribute("aria-label", "Ganti Mode Gelap / Terang");
    floatBtn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(floatBtn);
  }
}

/* ==========================================
   MOBILE NAVBAR AUTO-CLOSE ON LINK CLICK
========================================== */
function initMobileNavbarAutoClose() {
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  if (!navbarCollapse) return;

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show") && typeof bootstrap !== "undefined") {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
}


/* ============================================================
   DARK MODE HIGH CONTRAST ENFORCER (Auto Fix & Zero Glare)
============================================================ */
function enforceDarkModeHighContrast() {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark" || 
                 (document.body && document.body.getAttribute("data-theme") === "dark");
  
  // 1. Regional Cards di Beranda (index.html)
  document.querySelectorAll(".region-badge-card").forEach(card => {
    if (isDark) {
      card.style.setProperty("background-color", "#0e1628", "important");
      card.style.setProperty("border-color", "rgba(255, 255, 255, 0.14)", "important");
      card.style.setProperty("box-shadow", "0 10px 30px rgba(0, 0, 0, 0.45)", "important");
      
      const title = card.querySelector("h5, .region-name");
      if (title) {
        title.style.setProperty("color", "#ffffff", "important");
        title.style.setProperty("font-weight", "700", "important");
      }
      
      const cities = card.querySelector("p, .region-cities");
      if (cities) {
        cities.style.setProperty("color", "#e2e8f0", "important");
        cities.style.setProperty("font-weight", "500", "important");
      }
      
      const badge = card.querySelector(".badge");
      if (badge) {
        badge.style.setProperty("background-color", "#1a294c", "important");
        badge.style.setProperty("color", "#f1f5f9", "important");
        badge.style.setProperty("border-color", "rgba(255, 255, 255, 0.15)", "important");
      }

      const activeText = card.querySelector(".text-success");
      if (activeText) {
        activeText.style.setProperty("color", "#34d399", "important");
      }
    } else {
      card.style.removeProperty("background-color");
      card.style.removeProperty("border-color");
      card.style.removeProperty("box-shadow");
      
      const title = card.querySelector("h5, .region-name");
      if (title) title.style.setProperty("color", "#0f172a", "important");
      
      const cities = card.querySelector("p, .region-cities");
      if (cities) cities.style.setProperty("color", "#334155", "important");
      
      const badge = card.querySelector(".badge");
      if (badge) {
        badge.style.removeProperty("background-color");
        badge.style.removeProperty("color");
        badge.style.removeProperty("border-color");
      }

      const activeText = card.querySelector(".text-success");
      if (activeText) activeText.style.removeProperty("color");
    }
  });

  // 2. Status Counter Cards (bencana.html)
  document.querySelectorAll(".status-counter-card, section.bg-light .rounded-4").forEach(card => {
    if (isDark) {
      if (!card.style.border.includes("dc3545")) {
        card.style.setProperty("background-color", "#0e1628", "important");
        card.style.setProperty("border-color", "rgba(255, 255, 255, 0.12)", "important");
      } else {
        card.style.setProperty("background-color", "rgba(220, 53, 69, 0.1)", "important");
      }
      const muted = card.querySelector(".text-muted");
      if (muted) muted.style.setProperty("color", "#cbd5e1", "important");
    } else {
      card.style.removeProperty("background-color");
      card.style.removeProperty("border-color");
      const muted = card.querySelector(".text-muted");
      if (muted) muted.style.removeProperty("color");
    }
  });
}


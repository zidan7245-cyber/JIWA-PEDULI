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
});

/* ==========================================
   LOCAL STORAGE & DATA DUMMY PERSISTENCE
========================================== */
function initLocalStorage() {
  if (!localStorage.getItem("jp_donations")) {
    const dummyDonations = [
      { id: "DON-001", name: "Rizky Pratama", program: "Tanggap Bencana Banjir Lampung", amount: 250000, date: "2026-10-28", status: "Berhasil" },
      { id: "DON-002", name: "Siti Nurhaliza", program: "Dapur Umum Gempa Sumbar", amount: 500000, date: "2026-10-28", status: "Berhasil" },
      { id: "DON-003", name: "Hamba Allah", program: "Logistik Darurat Jawa Barat", amount: 1000000, date: "2026-10-27", status: "Berhasil" },
      { id: "DON-004", name: "Budi Santoso", program: "Indonesia Sehat & Medis", amount: 150000, date: "2026-10-27", status: "Berhasil" },
      { id: "DON-005", name: "Dewi Lestari", program: "Pendidikan Anak Pengungsian", amount: 300000, date: "2026-10-26", status: "Berhasil" },
    ];
    localStorage.setItem("jp_donations", JSON.stringify(dummyDonations));
  }

  if (!localStorage.getItem("jp_volunteers")) {
    const dummyVolunteers = [
      { name: "Aditya Pratama", role: "Relawan Medis", city: "Bandar Lampung", status: "Aktif" },
      { name: "Sarah Amanda", role: "Dapur Umum & Logistik", city: "Palembang", status: "Aktif" },
      { name: "Rian Hidayat", role: "Tim Evakuasi", city: "Padang", status: "Aktif" },
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

  const donations = JSON.parse(localStorage.getItem("jp_donations")) || [];

  function renderFeed() {
    feedContainer.innerHTML = "";
    donations.slice(0, 5).forEach((item, index) => {
      const initials = item.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
      const card = document.createElement("div");
      card.className = "donation-feed-item d-flex align-items-center p-3 mb-3 bg-white rounded-3 shadow-sm border-start border-4 border-danger";
      card.innerHTML = `
        <div class="feed-avatar me-3 rounded-circle d-flex align-items-center justify-content-center text-white fw-bold" style="width: 48px; height: 48px; background: linear-gradient(135deg, #e8491c, #ff6b3d);">
          ${initials || "JP"}
        </div>
        <div class="feed-info flex-grow-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h6 class="mb-0 fw-bold text-dark">${item.name}</h6>
            <span class="badge bg-danger-subtle text-danger fw-semibold">Rp ${Number(item.amount).toLocaleString("id-ID")}</span>
          </div>
          <small class="text-muted d-block"><i class="fas fa-hand-holding-heart text-danger me-1"></i> ${item.program}</small>
          <small class="text-secondary" style="font-size: 0.75rem;"><i class="fas fa-clock me-1"></i> ${item.date || "Baru saja"}</small>
        </div>
      `;
      feedContainer.appendChild(card);
    });
  }

  renderFeed();

  // Simulasi donasi masuk berkala agar terasa interaktif saat presentasi juri lomba
  const donorNames = ["Agus Gunawan", "Mega Safitri", "Fahmi Idris", "Hamba Allah", "Putri Ayu", "Keluarga Halim"];
  const programs = ["Bantuan Banjir Bandar Lampung", "Dapur Umum Siaga Bencana", "Distribusi Sembako Korban Gempa", "Obat-obatan Medis Darurat"];
  const amounts = [50000, 100000, 250000, 500000, 1000000];

  setInterval(() => {
    const randomName = donorNames[Math.floor(Math.random() * donorNames.length)];
    const randomProg = programs[Math.floor(Math.random() * programs.length)];
    const randomAmount = amounts[Math.floor(Math.random() * amounts.length)];

    donations.unshift({
      id: "DON-" + Math.floor(100 + Math.random() * 900),
      name: randomName,
      program: randomProg,
      amount: randomAmount,
      date: "Baru saja",
      status: "Berhasil",
    });

    if (donations.length > 20) donations.pop();
    localStorage.setItem("jp_donations", JSON.stringify(donations));
    renderFeed();
  }, 14000);
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

  // Mulai pop-up toast
  setTimeout(showToast, 4000);
  setInterval(showToast, 22000);
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
}

function updateThemeToggleButtons(theme) {
  const isDark = theme === "dark";

  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    const icon = btn.querySelector(".theme-icon") || btn.querySelector("i");
    const text = btn.querySelector(".theme-text");

    if (btn.classList.contains("floating-theme-btn")) {
      if (icon) {
        icon.className = isDark ? "fas fa-sun text-warning" : "fas fa-moon";
      }
      btn.setAttribute("title", isDark ? "Ganti ke Mode Terang (Siang)" : "Ganti ke Mode Gelap (Malam)");
    } else {
      if (icon) {
        icon.className = isDark ? "fas fa-sun text-warning me-1 theme-icon" : "fas fa-moon me-1 theme-icon";
      }
      if (text) {
        text.textContent = isDark ? "Terang" : "Gelap";
      }
      btn.setAttribute("title", isDark ? "Ganti ke Mode Terang (Siang)" : "Ganti ke Mode Gelap (Malam)");
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

// Data untuk chart di dashboard

const monthlyDonationData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
  datasets: [
    {
      label: "Donasi (Juta Rupiah)",
      data: [32, 28, 35, 40, 38, 45, 50, 48, 52, 55, 60, 45],
      backgroundColor: "rgba(29, 53, 87, 0.7)",
      borderColor: "rgba(29, 53, 87, 1)",
      borderWidth: 1,
    },
  ],
};

const programDistributionData = {
  labels: ["Pendidikan", "Kesehatan", "Bencana Alam", "Perumahan", "Donasi Umum"],
  datasets: [
    {
      data: [35, 25, 20, 10, 10],
      backgroundColor: ["rgba(29, 53, 87, 0.8)", "rgba(69, 123, 157, 0.8)", "rgba(230, 57, 70, 0.8)", "rgba(168, 218, 220, 0.8)", "rgba(241, 250, 238, 0.8)"],
      borderColor: ["rgba(29, 53, 87, 1)", "rgba(69, 123, 157, 1)", "rgba(230, 57, 70, 1)", "rgba(168, 218, 220, 1)", "rgba(241, 250, 238, 1)"],
      borderWidth: 1,
    },
  ],
};

const monthlyOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return "Rp " + value + "jt";
        },
      },
    },
  },
};

const programOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

// Ekspor data untuk digunakan di file lain
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    monthlyDonationData,
    programDistributionData,
    monthlyOptions,
    programOptions,
  };
}

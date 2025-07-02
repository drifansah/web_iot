const endpoint = "https://backendwebiot-production.up.railway.app";

// Simpan status sebelumnya untuk membandingkan perubahan
const previousStatus = {
  taman1: null,
  taman2: null,
  taman3: null,
  taman4: null
};

function setTaman(taman, status) {
  fetch(`${endpoint}/api/${taman}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ status })
  }).then(() => getTamanStatus(taman));
}

function getTamanStatus(taman) {
  fetch(`${endpoint}/api/${taman}`)
    .then(res => res.json())
    .then(data => {
      const statusText = data.status;
      const id = taman.replace('taman', '');
      const img = document.getElementById(`waterTamanImage${id}`);

      // Ganti gambar
      if (statusText === "ON") {
        img.src = "assets/watering-on.png";
      } else {
        img.src = "assets/watering-off.png";
      }

      // Tampilkan notifikasi di bawah taman jika status berubah
      if (previousStatus[taman] !== null && previousStatus[taman] !== statusText) {
        showStatusMessage(taman, `Relay ${statusText === "ON" ? "MENYALA" : "MATI"}`);
      }

      // Simpan status terbaru
      previousStatus[taman] = statusText;
    });
}

// Fungsi untuk menampilkan pesan di bawah masing-masing taman
function showStatusMessage(taman, message) {
  const id = taman.replace("taman", "");
  const element = document.getElementById(`notifTaman${id}`);
  element.innerText = message;

  // Auto-hide setelah 3 detik
  setTimeout(() => {
    element.innerText = "";
  }, 3000);
}

// Jalankan pengecekan awal & polling berkala
['taman1', 'taman2', 'taman3', 'taman4'].forEach(getTamanStatus);

setInterval(() => {
  ['taman1', 'taman2', 'taman3', 'taman4'].forEach(getTamanStatus);
}, 1000); // update setiap 1 detik

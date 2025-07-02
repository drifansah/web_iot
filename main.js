const endpoint = "https://backendwebiot-production.up.railway.app";

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
  });
}

function getTamanStatus(taman) {
  fetch(`${endpoint}/api/${taman}`)
    .then(res => res.json())
    .then(data => {
      const statusText = data.status;
      const id = taman.replace("taman", "");
      const img = document.getElementById(`waterTamanImage${id}`);

      img.src = (statusText === "ON") ? "assets/watering-on.png" : "assets/watering-off.png";

      // Tampilkan status saat ini (selalu)
      showStatusMessage(taman, `Relay ${statusText === "ON" ? "MENYALA" : "MATI"}`);

      previousStatus[taman] = statusText;
    });
}

function showStatusMessage(taman, message) {
  const id = taman.replace("taman", "");
  const element = document.getElementById(`notifTaman${id}`);
  element.innerText = message;
}

['taman1', 'taman2', 'taman3', 'taman4'].forEach(getTamanStatus);

setInterval(() => {
  ['taman1', 'taman2', 'taman3', 'taman4'].forEach(getTamanStatus);
}, 1000);

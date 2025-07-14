const endpoint = "https://backendwebiot-production.up.railway.app";
// const endpoint = "http://localhost:3000"; 

const previousStatus = {
  taman1: null,
  taman2: null,
  taman3: null,
  taman4: null
};

function setTaman(taman, status) {
  fetch(`${endpoint}/api/${taman}/command`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ command: status })
  });
}

function getTamanStatus(taman) {
  fetch(`${endpoint}/api/${taman}`)
    .then(res => res.json())
    .then(data => {
      const statusText = data.status;
      const id = taman.replace("taman", "");
      const img = document.getElementById(`waterTamanImage${id}`);

      // img.src = (statusText === "ON") ? "assets/watering-on.png" : "assets/watering-off.png";
      if (statusText === "ON") {
        img.src = `assets/watering-on.png`;
      } else if (statusText === "OFF") {
        img.src = `assets/watering-off.png`;
      } else if (statusText === "SLEEP") {
        img.src = `assets/watering-off.png`;
      }



      // if (previousStatus[taman] !== null && previousStatus[taman] !== statusText) {
      //   showStatusMessage(taman, `Relay ${statusText === "ON" ? "MENYALA" : "MATI"}`);
      // }
      let message = "";

      if (statusText === "ON") {
        message = "Relay MENYALA";
      } else if (statusText === "OFF") {
        message = "Relay MATI";
      } else if (statusText === "SLEEP") {
        message = "Sedang SLEEP";
      }

      if (message && previousStatus[taman] !== statusText) {
        showStatusMessage(taman, message);
      }


      previousStatus[taman] = statusText;
    })
    .catch(err => {
      console.error(`Gagal mengambil status ${taman}:`, err);
    })
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

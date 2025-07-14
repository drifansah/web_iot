// auth.js

// Cek apakah token ada
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
} else {
  // Validasi token ke backend
  fetch("https://backendwebiot-production.up.railway.app/api/validate-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      if (data.valid) {
        document.getElementById("app").style.display = "block";
      }else{
        localStorage.removeItem("token");
        window.location.href = "login.html";
      }
    })
    .catch(() => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
}

// Fungsi logout global
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// const endpoint = "http://localhost:3000"; // ganti ke backend deploy jika sudah online
const endpoint = "https://backendwebiot-production.up.railway.app";
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`${endpoint}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } else {
        document.getElementById("login-error").innerText = "Login gagal";
      }
    });
}

// Jika token masih tersimpan, redirect langsung ke index
const token = localStorage.getItem("token");
if (token) {
  fetch(`${endpoint}/api/validate-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      if (data.valid) {
        window.location.href = "index.html";
      } else {
        localStorage.removeItem("token");
      }
    })
    .catch(() => {
      localStorage.removeItem("token");
    });
}

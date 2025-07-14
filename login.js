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

        // ✅ Delay 100ms sebelum redirect agar token tersimpan dulu
        setTimeout(() => {
          window.location.href = "index.html";
        }, 50);
      } else {
        document.getElementById("login-error").innerText = "Login gagal. Coba lagi.";
      }
    })
    .catch(() => {
      document.getElementById("login-error").innerText = "Terjadi kesalahan jaringan.";
    });
}

// ✅ Cek token valid untuk langsung redirect ke index (jika sudah login)
document.addEventListener("DOMContentLoaded", () => {
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
});

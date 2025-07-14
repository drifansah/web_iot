const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
} else {
  fetch("https://backendwebiot-production.up.railway.app/api/validate-token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  })
    .then(res => res.json())
    .then(data => {
      if (data.valid) {
        // ✅ Token valid → tampilkan isi halaman
        document.getElementById("app").style.display = "block";
        const loading = document.getElementById("loading");
        if (loading) loading.style.display = "none";
      } else {
        localStorage.removeItem("token");
        window.location.href = "login.html";
      }
    })
    .catch(() => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
}

// Fungsi logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

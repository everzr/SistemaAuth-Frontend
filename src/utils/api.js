// src/utils/api.js
export const fetchToken = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
    "Authorization": token ? `Bearer ${token}` : "",
  };

    const response = await fetch(url, { 
    ...options, 
    headers,
    credentials: "include", // ✅ envía cookies automáticamente
  });
  const data = await response.json();

  if (response.status === 401) {
    if (data.error === "Token expirado") {
      alert("⏳ Tu sesión ha expirado. Por favor inicia sesión de nuevo.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    } else if (data.error === "Token inválido") {
      alert("🔒 Token inválido. Debes iniciar sesión.");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return null;
    }
  }

  return data;
};

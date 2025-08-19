// src/pages/proof.jsx
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Proof.css"; // Assuming you have a CSS file for styling

export default function Proof() {
  const [mensaje, setMensaje] = useState("Cargando...");
  const [me, setMe] = useState(null);
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  // Trae tu endpoint de prueba (no protegido)
  useEffect(() => {
    fetch(`${API}/api/proof/prueba`)
      .then((res) => res.text())
      .then((data) => setMensaje(data))
      .catch(() => setMensaje("Error al conectar con la API"));
  }, [API]);

  // Trae el perfil (protegido por cookie JWT)
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/me`, { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          setMe(data.user);
        } else {
          setMe(null);
        }
      } catch {
        setMe(null);
      }
    })();
  }, [API]);

  const logout = async () => {
    await fetch(`${API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    location.reload();
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Respuesta de la API:</h2>
      <p>{mensaje}</p>

      <hr />

      <h3>Usuario autenticado</h3>
      {me ? (
        <div>
          <p>Hola, {me.name || me.email}</p>
          {me.avatar && (
            <img
              src={me.avatar}
              alt="avatar"
              width={64}
              style={{ borderRadius: 8 }}
            />
          )}
          <div style={{ marginTop: 8 }}>
            <button className="btn btn-outline-danger btn-sm" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <p>No autenticado</p>
      )}
    </div>
  );
}

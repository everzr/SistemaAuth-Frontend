// src/pages/Ajustes/Settings.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({id:"", nombre: "", email: "" });

  useEffect(() => {
  // Cargar usuario al montar
  const usuarioStorage = localStorage.getItem("usuario");
  if (usuarioStorage) setUsuario(JSON.parse(usuarioStorage));

  // Listener para detectar cambios en localStorage (por ejemplo, otra pestaña)
  const handleStorageChange = () => {
    const updatedUsuario = localStorage.getItem("usuario");
    if (updatedUsuario) setUsuario(JSON.parse(updatedUsuario));
  };

  window.addEventListener("storage", handleStorageChange);

  // Cleanup al desmontar
  return () => window.removeEventListener("storage", handleStorageChange);
}, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="card-title text-center text-primary mb-4">
            Perfil de Usuario
          </h3>

          <div className="mb-3">
            <label className="form-label fw-bold">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={usuario.nombre}
              readOnly
            />
          </div>

         

          <div className="mb-3">
            <label className="form-label fw-bold">Correo</label>
            <input
              type="email"
              className="form-control"
              value={usuario.email}
              readOnly
            />
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-primary position-relative"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Asocia tu rostro para login facial más rápido y seguro"
              onClick={() => navigate("/register-face")}
            >
              Asociar rostro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

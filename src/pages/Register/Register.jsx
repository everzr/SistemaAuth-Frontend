// src/components/Register.jsx
import React, { useState } from "react";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null); // para mostrar feedback
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un correo válido");
      return;
    }

    if (!passwordRegex.test(password)) {
      setError("La contraseña debe tener al menos 8 caracteres y un carácter especial");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/register/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrar usuario");
        setMessage(null);
        return;
      }

      setMessage("Usuario registrado correctamente 🎉");
      setError(null);

      // Limpio inputs
      setNombre("");
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Crear Cuenta</h3>

        {/* Mensajes */}
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
              </button>
            </div>
            <div className="form-text">
              La contraseña debe tener al menos 8 caracteres y un carácter especial
            </div>
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn-primary w-100">
            Registrarse
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;

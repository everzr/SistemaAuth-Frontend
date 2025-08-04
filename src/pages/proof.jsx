import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() {
  return <h2>Bienvenido al Home</h2>;
}

function Proof() {
  const [mensaje, setMensaje] = useState("Cargando...");

  useEffect(() => {
    fetch("http://localhost:3000/api/proof/prueba")
      .then((res) => res.text())
      .then((data) => setMensaje(data))
      .catch(() => setMensaje("Error al conectar con la API"));
  }, []);

  return (
    <div>
      <h2>Respuesta de la API:</h2>
      <p>{mensaje}</p>
    </div>
  );
}

export default Proof;
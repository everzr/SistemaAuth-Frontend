import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SECRET_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

export default function SecretHotKey() {
  const [show, setShow] = useState(false);
  const [pin, setPin] = useState("");
  const bufferRef = useRef([]);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  useEffect(() => {
    const onKeyDown = (e) => {
      // Evita capturar mientras escribes en inputs/textarea/contenteditable
      const tag = (e.target?.tagName || "").toLowerCase();
      const isTyping =
        tag === "input" || tag === "textarea" || e.target?.isContentEditable;
      if (isTyping) return;

      bufferRef.current.push(e.code);
      if (bufferRef.current.length > SECRET_SEQUENCE.length) {
        bufferRef.current.shift();
      }

      // Compara con la secuencia
      const match = SECRET_SEQUENCE.every(
        (code, i) => bufferRef.current[i] === code
      );
      if (match) {
        setShow(true);
        bufferRef.current = [];
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const submitPin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/api/secret`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // para recibir cookie httpOnly
        body: JSON.stringify({ key: pin }),
      });
      if (res.ok) {
        setShow(false);
        setPin("");
        navigate("/secret");
      } else {
        alert("PIN incorrecto");
      }
    } catch {
      alert("Error conectando al servidor");
    }
  };

  if (!show) return null;

  // Modal sencillo (Bootstrap-like)
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
      onClick={() => setShow(false)}
    >
      <div
        className="card shadow"
        style={{ width: 360 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="card-body">
          <h5 className="card-title">Acceso Secreto</h5>
          <p className="text-muted mb-3">Ingresa el PIN para continuar</p>
          <form onSubmit={submitPin}>
            <input
              type="password"
              className="form-control mb-3"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoFocus
            />
            <div className="d-flex gap-2">
              <button className="btn btn-primary w-100" type="submit">
                Desbloquear
              </button>
              <button
                className="btn btn-outline-secondary w-100"
                type="button"
                onClick={() => setShow(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// frontend/src/components/VoiceLogin.jsx
import { useEffect, useRef, useState } from "react";
import { API } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function VoiceLogin({ useJwt = true }) {
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setSupported(false);
      return;
    }
    const rec = new SR();
    rec.lang = "es-ES";
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => {
      setListening(true);
      setTranscript("");
      setError("");
    };
    rec.onresult = (e) => {
      const t = e.results[0][0].transcript;
      setTranscript(t);
      loginWithPhrase(t).catch(() => {});
    };
    rec.onerror = (e) => setError(e.error || "Error de reconocimiento");
    rec.onend = () => setListening(false);

    recognitionRef.current = rec;

    return () => {
      try {
        rec.abort();
      } catch {}
    };
  }, []);

  async function loginWithPhrase(phrase) {
    setError("");
    const url = `${API}${
      useJwt ? "/api/voice-login" : "/api/voice-login-simple"
    }`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // necesario si usas cookie httpOnly
      body: JSON.stringify({ phrase }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.message || "No autorizado");
      return;
    }
    // Éxito → navega a tu página protegida/oculta
    navigate("/secret");
  }

  function start() {
    if (!recognitionRef.current) return;
    setError("");
    setTranscript("");
    try {
      recognitionRef.current.start();
    } catch (e) {
      // algunos navegadores lanzan si ya está escuchando
    }
  }

  if (!supported) {
    return (
      <div className="p-4 border rounded">
        <p>Tu navegador no soporta reconocimiento de voz (Web Speech API).</p>
        <p>Prueba en Chrome/Edge de escritorio o implementa un fallback.</p>
        {/* Fallback manual */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const phrase = new FormData(e.currentTarget).get("phrase");
            loginWithPhrase(phrase);
          }}
        >
          <input name="phrase" placeholder="Escribe la frase secreta" />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded">
      <button onClick={start} disabled={listening}>
        {listening ? "Escuchando..." : "Iniciar login por voz"}
      </button>
      <div style={{ marginTop: 8 }}>
        <strong>Texto reconocido:</strong> {transcript || "—"}
      </div>
      {error && (
        <div style={{ marginTop: 8, color: "crimson" }}>Error: {error}</div>
      )}
    </div>
  );
}

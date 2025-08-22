// frontend/src/pages/VoicePage.jsx
import VoiceLogin from "../components/VoiceLogin";

export default function VoicePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e3c72, #2a5298)", // fondo gradiente
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          padding: "32px",
          textAlign: "center",
          animation: "fadeIn 0.5s ease-in-out",
        }}
      >
        <h1 style={{ marginBottom: "16px", color: "#2a5298" }}>
          🔊 Acceso por Voz
        </h1>
        <p style={{ marginBottom: "24px", color: "#555" }}>
          Pronuncia la frase secreta para ingresar a la zona protegida.
          Asegúrate de permitir el acceso al micrófono.
        </p>

        {/* Componente real de login por voz */}
        <VoiceLogin useJwt={true} />
      </div>

      {/* Animación inline */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

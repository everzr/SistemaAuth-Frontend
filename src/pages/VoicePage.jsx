// frontend/src/pages/VoicePage.jsx
import VoiceLogin from "../components/VoiceLogin";

export default function VoicePage() {
  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h1>Acceso por Voz</h1>
      <VoiceLogin useJwt={true} />
    </div>
  );
}

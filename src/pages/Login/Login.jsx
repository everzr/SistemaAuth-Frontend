// src/pages/Login/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Requiere en frontend/.env: VITE_API_URL=http://localhost:4000

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [yaAutenticado, setYaAutenticado] = useState(false);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

  // Verifica si hay sesión pero NO redirige automáticamente
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API}/api/me`, { credentials: "include" });
        setYaAutenticado(res.ok);
      } catch {
        setYaAutenticado(false);
      }
    })();
  }, []);

  // Tu login clásico (correo/clave). Aquí iría fetch a tu API si lo implementas.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    console.log("Correo:", correo);
    console.log("Password:", password);
    setError("");
    alert("Inicio de sesión exitoso");
    navigate("/proof");
  };

  // OAuth: redirección al backend
  const loginWithGoogle = () => (window.location.href = `${API}/auth/google`);
  const loginWithGithub = () => (window.location.href = `${API}/auth/github`);

  // Logout para limpiar cookie y quedarse en login
  const logout = async () => {
    await fetch(`${API}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setYaAutenticado(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>Bienvenido</h2>
          <p style={styles.subtitle}>Inicia sesión en tu cuenta</p>
        </div>

        {/* Aviso si ya tiene sesión */}
        {yaAutenticado && (
          <div style={styles.sessionAlert}>
            <div style={styles.sessionText}>
              <span>✓ Ya tienes una sesión activa</span>
            </div>
            <div style={styles.sessionButtons}>
              <button
                style={styles.primaryButton}
                onClick={() => navigate("/proof")}
              >
                Continuar
              </button>
              <button style={styles.logoutButton} onClick={logout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {/* Botones OAuth */}
        <div style={styles.oauthSection}>
          <button
            type="button"
            style={styles.googleButton}
            onClick={loginWithGoogle}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            <svg style={styles.googleIcon} viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>
          <button
            type="button"
            style={styles.githubButton}
            onClick={loginWithGithub}
            onMouseEnter={(e) =>
              (e.target.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
          >
            <svg style={styles.githubIcon} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            Continuar con GitHub
          </button>
        </div>

        <div style={styles.divider}>
          <span style={styles.dividerText}>o con correo electrónico</span>
        </div>

        {/* Form tradicional */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="correo" style={styles.label}>
              Correo electrónico
            </label>
            <input
              type="email"
              style={styles.input}
              id="correo"
              placeholder="tu@email.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Contraseña
            </label>
            <input
              type="password"
              style={styles.input}
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#4F46E5")}
              onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
            />
          </div>

          {error && (
            <div style={styles.errorAlert}>
              <svg style={styles.errorIcon} viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={styles.submitButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#3730A3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#4F46E5")}
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Footer Links */}
        <div style={styles.footer}>
          <div style={styles.footerLink}>
            ¿No tienes cuenta?{" "}
            <a href="/register-face" style={styles.link}>
              Crear cuenta
            </a>
          </div>
          <div style={styles.footerLink}>
            <a href="/login-face" style={styles.link}>
              Iniciar sesión con reconocimiento facial
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  loginCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "420px",
    boxShadow:
      "0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#1F2937",
    margin: "0 0 8px 0",
  },
  subtitle: {
    fontSize: "16px",
    color: "#6B7280",
    margin: 0,
  },
  sessionAlert: {
    background: "linear-gradient(135deg, #10B981, #059669)",
    color: "white",
    borderRadius: "12px",
    padding: "16px",
    marginBottom: "24px",
  },
  sessionText: {
    marginBottom: "12px",
    fontSize: "14px",
    fontWeight: "500",
  },
  sessionButtons: {
    display: "flex",
    gap: "8px",
  },
  primaryButton: {
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: "500",
  },
  logoutButton: {
    background: "transparent",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontWeight: "500",
  },
  oauthSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "24px",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    background: "white",
    color: "#374151",
    border: "2px solid #E5E7EB",
    borderRadius: "12px",
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  githubButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    background: "#1F2937",
    color: "white",
    border: "2px solid #1F2937",
    borderRadius: "12px",
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
  },
  githubIcon: {
    width: "20px",
    height: "20px",
  },
  divider: {
    position: "relative",
    textAlign: "center",
    margin: "24px 0",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: 0,
      right: 0,
      height: "1px",
      background: "#E5E7EB",
    },
  },
  dividerText: {
    background: "rgba(255, 255, 255, 0.95)",
    color: "#6B7280",
    padding: "0 16px",
    fontSize: "14px",
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px",
  },
  input: {
    padding: "14px 16px",
    borderRadius: "10px",
    border: "2px solid #E5E7EB",
    fontSize: "16px",
    transition: "all 0.2s",
    background: "white",
    outline: "none",
  },
  errorAlert: {
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    color: "#B91C1C",
    borderRadius: "10px",
    padding: "12px 16px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "500",
  },
  errorIcon: {
    width: "18px",
    height: "18px",
    fill: "#B91C1C",
    flexShrink: 0,
  },
  submitButton: {
    background: "#4F46E5",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "16px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 14px 0 rgba(79, 70, 229, 0.3)",
    marginTop: "8px",
  },
  footer: {
    textAlign: "center",
    marginTop: "32px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footerLink: {
    fontSize: "14px",
    color: "#6B7280",
  },
  link: {
    color: "#4F46E5",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.2s",
  },
};

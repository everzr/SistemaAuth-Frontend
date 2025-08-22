// src/pages/Secret/SecretPage.jsx
import React from "react";

export default function SecretPage() {
  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Zona Ultra Secreta</h1>
      <p className="lead text-muted text-center mb-5">
        Bienvenido a la sección más oculta del sistema. Aquí se encuentran datos
        experimentales, accesos especiales y prototipos en desarrollo.
      </p>

      {/* Panel de Voz */}
      <section className="mb-5">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="card-title">🔊 Acceso por Voz</h5>
            <p className="card-text">
              Pronuncia la <strong>frase secreta</strong> para validar tu
              identidad. (Ejemplo de integración: botón que graba micrófono y
              envía la frase al backend).
            </p>
            <button className="btn btn-primary">Probar Acceso por Voz</button>
          </div>
        </div>
      </section>

      {/* Datos confidenciales */}
      <section className="mb-5">
        <h3 className="mb-3">Reportes Clasificados</h3>
        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Proyecto X</h5>
                <p className="card-text">
                  Resultados preliminares de la IA de reconocimiento facial.
                  Precisión actual: <strong>92.5%</strong>.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Acceso Restringido</h5>
                <p className="card-text">
                  Lista de usuarios con permisos especiales para zonas ocultas.
                  Última actualización: <strong>hace 2 días</strong>.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Prototipo Beta</h5>
                <p className="card-text">
                  Sistema de autenticación híbrida (PIN + voz + rostro). Estado:{" "}
                  <span className="text-warning">En pruebas</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla de logs */}
      <section>
        <h3 className="mb-3">Últimos intentos de acceso</h3>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Método</th>
              <th>Resultado</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin@demo.com</td>
              <td>KONAMI + PIN</td>
              <td className="text-success">Acceso concedido</td>
              <td>2025-08-21 14:32</td>
            </tr>
            <tr>
              <td>invitado</td>
              <td>Voz</td>
              <td className="text-danger">Denegado</td>
              <td>2025-08-20 09:17</td>
            </tr>
            <tr>
              <td>root</td>
              <td>PIN</td>
              <td className="text-success">Acceso concedido</td>
              <td>2025-08-19 22:51</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

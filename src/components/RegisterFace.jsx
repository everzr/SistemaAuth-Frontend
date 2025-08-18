import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { fetchToken } from "../utils/api";

const RegisterFace = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      ]);
      startVideo();
      setLoading(false);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => videoRef.current.srcObject = stream)
      .catch(err => console.error('Error al acceder a la cámara', err));
  };

 const handleRegister = async () => {
  const result = await faceapi
    .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();

  if (!result) return alert('❌ No se detectó el rostro');

const descriptor = Array.from(result.descriptor);
  const data = await fetchToken("http://localhost:4000/api/login/register-face", {
    method: "POST",
    body: JSON.stringify({ nombre, email, descriptor }),
  });

  if (data) alert(data.message || "Registrado correctamente");
};


return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '500px' }}>
        <h4 className="mb-4 text-center">📷 Registrar Rostro</h4>

        <div className="text-center mb-3">
          {loading
            ? <p className="text-muted">Cargando modelos...</p>
            : <video ref={videoRef} autoPlay width="320" height="240" className="rounded border" />
          }
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleRegister}
          disabled={loading}
        >
          Registrar
        </button>
      </div>
    </div>
  );
};

export default RegisterFace;

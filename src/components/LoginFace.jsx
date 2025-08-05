import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const LoginFace = () => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [nombre, setNombre] = useState('');

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
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }) // 👈 Selfie camera
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => console.error('Error al acceder a la cámara', err));
  };

  const handleLogin = async () => {
    const result = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!result) return alert('❌ No se detectó el rostro');

    const descriptor = Array.from(result.descriptor);

    const response = await fetch('http://localhost:4000/api/face/login-face', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descriptor }),
    });

    const data = await response.json();

    if (data.success) {
      setIsAuthorized(true);
      setNombre(data.nombre);
    } else {
      alert(data.message || '❌ No reconocido');
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body text-center">
              <h3 className="card-title mb-4">Iniciar sesión con rostro</h3>

              {loading ? (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando modelos...</span>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  width="100%"
                  height="auto"
                  className="rounded mb-3 border"
                  style={{ transform: 'scaleX(-1)' }} // 👈 Espejo
                />
              )}

              <button
                onClick={handleLogin}
                disabled={loading}
                className="btn btn-primary w-100"
              >
                Verificar rostro
              </button>

              {isAuthorized && (
                <div className="alert alert-success mt-3">
                  ✅ Bienvenido, <strong>{nombre}</strong>!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginFace;

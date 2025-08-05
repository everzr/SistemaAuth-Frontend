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
    navigator.mediaDevices.getUserMedia({ video: {} })
      .then(stream => videoRef.current.srcObject = stream)
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
    <div>
      <h2>Iniciar sesión con rostro</h2>
      {loading ? <p>Cargando modelos...</p> : <video ref={videoRef} autoPlay width="320" height="240" />}
      <br />
      <button onClick={handleLogin} disabled={loading}>Verificar</button>
      {isAuthorized && <p>✅ Bienvenido, {nombre}!</p>}
    </div>
  );
};

export default LoginFace;

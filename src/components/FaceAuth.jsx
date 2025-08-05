// src/components/FaceLogin.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceAuth = () => {
  const videoRef = useRef(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadModels = async () => {
    try {
      const MODEL_URL = '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
      ]);
      console.log("✅ Modelos cargados");
      setLoading(false);
      startVideo();
    } catch (err) {
      console.error("❌ Error al cargar modelos o iniciar cámara:", err);
    }
  };

  loadModels();
}, []);

  const startVideo = () => {
  navigator.mediaDevices
    .getUserMedia({ video: {} })
    .then((stream) => {
      console.log("🎥 Cámara iniciada");
      videoRef.current.srcObject = stream;
    })
    .catch((err) => {
      console.error('❌ Error al acceder a la cámara:', err);
    });
};


  const handleLogin = async () => {
    const referenceImage = await faceapi.fetchImage('/reference.jpg'); // imagen de referencia
    const referenceDesc = await faceapi
      .detectSingleFace(referenceImage)
      .withFaceLandmarks()
      .withFaceDescriptor();

    const liveDesc = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!referenceDesc || !liveDesc) {
      alert('No se detectó la cara correctamente');
      return;
    }

    const distance = faceapi.euclideanDistance(referenceDesc.descriptor, liveDesc.descriptor);
    console.log('Distancia:', distance);

    if (distance < 0.6) {
      alert('✅ Usuario reconocido');
      setIsAuthorized(true);

      // Aquí puedes enviar al backend si deseas registrar la sesión
      /*
      await fetch('http://localhost:3001/api/login-face', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: 'UsuarioReconocido' }),
      });
      */
    } else {
      alert('❌ Usuario no reconocido');
    }
  };

  return (
    <div>
      <h2>Iniciar sesión con reconocimiento facial</h2>
      {loading ? <p>Cargando modelos...</p> : <video ref={videoRef} autoPlay width="320" height="240" />}
      <br />
      <button onClick={handleLogin} disabled={loading}>
        Verificar rostro
      </button>
      {isAuthorized && <p>✅ ¡Sesión iniciada con éxito!</p>}
    </div>
  );
};

export default FaceAuth;

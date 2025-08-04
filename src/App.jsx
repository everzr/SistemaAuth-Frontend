import { useEffect, useState } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('Cargando...');

  useEffect(() => {
    fetch('http://localhost:4000/api/proof/prueba')
      .then(res => res.text())
      .then(data => setMensaje(data))
      .catch(() => setMensaje('Error al conectar con la API'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Respuesta de la API:</h1>
      <p>{mensaje}</p>
    </div>
  );
}

export default App;

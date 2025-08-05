import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // ✅ INICIALIZAR

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!correo || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    console.log('Correo:', correo);
    console.log('Password:', password);
    setError('');
    alert('Inicio de sesión exitoso');
    navigate("/proof");
  };
return (
     <div className="d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input type="email" className="form-control" id="correo" placeholder="Ingresa tu correo" value={correo} onChange={(e) => setCorreo(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
        <div className="text-center mt-3">
          <small>¿No tienes cuenta? <a href="/register-face">Regístrate</a></small>
        </div>
        <div className="text-center mt-3">
          <small> <a href="/login-face">Iniciar Sesion con cara</a></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
// Login.jsx
import React, { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Realiza la solicitud a tu API de autenticación (reemplaza con la URL correcta)
      const response = await fetch('http://localhost/apishopping/conexion.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Autenticación exitosa
        setMessage('');

        // Almacena la información del usuario en localStorage
        localStorage.setItem('userData', JSON.stringify({ email: data.email, rol: data.rol }));

        if (data.email )
        // Redirige según el rol
        if (data.rol === 'admin') {
          // Redirige al dashboard de administrador
          window.location.href = '/';
        } else {
          // Redirige a la página de usuario normal
          window.location.href = '/user';
        }
      } else {
        // Mostrar mensaje de error
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error al realizar la autenticación', error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Iniciar sesión</button>
      {message && <p>{message}</p>}
    </div>
  );
};

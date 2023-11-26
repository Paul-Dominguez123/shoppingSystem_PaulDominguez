// Home.jsx
import React, { useEffect, useState } from 'react';

export const Home = () => {
      // Verifica si el usuario ha iniciado sesión
      const isUserLoggedIn = !!localStorage.getItem('userData');
      const [userEmail, setUserEmail] = useState('');
    
      useEffect(() => {
        // Obtén la información del usuario del localStorage
        const userDataString = localStorage.getItem('userData');
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          // Actualiza el estado con el email del usuario
          setUserEmail(userData.email);
        }
      }, []);
      

  return (
    <div>
      <h2>Home</h2>
      {userEmail && <p>Email del usuario: {userEmail}</p>}
    </div>
  );
};


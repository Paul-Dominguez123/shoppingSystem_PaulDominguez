import React, { useState, useEffect } from 'react';

export const UpdateUser = ({ user, onUpdate }) => {
    // Manejamos el estado interno del componente
  const [updatedUser, setUpdatedUser] = useState({
    user_ID: 0,
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    rol_user: '',
  });

  // Cuando el componente recibe un nuevo usuario, actualizamos el estado interno
  useEffect(() => {
    setUpdatedUser({
        user_ID: user.user_ID || 0,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        address: user.address || '',
        rol_user: user.rol_user || '',
      });
  }, [user]);

  // Manejamos cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Manejamos la actualización cuando se hace clic en el botón
  const handleUpdate = () => {
    // Verificamos que el usuario no sea nulo antes de intentar actualizar
    if (user) {
      onUpdate(updatedUser);
    }
  };

  return (
    <div>
      <h2>Actualizar Usuario</h2>
      <form>
        <label htmlFor="first_name">Nombre:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={updatedUser.first_name}
          onChange={handleChange}
        />

        <label htmlFor="last_name">Apellido:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={updatedUser.last_name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={updatedUser.email}
          onChange={handleChange}
        />

        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={updatedUser.address}
          onChange={handleChange}
        />

        <label htmlFor="rol_user">Rol:</label>
        <input
          type="text"
          id="rol_user"
          name="rol_user"
          value={updatedUser.rol_user}
          onChange={handleChange}
        />

        <button type="button" onClick={handleUpdate}>
          Actualizar Usuario
        </button>
      </form>
    </div>
  );
};
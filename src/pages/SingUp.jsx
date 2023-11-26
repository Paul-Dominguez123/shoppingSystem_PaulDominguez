import React, { useState } from 'react';

export const SingUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    rol_user: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/apishopping/guardarUsuario.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data); // Puedes manejar la respuesta según tus necesidades
    } catch (error) {
      console.error('Error al enviar datos:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Constraseña:
        <input type="password" name="last_name" value={formData.last_name} onChange={handleChange} />
      </label>
      <br />
      
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <label>
        Role:
        <input type="text" name="rol_user" value={formData.rol_user} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Guardar</button>
    </form>
  );
};

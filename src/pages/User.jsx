import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { UpdateUser } from '../components/UpdateUser';
import { Table, Button, Modal, Form } from 'react-bootstrap';

export const User = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Nueva función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  // Mover la función fetchUsuarios al ámbito del componente
  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost/apishopping/mostrarUsuarios.php');
      const data = await response.json();

      if (response.ok) {
        setUsuarios(data.users || []);
      } else {
        setMessage(data.message || 'Error al cargar los usuarios');
      }
    } catch (error) {
      console.error('Error al cargar los usuarios', error);
      setMessage('Error al cargar los usuarios');
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleUpdate = async (updatedUser) => {
    try {
      const response = await fetch('http://localhost/apishopping/actualizarUsuarios.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        handleCloseModal();
        // Llamamos a la función fetchUsuarios desde aquí
        fetchUsuarios();
      } else {
        console.error('Error detallado:', data.message);
      }
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
    }
  };

 

  return (
    <div>
      <div>
        <h2>Mostrar Usuarios</h2>
        {usuarios.length > 0 ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.user_ID}>
                    <td>{usuario.user_ID}</td>
                    <td>{usuario.first_name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol_user}</td>
                    <td>
                      <Button variant="info" onClick={() => openModal(usuario)}>
                        Editar
                      </Button>{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
        {message && <p>{message}</p>}
      </div>
      {showModal && (
        <Modal2>
          <UpdateUser user={selectedUser} onUpdate={handleUpdate} />
          <CloseButton onClick={closeModal}>Cerrar Formulario</CloseButton>
        </Modal2>
      )}
    </div>
  );
};

const Button1 = styled.button`
  height: 57px;
  width: 300px;
  background-color: #a4cba1;
  border: 0px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: blue;
    color: white;
  }
`;

const DerechaIzquierda = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Modal2 = styled.div`
  background-color: rgb(205, 168, 164);
  width: 40vw;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${DerechaIzquierda} 1.5s ease-in-out;
  position: fixed;
  top: 5%;
  left: 30%;
  border-radius: 10px;
  border: 0px;
  @media (max-width: 768px) {
    width: 70vw;
    height: 30vh;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";




export const Navar=()=>{
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
  const handleLogout = () => {
    // Elimina la información del usuario del localStorage al cerrar sesión
    localStorage.removeItem('userData');
    // Redirige a la página de inicio de sesión o a la página de inicio
    window.location.href = '/logIn';
  };

  return (
    <ConteinerNav>
      <Title>AMAZON</Title>
      <Ul>
         {/* Condicionalmente renderiza los enlaces de inicio de sesión o cierre de sesión */}
         {isUserLoggedIn ? (
          <>
            <Li>
              <P>Email: {userEmail}</P>
            </Li>
            <Li>
              <Button1 onClick={handleLogout}>Cerrar sesión</Button1>
            </Li>
          </>
    
        ) : (
          <>
            <Li>
              <NavLink to="/logIn">Iniciar sesión</NavLink>
            </Li>
            <Li>
              <NavLink to="/singUp">Registrarse</NavLink>
            </Li>
          </>
        )}
      </Ul>
    </ConteinerNav>
  );
}

const Button1 = styled.button`
  height: 30px;
  width: 150px;
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

const ConteinerNav = styled.nav`
  background-color: #333;
  width: 100vw;
  height:50px;
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;

const Title = styled.h1`
  margin: 0px;
  color: #fff;
`;

const P=styled.p`
  color :white;
  paddin-top:20px;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0px;
  margin: 0px;
  display: flex;
`;

const Li = styled.li`
  padding-right: 50px;
  margin:0px
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding-right:30px;
`;
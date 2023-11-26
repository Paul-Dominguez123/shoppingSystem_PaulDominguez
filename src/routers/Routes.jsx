import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navar } from "../components/Navar";
import { Sidebar } from "../components/Sidebar";
import { Home } from "../pages/home"
import { Products } from "../pages/Products"
import { User } from "../pages/user"
import { Login } from "../pages/Login"
import { SingUp } from "../pages/SingUp"
import styled from "styled-components";
import { Category } from "../pages/Category";


export const MyRoutes = () => {
  return (
    <Router>
          
      
        <Navar/>
        
     
        <Conteiner1>
        <Sidebar/>
        <Routes>
          <Route path="/category" element={<Category/>} />
            <Route path="/" element={<Home />} />
             <Route path="/products" element={<Products />} />
             <Route path="/user" element={<User />} />
             
            
            <Route path="/logIn" element={<Login />} />
            <Route path="/singUp" element={<SingUp />} />
        </Routes>
        </Conteiner1>
      </Router>
    )
  }
  const Conteiner=styled.div`
    display:flex;
    margin:0px;
    
  `;
  const Conteiner1=styled.div`
    display:flex;
    margin:0px;
  `;

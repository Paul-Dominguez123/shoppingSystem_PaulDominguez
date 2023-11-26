import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components'



export const CategoriesTable = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState({ name: '', type: '' });
    const [selectedCategory, setSelectedCategory] = useState(null);

    const[showModal,setShowModal]=useState(false);

    function openModal(){
        setShowModal(true);
      }
      const closeModal=()=>{
        setShowModal(false);
      } 

  
    useEffect(() => {
      // Llamar a la API para obtener las categorías al cargar el componente
      fetch('http://localhost/apishopping/crudCategorias.php')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setCategories(data.data);
          } else {
            console.error('Error:', data.message);
          }
        })
        .catch(error => console.error('Error:', error));
    }, []);
  
    const handleAddCategory = async () => {
      try {
        const response = await fetch('http://localhost/apishopping/crudCategorias.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newCategory),
        });
  
        const data = await response.json();
        if (data.success) {
          setCategories([...categories, newCategory]);
          setNewCategory({ name: '', type: '' });
        } else {
          console.error('Error adding category:', data.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    const handleUpdateCategory = async () => {
      if (selectedCategory) {
        try {
          const response = await fetch('http://localhost/apishopping/crudCategorias.php', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedCategory),
          });
  
          const data = await response.json();
          if (data.success) {
            const updatedCategories = categories.map(category =>
              category.category_ID === selectedCategory.category_ID ? selectedCategory : category
            );
            setCategories(updatedCategories);
            setSelectedCategory(null);
          } else {
            console.error('Error updating category:', data.message);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      }
    };
  
    const handleDeleteCategory = async (category_ID) => {
      try {
        const response = await fetch('http://localhost/apishopping/crudCategorias.php', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ category_ID }),
        });
  
        const data = await response.json();
        if (data.success) {
          const updatedCategories = categories.filter(category => category.category_ID !== category_ID);
          setCategories(updatedCategories);
          setSelectedCategory(null);
        } else {
          console.error('Error deleting category:', data.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    return (
      <div>
        <h2>Categories</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {categories.map(category => (
    <tr key={category.category_ID}>
      <td>{category.category_ID}</td>
      <td>{category.name}</td>
      <td>{category.type}</td>
      <td>
        <button onClick={() => setSelectedCategory(category)}>Edit</button>
        <button onClick={() => handleDeleteCategory(category.category_ID)}>Delete</button>
      </td>
    </tr>
  ))}
</tbody>

        </table>
  
        <Button1 onClick={openModal}>Añadir</Button1>
        {showModal && <Modal2>
            
            <h3>Add Category</h3>
        <label>
          Name:
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Type:
          <input
            type="text"
            value={newCategory.type}
            onChange={(e) => setNewCategory({ ...newCategory, type: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleAddCategory}>Add Category</button>
        <CloseButton onClick={closeModal}>
            cerrar Formulario
          </CloseButton>
            
            </Modal2>}
        
        <h3>Update Category</h3>
        {selectedCategory && (
          <div>
            <label>
              Name:
              <input
                type="text"
                value={selectedCategory.name}
                onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
              />
            </label>
            <br />
            <label>
              Type:
              <input
                type="text"
                value={selectedCategory.type}
                onChange={(e) => setSelectedCategory({ ...selectedCategory, type: e.target.value })}
              />
            </label>
            <br />
            <button onClick={handleUpdateCategory}>Update Category</button>
          </div>
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
  cursor:pointer;
  transition:background-color 0.5s ease;

  &:hover{
    background-color:blue;
    color:white;
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
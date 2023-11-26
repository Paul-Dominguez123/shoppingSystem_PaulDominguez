import React, { useState, useEffect } from 'react';
import styled, {keyframes} from 'styled-components';

export const Products = () => {
    const [productCategory_ID, setProductCategory_ID] = useState('');

  const [productName, setProductName] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState('');
  const [message, setMessage] = useState('');

  const [products, setProducts] = useState([]);
  const [message1, setMessage1] = useState('');

  const[showModal,setShowModal]=useState(false);

  function displayModal(){
    setShowModal(!showModal);
  }
  

 
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost/apishopping/mostrarProducto.php');
        const data = await response.json();

        if (response.ok) {
          setProducts(data.products || []);
        } else {
          setMessage(data.message || 'Error al cargar los productos');
        }
      } catch (error) {
        console.error('Error al cargar los productos', error);
        setMessage('Error al cargar los productos');
      }
    };

    fetchProductos();
  }, []);
  

  const handleSaveProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('category_ID', productCategory_ID)
      formData.append('name', productName);
      formData.append('image', productImage);
      formData.append('price', productPrice);
      

      const response = await fetch('http://localhost/apishopping/guardarProducto.php', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Producto guardado exitosamente');
      } else {
        setMessage('Error al guardar el producto');
        console.error('Error detallado:', data.message);
      }
    } catch (error) {
      console.error('Error al guardar el producto', error);
    }
  };

  return (


    <div>

<Button1 onClick={displayModal}>Añadir Producto</Button1>
        {showModal && <Modal>
            <h2>Guardar Producto</h2>
            <div>
            <label htmlFor="productCategory_ID">Category ID</label>
<input
  type="number"
  id="category_ID"
  value={productCategory_ID}
  onChange={(e) => setProductCategory_ID(e.target.value)}
/>
      </div>

      <div>
        <label htmlFor="productName">Nombre:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="productImage">Imagen:</label>
        <input
          type="file"
          id="productImage"
          accept="image/*"
          onChange={(e) => setProductImage(e.target.files[0])}
        />
        {productImage && (
          <img
            src={URL.createObjectURL(productImage)}
            alt="Vista previa de la imagen"
            style={{ maxWidth: '200px', marginTop: '10px' }}
          />
        )}
      </div>
      <div>
        <label htmlFor="productPrice">Precio:</label>
        <input
          type="text"
          id="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
      </div>
      <button onClick={handleSaveProduct}>Guardar Producto</button>
      {message && <p>{message}</p>}
          
          </Modal>}
      

      <div>
      <h2>Mostrar Productos</h2>
      {products.length > 0 ? (
        <ul>
        {products.map(productos => (
          <li key={productos.product_ID}>
            
            <img src={productos.image} alt={productos.name} style={{ maxWidth: '100px' }}/>
            <p>{productos.name}</p>
            <p>Precio: {productos.price}</p>
          </li>
        ))}
      </ul>
      ) : (
        <p>No hay productos disponibles.</p>
      )}
      {message && <p>{message}</p>}
    </div>

    </div>

    
  );
};

const slideIn=keyframes`
  from{
    transform:translateY(-100%);
  }
  to{
    transform:tranlateY(0);
  }
`;

const Button1=styled.button`
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

const Modal = styled.div`
  background-color:rgb(118, 211, 28);
  width: 700px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 10px;
  border: 0px;
  animation:${slideIn} 1.5s ease-in-out;
  @media(max-width:700px){
    width:100vw;
    background-color:rgb(118, 211, 28);
  
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 10px;
  border: 0px;
  
  }
`;
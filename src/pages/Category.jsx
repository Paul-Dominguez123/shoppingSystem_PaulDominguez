import React, { useState } from 'react';
import { CategoriesTable } from '../components/CategoriesTable';


export const Category = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('name', name);
      formData.append('type', type);
  
      try {
        const response = await fetch('http://localhost/apishopping/guardarCategory.php', {
          method: 'POST',
          body: formData,
        });
  
        const data = await response.json();
        if (data.success) {
          console.log('Category added successfully!');
        } else {
          console.error('Error adding category:', data.message);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };
  
    return (
        <div>
      
      <CategoriesTable/>
      </div>
    );
};

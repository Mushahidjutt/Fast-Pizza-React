import React, { useState } from 'react';

const ProductForm = () => {
  // Step 1: Initial list with ids
  const [list, setList] = useState([
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ]);

  // Step 2: Handle delete function
  const handleDelete = (id) => {
    const updatedList = list.filter((product) => product.id !== id);
    setList(updatedList);
    console.log(updatedList, "list updated after delete");
  };

  // Step 3: Handle update function
  const handleUpdate = (id, newName, newPrice) => {
    const updatedList = list.map((product) => {
      if (product.id === id) {
        return { ...product, name: newName, price: newPrice }; // Update the item
      }
      return product; // Keep other items unchanged
    });
    setList(updatedList);
    console.log(updatedList, "list updated after update");
  };

  return (
    <div>
      <h2>Product List</h2>

      {/* Update product button example */}
      <button onClick={() => handleUpdate(1, 'Updated Product 1', 150)}>
        Update Product 1
      </button>

      <ul>
        {list.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <button
              onClick={() => handleUpdate(product.id, 'Updated ' + product.name, product.price + 10)}
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;

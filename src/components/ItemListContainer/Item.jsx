// src/components/ItemListContainer/Item.jsx
import React from "react";

const Item = ({ product }) => {
  return (
    <div className="item-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">${product.price}</p>
      <button>Agregar al carrito</button>
    </div>
  );
};

export default Item;

// src/components/ItemListContainer/ItemList.jsx
import React from "react";
import Item from "./Item";

const ItemList = ({ products }) => {
  return (
    <div className="item-list">
      {products.map((p) => (
        <Item key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ItemList;

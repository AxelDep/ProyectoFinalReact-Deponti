import { useState } from "react";

function ItemCount({ stock = 10, initial = 1, onAdd }) {
  const [quantity, setQuantity] = useState(initial);

  const handleIncrease = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAdd = () => {
    onAdd(quantity);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1rem" }}>
      <button onClick={handleDecrease}>-</button>
      <span>{quantity}</span>
      <button onClick={handleIncrease}>+</button>
      <button onClick={handleAdd} style={{ backgroundColor: "#00ADB5", color: "white", border: "none", padding: "0.5rem 1rem", borderRadius: "6px" }}>
        Agregar
      </button>
    </div>
  );
}

export default ItemCount;

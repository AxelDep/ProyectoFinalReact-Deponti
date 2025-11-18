import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import ItemCount from "./ItemCount"; // ruta relativa

function ItemDetail({ product }) {
  const { addItem } = useContext(CartContext);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (quantity) => {
    addItem({ ...product }, quantity);
    setAdded(true);
  };

  return (
    <div className="item-detail">
      <img src={product.image} alt={product.name} style={{ width: "100%", maxWidth: "300px", objectFit: "contain" }} />
      <h2>{product.name}</h2>
      <p>💲{product.price}</p>
      {!added ? (
        <ItemCount stock={product.stock} initial={1} onAdd={handleAddToCart} />
      ) : (
        <p style={{ color: "#00ADB5", marginTop: "1rem" }}>Producto agregado al carrito ✅</p>
      )}
    </div>
  );
}

export default ItemDetail;

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cart, removeItem, clearCart, totalPrice } = useContext(CartContext);

  if(cart.length === 0) {
    return <p style={{textAlign:"center", marginTop:"2rem"}}>El carrito está vacío.</p>;
  }

  return (
    <div className="cart-container">
      <h2>Carrito de compras</h2>

      <ul className="cart-list">
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image || "https://via.placeholder.com/150"} alt={item.name} />
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>Cantidad: <strong>{item.quantity}</strong></p>
              <p>Subtotal: <strong>${item.price * item.quantity}</strong></p>
            </div>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>Total: ${totalPrice()}</h3>
      <div className="cart-actions">
        <button onClick={clearCart}>Vaciar carrito</button>
        <Link to="/checkout"><button>Finalizar compra</button></Link>
      </div>
    </div>
  );
}

export default Cart;

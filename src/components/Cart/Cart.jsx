import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutForm from "../Checkout/CheckoutForm";

const Cart = () => {
  const { cart, totalPrice, removeItem, clearCart } = useContext(CartContext);
  const [checkout, setCheckout] = useState(false);

  if (checkout) return <CheckoutForm />;

  if (!cart.length)
    return <p style={{ textAlign: "center" }}>Tu carrito está vacío</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      {cart.map(item => (
        <div key={item.id} style={{ display: "flex", marginBottom: "1rem" }}>
          <img src={item.image} alt={item.name} style={{ width: "80px", marginRight: "1rem" }} />
          <div>
            <h4>{item.name}</h4>
            <p>{item.quantity} x ${item.price}</p>
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </div>
        </div>
      ))}
      <h3>Total: ${totalPrice()}</h3>
      <button onClick={() => setCheckout(true)}>Finalizar Compra</button>
      <button onClick={clearCart} style={{ marginLeft: "1rem" }}>
        Vaciar Carrito
      </button>
    </div>
  );
};

export default Cart;

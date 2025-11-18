import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function Cart() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }

    // Creamos la orden
    const order = {
      id: Date.now(), // ID único usando timestamp
      date: new Date().toLocaleString(),
      items: cart,
      total: totalPrice,
    };

    // Guardamos en localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`Compra realizada con éxito. Total: $${totalPrice}`);

    // Limpiamos carrito
    clearCart();
  };

  if (cart.length === 0) return <p>El carrito está vacío.</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", textAlign: "center" }}>
      <h2>Mi Carrito</h2>
      {cart.map(item => (
        <div key={item.id} style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
          <p>{item.name} - {item.quantity} x ${item.price}</p>
        </div>
      ))}
      <h3>Total: ${totalPrice}</h3>
      <button 
        onClick={handleCheckout} 
        style={{ marginTop: "1rem", padding: "10px 20px", background: "#00ADB5", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
      >
        Finalizar Compra
      </button>
    </div>
  );
}

export default Cart;

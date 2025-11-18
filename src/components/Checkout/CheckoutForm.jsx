// src/components/CheckoutForm/CheckoutForm.jsx
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState(null);

  const handleChange = e => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!buyer.name || !buyer.email || !buyer.phone) {
      alert("Completa todos los campos");
      return;
    }

    const newOrder = {
      id: Date.now(),
      buyer,
      items: cart,
      total: totalPrice(),
      date: new Date().toLocaleString(),
    };

    // Guardar orden en localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...orders, newOrder]));

    setOrderId(newOrder.id);
    clearCart();
  };

  if (orderId) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Compra finalizada ✅</h2>
        <p>Tu ID de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "2rem auto", textAlign: "center" }}
    >
      <h2>Finalizar Compra</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre completo"
        value={buyer.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={buyer.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={buyer.phone}
        onChange={handleChange}
        required
      />
      <button type="submit" style={{ marginTop: "1rem" }}>
        Finalizar Compra
      </button>
    </form>
  );
};

export default CheckoutForm;

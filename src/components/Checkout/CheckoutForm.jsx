// src/components/Checkout/CheckoutForm.jsx
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);

  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    setError(null);

    const order = {
      id: Date.now().toString(), // ID único simple
      buyer,
      items: cart.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
      total: totalPrice(),
      date: new Date().toISOString()
    };

    // Guardar en LocalStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    setOrderId(order.id);
    clearCart();
  };

  if (orderId) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>¡Compra realizada con éxito!</h2>
        <p>Tu número de orden es: <strong>{orderId}</strong></p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", textAlign: "center" }}>
      <h2>Checkout</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "0.8rem", marginTop: "1rem" }}
      >
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
          type="text"
          name="phone"
          placeholder="Teléfono"
          value={buyer.phone}
          onChange={handleChange}
          required
        />
        <button type="submit">Finalizar compra</button>
      </form>
    </div>
  );
}

export default CheckoutForm;

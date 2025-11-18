// src/components/Checkout/CheckoutForm.jsx
import React, { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    setLoading(true);
    setError(null);

    const order = {
      buyer,
      items: cart.map(({ id, name, price, quantity }) => ({
        id, name, price, quantity
      })),
      total: totalPrice(),
      date: serverTimestamp()
    };

    try {
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);
      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      console.error("Error creando la orden:", err);
      setError("Ocurrió un error al generar la orden.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Generando orden...</p>;

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
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.8rem", marginTop: "1rem" }}>
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
};

export default CheckoutForm;

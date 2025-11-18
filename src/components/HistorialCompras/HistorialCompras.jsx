import { useEffect, useState } from "react";

function HistorialCompras() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  if (orders.length === 0) return <p style={{ textAlign: "center", marginTop: "2rem" }}>No se han realizado compras aún.</p>;

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Historial de Compras</h2>
      {orders.map(order => (
        <div key={order.id} style={{ border: "1px solid #ccc", borderRadius: "10px", marginBottom: "1rem", padding: "1rem" }}>
          <p><strong>ID de orden:</strong> {order.id}</p>
          <p><strong>Fecha:</strong> {order.date}</p>
          <p><strong>Total:</strong> ${order.total}</p>
          <div>
            <strong>Productos:</strong>
            <ul>
              {order.items.map(item => (
                <li key={item.id}>{item.name} - {item.quantity} x ${item.price}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default HistorialCompras;

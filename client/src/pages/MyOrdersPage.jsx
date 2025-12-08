import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/MyOrders.css";

const API_URL = import.meta.env.VITE_API_URL;

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/orders`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("No se pudieron cargar los pedidos");
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error al cargar pedidos:", err);
        setError(err.message || "Error al cargar pedidos");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const precioARS = (valor) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(valor);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStateLabel = (state) => {
    const labels = {
      pendiente: "Pendiente",
      confirmado: "Confirmado",
      enviado: "Enviado",
    };
    return labels[state] || state;
  };

  if (loading) {
    return (
      <div className="orders-page">
        <h2>Mis pedidos</h2>
        <p style={{ textAlign: "center", padding: "2rem" }}>Cargando pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <h2>Mis pedidos</h2>
        <p style={{ textAlign: "center", color: "red", padding: "2rem" }}>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders-page">
        <h2>Mis pedidos</h2>
        <p style={{ textAlign: "center", padding: "2rem" }}>
          Aún no has realizado ningún pedido.
        </p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2 className="orders-title">Mis pedidos</h2>
      
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <p className="order-date">
                  <strong>Fecha:</strong> {formatDate(order.createdAt)}
                </p>
                <p className="order-id">
                  <strong>ID:</strong> {order._id}
                </p>
              </div>
              <div className={`order-state order-state--${order.state}`}>
                {getStateLabel(order.state)}
              </div>
            </div>

            <div className="order-items">
              <h4>Productos:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index} className="order-item">
                    <span className="order-item-name">{item.name}</span>
                    <span className="order-item-details">
                      {item.amount} × {precioARS(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-total">
              <strong>Total:</strong> 
              <span className="order-total-amount">{precioARS(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

const CartPanel = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) => {
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function precioARS(valor) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(valor);
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.precio * item.quantity), 0);
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find(i => i._id === itemId);
    if (item) {
      onUpdateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find(i => i._id === itemId);
    if (item && item.quantity > 1) {
      onUpdateQuantity(itemId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      onRemoveItem(itemId);
    }
  };

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      onClose();
      return;
    }

    if (cartItems.length === 0) {
      setError("El carrito está vacío");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const items = cartItems.map(item => ({
        productId: item._id,
        name: item.nombre,
        price: item.precio,
        amount: item.quantity,
      }));

      const total = calculateTotal();

      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          items,
          total,
          state: "pendiente",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al crear el pedido");
      }

      // Limpiar carrito después de pedido exitoso
      if (typeof onClearCart === "function") {
        onClearCart();
      }

      alert("¡Pedido realizado con éxito! Puedes ver tus pedidos en 'Mis Pedidos'");
      onClose();
      navigate("/mis-pedidos");
    } catch (err) {
      console.error("Error al finalizar compra:", err);
      setError(err.message || "No se pudo completar el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className={`cart-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      )}

      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-drawer__header">
          <h2>Mi carrito</h2>
          <button
            className="cart-drawer__close"
            aria-label="Cerrar carrito"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <p className="cart-empty">Tu carrito está vacío.</p>
          ) : (
            <ul className="cart-items-list">
              {cartItems.map((item) => {
                const urlImg = `https://tomasvolpini.github.io/ITBA-Muebleria-Jota/server${item.imagen}`;

                return (
                  <li key={item._id} className="cart-item">
                    <img
                      src={urlImg}
                      alt={item.nombre}
                      className="cart-item__image"
                    />
                    <div className="cart-item__details">
                      <p className="cart-item__name">{item.nombre}</p>
                      <p className="cart-item__price">{precioARS(item.precio)}</p>
                    </div>
                    <div className="cart-item__quantity">
                      <button
                        className="cart-item__btn"
                        onClick={() => handleDecrement(item._id)}
                        aria-label="Disminuir cantidad"
                      >
                        −
                      </button>
                      <span className="cart-item__count">{item.quantity}</span>
                      <button
                        className="cart-item__btn"
                        onClick={() => handleIncrement(item._id)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            {error && (
              <p style={{ color: "red", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                {error}
              </p>
            )}
            <div className="cart-summary__total">
              <strong>Total:</strong>
              <span className="cart-summary__amount">
                {precioARS(calculateTotal())}
              </span>
            </div>
            {!isAuthenticated ? (
              <div>
                <p style={{ fontSize: "0.9rem", marginBottom: "0.75rem", color: "#5a2b15" }}>
                  Debes iniciar sesión para finalizar tu compra
                </p>
                <button 
                  className="btn-checkout"
                  onClick={handleCheckout}
                >
                  Ir a iniciar sesión
                </button>
              </div>
            ) : (
              <button 
                className="btn-checkout"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Finalizar compra"}
              </button>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export default CartPanel;
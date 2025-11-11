import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetail.css";

const API_URL = "https://itba-muebleria-jota.onrender.com/api/products";

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error("Error al cargar el producto:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleClose = () => {
    navigate("/productos");
  };

  const handleAddToCart = () => {
    if (product) {
      onAddToCart(product);
    }
  };

  const precioARS = (valor) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(valor);
  };

  // Estado de carga
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", minHeight: "60vh" }}>
        <p>Cargando producto...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", minHeight: "60vh" }}>
        <p style={{ color: "red" }}>Error al cargar el producto: {error}</p>
        <button 
          onClick={handleClose}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  // Si no hay producto
  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", minHeight: "60vh" }}>
        <p>Producto no encontrado</p>
        <button 
          onClick={handleClose}
          style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  const urlImg = `https://tomasvolpini.github.io/ITBA-Muebleria-Jota/server${product.imagen}`;

  return (
    <section className="page layout-leftpic">
      {/* Imagen del producto */}
      <div className="product-img">
        <img src={urlImg} alt={product.nombre} />
      </div>

      {/* Información del producto */}
      <div className="product-info">
        <h2>{product.nombre}</h2>

        {/* Descripción */}
        <p className="desc">{product.descripcion}</p>

        {/* Tabla de características */}
        {product.caracteristicas && (
          <table className="specs">
            <tbody>
              {Object.entries(product.caracteristicas).map(([clave, valor]) => (
                <tr key={clave}>
                  <th>{clave.charAt(0).toUpperCase() + clave.slice(1)}</th>
                  <td>{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Stock */}
        {product.stock !== undefined && (
          <p className="stock">
            <strong>Stock disponible:</strong> {product.stock} unidades
          </p>
        )}

        {/* Precio */}
        <p className="price">
          <strong>Precio: {precioARS(product.precio)}</strong>
        </p>

        {/* Botones de acción */}
        <div className="product-actions">
          <button className="add-cart" onClick={handleAddToCart}>
            Añadir al Carrito
          </button>
          <button onClick={handleClose} className="btn-close">
            Volver
          </button>
        </div>
      </div>
    </section>
  );
}
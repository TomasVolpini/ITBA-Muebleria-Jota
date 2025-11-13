import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/FeaturedProducts.css";

const API_URL = "https://itba-muebleria-jota.onrender.com/api/products";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          setProducts(data.slice(0, 4)); // Solo primeros 4 productos
        }
      } catch (err) {
        console.error("Error al cargar productos destacados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="destacados">
        <h2 className="destacados__title">Productos destacados</h2>
        <p style={{ textAlign: "center" }}>Cargando productos...</p>
      </section>
    );
  }

  return (
    <section className="destacados">
      <h2 className="destacados__title">Productos destacados</h2>
      <div className="productos-grid">
        {products.map((product) => {
          const urlImg = `https://tomasvolpini.github.io/ITBA-Muebleria-Jota/server${product.imagen}`;

          return (
            <div key={product._id} className="featured-card">
              <img src={urlImg} alt={product.nombre} />
              <div className="featured-card__content">
                <p className="featured-card__name">{product.nombre}</p>
                <Link to={`/productos/${product._id}`} className="btn-overlay">
                  Ver Detalles
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
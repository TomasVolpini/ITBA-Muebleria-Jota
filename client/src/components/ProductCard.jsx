import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const urlImg = `https://tomasvolpini.github.io/ITBA-Muebleria-Jota/server${product.imagen}`;

  return (
    <div className="card">
      <img className="thumb" src={urlImg} alt={product.nombre} />
      <p className="product-name">{product.nombre}</p>
      <Link to={`/productos/${product._id}`} className="btn-overlay">
        Ver Detalles
      </Link>
    </div>
  );
}
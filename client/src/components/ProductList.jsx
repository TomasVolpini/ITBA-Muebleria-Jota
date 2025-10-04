// client/src/components/ProductList.jsx
import ProductCard from "./ProductCard";

export default function ProductList({ productos, onSelect }) {
  if (!productos) return <p>No hay productos.</p>;

  return (
    <div className="grid product-list">
      {productos.map((p) => (
        <ProductCard
          key={p.id}
          producto={p}
          onClick={onSelect ? () => onSelect(p) : undefined}
        />
      ))}
    </div>
  );
}

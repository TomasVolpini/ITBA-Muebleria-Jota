import ProductCard from "./ProductCard";

export default function ProductList({ products, setRuta }) {
  return (
    <div className="grid product-list">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} setRuta={setRuta} />
      ))}
    </div>
  );
}

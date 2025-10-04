// client/src/components/ProductCard.jsx
export default function ProductCard({ producto, onClick, mostrarPrecio = true }) {
  if (!producto) return null;

  const nombre = producto.nombre?.trim() || "Producto sin nombre";
  const src = producto.imagen
    ? (producto.imagen.startsWith("/") ? producto.imagen : `/${producto.imagen}`)
    : "/img/placeholder.jpg";

  const precioFmt =
    typeof producto.precio === "number"
      ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(producto.precio)
      : (producto.precio ?? "");

  const isClickable = typeof onClick === "function";
  const handleKeyDown = (e) => {
    if (!isClickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(producto);
    }
  };

  return (
    <article
      className={`product-card${isClickable ? " is-clickable" : ""}`}
      onClick={isClickable ? () => onClick(producto) : undefined}
      onKeyDown={handleKeyDown}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className="thumb">
        <img src={src} alt={nombre} loading="lazy" />
      </div>

      <h3 className="name">{nombre}</h3>

      {mostrarPrecio && precioFmt !== "" && (
        <p className="price">{precioFmt}</p>
      )}
    </article>
  );
}

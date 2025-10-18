import "../styles/ProductDetail.css";

export default function ProductDetail({ products, setRuta, ruta, onAddToCart }) {
  const urlImg = `https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server${products.imagen}`;

  function handleClose() {
    setRuta(`/`);
  }

  function handleAddToCart() {
    onAddToCart(products);
  }

  function precioARS(valor) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(valor);
  }

  return (
    <section className="page layout-leftpic">
      {/* Imagen del producto */}
      <div className="product-img">
        <img src={urlImg} alt={products.nombre} />
      </div>

      {/* Información del producto */}
      <div className="product-info">
        <h2>{products.nombre}</h2>

        {/* Descripción */}
        <p className="desc">{products.descripcion}</p>

        {/* Tabla de características */}
        {products.caracteristicas && (
          <table className="specs">
            <tbody>
              {Object.entries(products.caracteristicas).map(([clave, valor]) => (
                <tr key={clave}>
                  <th>{clave.charAt(0).toUpperCase() + clave.slice(1)}</th>
                  <td>{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Precio */}
        <p className="price">
          <strong>Precio: {precioARS(products.precio)}</strong>
        </p>

        {/* Botones de acción */}
        <div className="product-actions">
          <button 
            className="add-cart"
            onClick={handleAddToCart}
          >
            Añadir al Carrito
          </button>
          <button 
            onClick={handleClose}
            className="btn-close"
          >
            Volver
          </button>
        </div>
      </div>
    </section>
  );
}

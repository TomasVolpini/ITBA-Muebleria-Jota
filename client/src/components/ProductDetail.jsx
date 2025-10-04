export default function ProductDetail({ products, setRuta, ruta }) {
  const urlImg = `https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server${products.imagen}`;
  // nota 2: seguramente haya que cambiar tanto la ruta del fetch como la de img cuando hagamos merge al main, porque ahora la base de datos a la que hacemos fetch está en la rama develop, la cual va a ser eliminada después de hacer merge
  function handleClick() {
    setRuta(`/`);
  }

  function precioARS(valor) {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(valor);
  }
  return (
    <div className="card">
      <img src={urlImg} alt="" />
      <p className="product-name">{products.nombre}</p>
      <p className="product-price">{precioARS(products.precio)}</p>
      <p className="product-desc">{products.descripcion}</p>
      <button onClick={handleClick}>Cerrar</button>
    </div>
  );
}

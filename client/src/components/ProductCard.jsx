export default function ProductCard({ product, setRuta }) {
  const urlImg = `https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server${product.imagen}`;
  // nota 2: seguramente haya que cambiar tanto la ruta del fetch como la de img cuando hagamos merge al main, porque ahora la base de datos a la que hacemos fetch está en la rama develop, la cual va a ser eliminada después de hacer merge
  function handleClick() {
    setRuta(`${product.id}`);
  }

  return (
    <div className="card">
      <img className="thumb" src={urlImg} alt="" />
      <p className="product-name">{product.nombre}</p>
      <button className="btn-overlay" onClick={handleClick}>Ver Detalles</button>
    </div>
  );
}

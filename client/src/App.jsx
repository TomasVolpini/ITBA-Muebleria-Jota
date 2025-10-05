import "./styles/App.css";
import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

function App() {
  const [products, setProducts] = useState([]);
  const [ruta, setRuta] = useState("/");
  const idBuscado = ruta;
  const indice = products.findIndex((producto) => producto.id === idBuscado);

  // hago fetch al json que tiene la info de los productos y lo guardo en la variable "products".
  useEffect(() => {
    const url =
      "https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server/database/productos.json";

    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => setProducts(data));
    } catch (err) {
      console.error("Error en el fetch de productos:", err.message);
    }
  }, []);
  // nota: para insertar la imagen, usen esta url `https://raw.githubusercontent.com/TomasVolpini/ITBA-Muebleria-Jota/refs/heads/develop/server${product.imagen}`
  // nota 2: seguramente haya que cambiar tanto la ruta del fetch como la de img cuando hagamos merge al main, porque ahora la base de datos a la que hacemos fetch está en la rama develop, la cual va a ser eliminada después de hacer merge

  console.log(ruta);
  //nota 3: usar la variable "ruta" para el renderizado condicional de los componentes a detalle (ver clase del último jueves)

  return (
    <>
      {ruta === "/" && <ProductList products={products} setRuta={setRuta} />}
      {ruta !== "/" && (
        <ProductDetail
          products={products[indice]}
          setRuta={setRuta}
          ruta={ruta}
        />
      )}
    </>
  );
}

export default App;

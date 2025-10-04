import "./styles/App.css";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

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

  return <></>;
}

export default App;

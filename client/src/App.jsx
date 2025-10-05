import "./styles/App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

function App() {
  // Estados para productos y rutas 
  const [products, setProducts] = useState([]);
  const [ruta, setRuta] = useState("/");

  // Fetch de productos 
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

  // Obtener el índice del producto según la ruta
  const idBuscado = ruta;
  const indice = products.findIndex((producto) => producto.id === idBuscado);

  return (
    <>
      <Header />
      
      {ruta === "/" && (
        <ProductList products={products} setRuta={setRuta} />
      )}

      {ruta !== "/" && products[indice] && (
        <ProductDetail
          product={products[indice]}
          setRuta={setRuta}
        />
      )}

      <Footer />
    </>
  );
}

export default App;

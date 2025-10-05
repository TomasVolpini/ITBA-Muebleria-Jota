import "./styles/App.css";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import CartPanel from "./components/CartPanel";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

function App() {
  // Estados para los paneles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado del carrito
  const [cart, setCart] = useState([]);

  // Estados para productos y rutas 
  const [products, setProducts] = useState([]);
  const [ruta, setRuta] = useState("/");
  const idBuscado = ruta;
  const indice = products.findIndex((producto) => producto.id === idBuscado);

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

  // Función para añadir producto al carrito
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      // Verificar si el producto ya está en el carrito
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si ya existe, incrementar la cantidad
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Si no existe, agregarlo con quantity: 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Abrir el carrito automáticamente al añadir un producto
    setIsCartOpen(true);
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const handleRemoveItem = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Calcular la cantidad total de items en el carrito
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header 
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      
      <CartPanel 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      
      {ruta === "/" && (
        <ProductList products={products} setRuta={setRuta} />
      )}
      
      {ruta !== "/" && products[indice] && (
        <ProductDetail
          products={products[indice]}
          setRuta={setRuta}
          ruta={ruta}
        />
      )}
      
      <Footer />
    </>
  );
}

export default App;

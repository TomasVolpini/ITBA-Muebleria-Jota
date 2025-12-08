import "./styles/App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CartPanel from "./components/CartPanel";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactoPage from "./components/ContactoPage";
import NewProduct from "./components/NewProduct";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import MyOrders from "./components/MyOrders";
import AdminRoute from "./components/AdminRoute";




function App() {
  // Estados para los paneles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Estado del carrito
  const [cart, setCart] = useState([]);

  // Función para añadir producto al carrito
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);

      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Función para eliminar un producto del carrito
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const handleClearCart = () => {
    setCart([]); 
  }
  
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
        onClearCart={handleClearCart}
      />

      <Routes>
        {/* Página de inicio */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedProducts />
            </>
          }
        />

        {/* Catálogo de productos */}
        <Route path="/productos" element={<ProductList />} />

        {/* Detalle de producto dinámico */}
        <Route
          path="/productos/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />

        {/* Página de contacto */}
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/debug-new-product" element={<AdminRoute><NewProduct /></AdminRoute>} />
        <Route path="/debug-new-product" element={<NewProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<ProtectedRoute><Profile/></ProtectedRoute>} /> 
        <Route path="/mis-pedidos" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;

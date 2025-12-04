import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu"; // 👈 NUEVO

const Header = ({
  cartCount,
  onCartOpen,
  onMenuToggle,
  isMenuOpen,
}) => {
  return (
    <header className="header">
      {/* Menú hamburguesa */}
      <HamburgerMenu isOpen={isMenuOpen} onToggle={onMenuToggle} />

      {/* Logo */}
      <Link
        to="/"
        className="logo"
        aria-label="Ir a la página principal de Hermanos Jota"
      >
        <img src="/logo.svg" alt="Logo de Hermanos Jota" />
      </Link>

      {/* Menú principal */}
      <nav
        className={`nav-primary ${isMenuOpen ? "active" : ""}`}
        aria-label="Menú principal"
      >
        <ul>
          <li>
            <Link to="/" onClick={() => onMenuToggle()}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" onClick={() => onMenuToggle()}>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/contacto" onClick={() => onMenuToggle()}>
              Contacto
            </Link>
          </li>
        </ul>
      </nav>

      {/* Acciones de usuario: menú + carrito */}
      <nav className="nav-user-actions" aria-label="Acciones de usuario">
        <UserMenu /> {/* 👈 iconito + dropdown */}
        <CartButton cartCount={cartCount} onClick={onCartOpen} />
      </nav>
    </header>
  );
};

export default Header;

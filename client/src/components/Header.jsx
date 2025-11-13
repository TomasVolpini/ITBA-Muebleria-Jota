import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import CartButton from "./CartButton";

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

      {/* Menú principal (desplegable en mobile) */}
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

      {/* Acciones de usuario */}
      <nav className="nav-user-actions" aria-label="Acciones de usuario">
        <button className="icon-btn" aria-label="Mi cuenta">
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z"></path>
          </svg>
        </button>

        <CartButton cartCount={cartCount} onClick={onCartOpen} />
      </nav>
    </header>
  );
};

export default Header;
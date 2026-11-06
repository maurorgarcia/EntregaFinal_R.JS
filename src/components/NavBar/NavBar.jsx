import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../../utils/helpers';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

export default function NavBar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productosAbierto, setProductosAbierto] = useState(false);
  const location = useLocation();

  const cerrarMenu = () => {
    setMenuAbierto(false);
    setProductosAbierto(false);
  };

  const isProductosActive =
    location.pathname.startsWith('/productos') ||
    location.pathname.startsWith('/category') ||
    location.pathname.startsWith('/item');

  const toggleProductosMobile = (e) => {
    e.preventDefault();
    setProductosAbierto((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo" onClick={cerrarMenu}>
          ESENCIAL
        </Link>

        <nav className={`nav ${menuAbierto ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <NavLink to="/" end onClick={cerrarMenu}>
                Inicio
              </NavLink>
            </li>
            <li
              className={`nav-dropdown ${productosAbierto ? 'mobile-open' : ''}`}
            >
              <div className="nav-dropdown-trigger-wrap">
                <NavLink
                  to="/productos"
                  className={isProductosActive ? 'active' : undefined}
                  onClick={cerrarMenu}
                >
                  Productos
                </NavLink>
                <button
                  type="button"
                  className="nav-dropdown-toggle"
                  onClick={toggleProductosMobile}
                  aria-label="Abrir categorías de productos"
                  aria-expanded={productosAbierto}
                >
                  <ChevronDown
                    size={14}
                    className={productosAbierto ? 'rotated' : ''}
                  />
                </button>
              </div>
              <ul className="nav-dropdown-menu">
                <li>
                  <Link to="/productos" onClick={cerrarMenu}>
                    Ver todos los productos
                  </Link>
                </li>
                {/* Una sola ruta /category/:categoryId para todas las categorías */}
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <Link
                      to={`/category/${category.id}`}
                      onClick={cerrarMenu}
                    >
                      {category.displayName}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <NavLink to="/nosotros" onClick={cerrarMenu}>
                Nosotros
              </NavLink>
            </li>
            <li>
              <NavLink to="/contacto" onClick={cerrarMenu}>
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <CartWidget />

          <button
            className="menu-toggle"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Menú"
          >
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

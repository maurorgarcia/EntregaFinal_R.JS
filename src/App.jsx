import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './components/Home/Home';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart';
import CheckoutForm from './components/CheckoutForm/CheckoutForm';
import Nosotros from './components/Nosotros/Nosotros';
import Contacto from './components/Contacto/Contacto';
import NotFound from './components/NotFound/NotFound';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-container">
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productos"
            element={<ItemListContainer greeting="¡Bienvenidos a Esencial!" />}
          />
          <Route
            path="/category/:categoryId"
            element={<ItemListContainer greeting="¡Bienvenidos a Esencial!" />}
          />
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="footer">
          <div className="container footer-grid">
            <div className="footer-brand">
              <span className="footer-logo">ESENCIAL</span>
              <p>Objetos cotidianos con diseño consciente y materiales sustentables.</p>
            </div>
            <div className="footer-links">
              <h4>Navegación</h4>
              <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h4>Contacto</h4>
              <ul>
                <li><a href="mailto:hola@esencial.com.ar">hola@esencial.com.ar</a></li>
                <li><span>Palermo, CABA</span></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Esencial. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

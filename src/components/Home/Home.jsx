import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProducts } from '../../services/firestore';
import { CATEGORIES, PAGE_HERO_IMAGES } from '../../utils/helpers';
import Item from '../Item/Item';
import { ProductGridSkeleton } from '../Skeleton/Skeleton';
import './Home.css';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Destacados con fetch async (misma lógica que el catálogo)
  useEffect(() => {
    getFeaturedProducts()
      .then((data) => setFeatured(data))
      .catch((err) => console.error('Error fetching featured products:', err))
      .finally(() => setLoaded(true));
  }, []);

  return (
    <main className="home">
      <section
        className="home-hero"
        style={{ '--hero-image': `url(${PAGE_HERO_IMAGES.home})` }}
      >
        <div className="home-hero-overlay" />
        <div className="container home-hero-content">
          <h1 className="home-hero-title">Objetos esenciales para una vida más simple</h1>
          <p className="home-hero-text">
            En Esencial curamos aromas, cerámica y papelería con estética cálida y materiales
            que respetan el entorno. Menos ruido, más calma en tu hogar.
          </p>
          <div className="home-hero-actions">
            <Link to="/productos" className="home-btn home-btn--primary">
              Ver catálogo
            </Link>
            <Link to="/nosotros" className="home-btn home-btn--secondary">
              Conocé nuestra historia
            </Link>
          </div>
        </div>
      </section>

      <section className="home-featured">
        <div className="container">
          <div className="home-section-header home-section-header--row">
            <div>
              <h2>Productos destacados</h2>
              <div className="home-section-line home-section-line--left" />
              <p className="home-section-subtitle">
                Tres favoritos de nuestro catálogo, elegidos por su calidad y versatilidad.
              </p>
            </div>
            <Link to="/productos" className="home-link-arrow">
              Ver todos <ArrowRight size={16} />
            </Link>
          </div>

          {!loaded ? (
            <ProductGridSkeleton count={3} />
          ) : (
            <div className="home-featured-grid">
              {featured.map((product) => (
                <Item key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home-categories">
        <div className="container">
          <div className="home-section-header">
            <h2>Explorá por categoría</h2>
            <div className="home-section-line" />
          </div>
          <div className="home-categories-grid">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="home-category-card"
                style={{ '--cat-image': `url(${cat.image})` }}
              >
                <div className="home-category-image" />
                <div className="home-category-body">
                  <h3>{cat.displayName}</h3>
                  <p>{cat.description}</p>
                  <span className="home-category-link">
                    Descubrir <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-about-teaser">
        <div className="container home-about-grid">
          <div className="home-about-text">
            <span className="home-about-label">Nuestra filosofía</span>
            <h2>Diseño honesto, sin excesos</h2>
            <p>
              Esencial nació de la idea de rodearnos de objetos que cumplan su función con
              belleza y sobriedad. Cada producto pasa por una selección cuidadosa.
            </p>
            <Link to="/nosotros" className="home-btn home-btn--outline">
              Leer más sobre nosotros
            </Link>
          </div>
          <div className="home-about-stats">
            <div className="home-stat">
              <span className="home-stat-number">100%</span>
              <span className="home-stat-label">Materiales seleccionados</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-number">+15</span>
              <span className="home-stat-label">Artesanos aliados</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-number">3</span>
              <span className="home-stat-label">Líneas de producto</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container home-cta-inner">
          <h2>¿Tenés alguna consulta?</h2>
          <p>
            Estamos para ayudarte con pedidos, envíos o recomendaciones personalizadas.
          </p>
          <Link to="/contacto" className="home-btn home-btn--primary">
            Contactanos
          </Link>
        </div>
      </section>
    </main>
  );
}

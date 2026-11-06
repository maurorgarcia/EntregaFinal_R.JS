import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../services/firestore';
import { getCategoryById, PAGE_HERO_IMAGES } from '../../utils/helpers';
import ItemList from '../ItemList/ItemList';
import EmptyState from '../EmptyState/EmptyState';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import PageHero from '../PageHero/PageHero';
import { ProductGridSkeleton } from '../Skeleton/Skeleton';
import './ItemListContainer.css';

export default function ItemListContainer({ greeting }) {
  const [products, setProducts] = useState([]);
  const [loadedCategory, setLoadedCategory] = useState(null);
  const [error, setError] = useState(null);

  const { categoryId } = useParams();
  const isLoading = loadedCategory !== categoryId;
  const category = getCategoryById(categoryId);

  // Fetch async de productos: filtra por categoría si hay categoryId en la URL
  useEffect(() => {
    getProducts(categoryId)
      .then((data) => {
        setProducts(data);
        setLoadedCategory(categoryId);
        setError(null);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('No pudimos cargar los productos. Intentá de nuevo más tarde.');
        setLoadedCategory(categoryId);
      });
  }, [categoryId]);

  const breadcrumbItems = category
    ? [
        { label: 'Inicio', to: '/' },
        { label: 'Productos', to: '/productos' },
        { label: category.displayName },
      ]
    : [
        { label: 'Inicio', to: '/' },
        { label: 'Productos' },
      ];

  return (
    <main className="main-content">
      {!categoryId && (
        <PageHero
          image={PAGE_HERO_IMAGES.productos}
          backTo="/"
          backLabel="← Volver al inicio"
          title="Nuestro catálogo"
          greeting={greeting}
          text="Aromas, cerámica y papelería seleccionados con criterio de calidad y sustentabilidad."
        />
      )}

      {categoryId && category && (
        <PageHero
          image={category.image}
          backTo="/productos"
          backLabel="← Ver todos los productos"
          title={category.displayName}
          text={category.description}
        />
      )}

      {categoryId && !category && !isLoading && (
        <PageHero
          plain
          backTo="/productos"
          backLabel="← Ver todos los productos"
          title="Categoría no encontrada"
          text="La categoría que buscás no existe o fue removida del catálogo."
        />
      )}

      <section id="productos" className="productos-seccion">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />

          {!isLoading && products.length > 0 && (
            <p className="productos-count">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </p>
          )}

          {isLoading ? (
            <ProductGridSkeleton count={categoryId ? 3 : 6} />
          ) : error ? (
            <EmptyState
              title="Error al cargar"
              message={error}
              backTo="/productos"
              backLabel="Volver al catálogo"
            />
          ) : products.length === 0 ? (
            <EmptyState
              title="Sin productos"
              message={
                category
                  ? `Todavía no hay productos disponibles en ${category.displayName}.`
                  : 'No encontramos productos para mostrar en este momento.'
              }
              backTo="/productos"
            />
          ) : (
            <ItemList products={products} />
          )}
        </div>
      </section>
    </main>
  );
}

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getRelatedProducts } from '../../services/firestore';
import { getCategoryDisplayName } from '../../utils/helpers';
import ItemDetail from '../ItemDetail/ItemDetail';
import RelatedItem from '../RelatedItem/RelatedItem';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { ItemDetailSkeleton } from '../Skeleton/Skeleton';
import './ItemDetailContainer.css';

export default function ItemDetailContainer() {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loadedItemId, setLoadedItemId] = useState(null);
  const [error, setError] = useState(null);

  const { itemId } = useParams();
  const isLoading = loadedItemId !== itemId;

  // Fetch async del producto por ID (useParams) + productos relacionados
  useEffect(() => {
    getProductById(itemId)
      .then((data) => {
        setProduct(data);
        setLoadedItemId(itemId);
        setError(null);
        return getRelatedProducts(data.id, data.category);
      })
      .then((relatedProducts) => {
        if (relatedProducts) setRelated(relatedProducts);
      })
      .catch((err) => {
        setError(err.message || 'Error al cargar el producto.');
        setProduct(null);
        setRelated([]);
        setLoadedItemId(itemId);
      });
  }, [itemId]);

  const breadcrumbItems = product
    ? [
        { label: 'Inicio', to: '/' },
        { label: 'Productos', to: '/productos' },
        {
          label: getCategoryDisplayName(product.category),
          to: `/category/${product.category}`,
        },
        { label: product.name },
      ]
    : [{ label: 'Inicio', to: '/' }, { label: 'Producto' }];

  if (isLoading) {
    return (
      <div className="container detail-container-wrapper">
        <ItemDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container detail-container-wrapper error-wrapper">
        <div className="error-card">
          <h2>Ups, ocurrió un problema</h2>
          <p>{error}</p>
          <Link to="/productos" className="btn-error-back">
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container detail-container-wrapper">
      <Breadcrumbs items={breadcrumbItems} />
      {product && <ItemDetail product={product} />}

      {related.length > 0 && (
        <section className="related-products">
          <h2 className="related-products-title">También te puede interesar</h2>
          <div className="related-products-grid">
            {related.map((p) => (
              <RelatedItem key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

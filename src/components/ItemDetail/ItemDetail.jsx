import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { getCategoryNavName, formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import ItemCount from '../ItemCount/ItemCount';
import './ItemDetail.css';

// Componente de presentación: vista visual del detalle + ItemCount
export default function ItemDetail({ product }) {
  const { addItem, getQty } = useCart();
  const [agregadoCantidad, setAgregadoCantidad] = useState(0);

  const disponible = Math.max(0, product.stock - getQty(product.id));

  const handleAdd = (count) => {
    addItem(product, count);
    setAgregadoCantidad(count);
  };

  return (
    <article className="item-detail">
      <div className="item-detail-gallery">
        <div className="item-detail-image-container">
          <img src={product.image} alt={product.name} />
        </div>
      </div>

      <div className="item-detail-panel">
        <div className="item-detail-header">
          <Link to={`/category/${product.category}`} className="item-detail-category">
            {getCategoryNavName(product.category)}
          </Link>

          <h1 className="item-detail-name">{product.name}</h1>

          <div className="item-detail-price-row">
            <span className="item-detail-price">{formatPrice(product.price)}</span>
            {product.stock > 0 && (
              <span className="item-detail-stock-badge">
                <Package size={14} />
                {disponible > 0
                  ? `${disponible} disponibles`
                  : 'Sin stock disponible'}
              </span>
            )}
          </div>
        </div>

        {(product.stock <= 5 && product.stock > 0) && (
          <p className="item-detail-stock-warning">
            ¡Últimas {product.stock} unidades en stock!
          </p>
        )}

        <p className="item-detail-description">{product.description}</p>

        {product.details && product.details !== product.description && (
          <p className="item-detail-details">{product.details}</p>
        )}

        {product.specs && product.specs.length > 0 && (
          <div className="item-detail-specs">
            <h2>Especificaciones</h2>
            <ul className="item-detail-specs-grid">
              {product.specs.map((spec, i) => (
                <li key={i}>{spec}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="item-detail-purchase">
          {product.stock <= 0 ? (
            <p className="item-detail-stock-warning">Producto sin stock.</p>
          ) : agregadoCantidad > 0 ? (
            // Luego de agregar al carrito se oculta ItemCount
            <>
              <div className="added-feedback-toast added-feedback-toast--success">
                ✓ Se agregaron {agregadoCantidad}{' '}
                {agregadoCantidad === 1 ? 'unidad' : 'unidades'} al carrito.
              </div>
              <div className="item-detail-after-add">
                <Link to="/cart" className="add-to-cart-btn">
                  Ir al carrito
                </Link>
                <Link to="/productos" className="item-detail-back">
                  Seguir comprando
                </Link>
              </div>
            </>
          ) : disponible <= 0 ? (
            <p className="item-detail-stock-warning">
              Ya tenés todo el stock disponible en tu carrito.{' '}
              <Link to="/cart">Ver carrito</Link>
            </p>
          ) : (
            <>
              <h2 className="item-detail-purchase-title">Agregar al carrito</h2>
              <ItemCount stock={disponible} initial={1} onAdd={handleAdd} />
            </>
          )}
        </div>

        <Link
          to={product.category ? `/category/${product.category}` : '/productos'}
          className="item-detail-back"
        >
          <ArrowLeft size={16} />
          Volver al catálogo
        </Link>
      </div>
    </article>
  );
}

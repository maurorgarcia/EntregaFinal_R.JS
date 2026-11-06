import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getCategoryNavName, formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import './Item.css';

// Componente de presentación: card de producto en el catálogo
export default function Item({ product }) {
  const { addItem, getQty } = useCart();
  const [agregado, setAgregado] = useState(false);
  const [sinStockMsg, setSinStockMsg] = useState(false);

  const disponible = Math.max(0, product.stock - getQty(product.id));
  const sinStock = product.stock <= 0 || disponible <= 0;

  const handleQuickAdd = () => {
    if (sinStock) return;

    if (getQty(product.id) + 1 > product.stock) {
      setSinStockMsg(true);
      setTimeout(() => setSinStockMsg(false), 2000);
      return;
    }

    addItem(product, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <div className="producto-card">
      <Link to={`/item/${product.id}`} className="producto-imagen-link">
        <div className="producto-imagen">
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className="producto-categoria-badge">
            {getCategoryNavName(product.category)}
          </span>
        </div>
      </Link>

      <div className="producto-info">
        <div className="producto-cabecera">
          <h3>
            <Link to={`/item/${product.id}`}>{product.name}</Link>
          </h3>
          <span className="precio">{formatPrice(product.price)}</span>
        </div>
        <p>{product.description}</p>

        <div className="producto-botones">
          <button
            className="btn-agregar"
            onClick={handleQuickAdd}
            disabled={agregado || sinStock}
          >
            {product.stock <= 0
              ? 'Sin stock'
              : sinStock
                ? 'Máximo en carrito'
                : agregado
                  ? '¡Agregado!'
                  : sinStockMsg
                    ? 'Stock agotado'
                    : 'Agregar'}
          </button>
          <Link to={`/item/${product.id}`} className="btn-detalle">
            Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

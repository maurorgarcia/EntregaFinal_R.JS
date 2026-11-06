import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import './CartItem.css';

// Componente de presentación: una línea del carrito
export default function CartItem({ item }) {
  const { removeItem } = useCart();

  return (
    <li className="cart-row">
      <Link to={`/item/${item.id}`} className="cart-row-image">
        <img src={item.image} alt={item.name} />
      </Link>

      <div className="cart-row-info">
        <Link to={`/item/${item.id}`} className="cart-row-name">
          {item.name}
        </Link>
        <span className="cart-row-unit">
          {item.qty} x {formatPrice(item.price)}
        </span>
      </div>

      <span className="cart-row-subtotal">{formatPrice(item.price * item.qty)}</span>

      <button
        type="button"
        className="cart-row-remove"
        onClick={() => removeItem(item.id)}
        aria-label={`Eliminar ${item.name}`}
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
}

import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import './CartWidget.css';

export default function CartWidget() {
  const { totalQty } = useCart();

  return (
    <div className="cart-widget">
      <Link to="/cart" className="cart-btn" aria-label="Ir al carrito de compras">
        <ShoppingCart size={20} />
        {totalQty > 0 && <span className="cart-badge">{totalQty}</span>}
      </Link>
    </div>
  );
}

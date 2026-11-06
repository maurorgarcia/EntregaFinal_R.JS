import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import CartItem from '../CartItem/CartItem';
import EmptyState from '../EmptyState/EmptyState';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './Cart.css';

export default function Cart() {
  const { cart, clearCart, totalQty, totalPrice } = useCart();

  const breadcrumbItems = [{ label: 'Inicio', to: '/' }, { label: 'Carrito' }];

  return (
    <main className="main-content">
      <div className="container cart-page">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="cart-page-title">Tu carrito</h1>

        {cart.length === 0 ? (
          <EmptyState
            title="Tu carrito está vacío"
            message="Todavía no agregaste productos. Explorá el catálogo y encontrá algo que te guste."
            backTo="/productos"
            backLabel="Ver productos"
          />
        ) : (
          <div className="cart-layout">
            <ul className="cart-list">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>

            <aside className="cart-summary">
              <h2>Resumen</h2>
              <div className="cart-summary-row">
                <span>Unidades</span>
                <span>{totalQty}</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <Link to="/checkout" className="cart-btn-primary">
                Finalizar compra
              </Link>
              <button type="button" className="cart-btn-secondary" onClick={clearCart}>
                Vaciar carrito
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

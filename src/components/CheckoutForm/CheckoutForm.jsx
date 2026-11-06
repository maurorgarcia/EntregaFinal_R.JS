import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import { createOrder } from '../../services/firestore';
import EmptyState from '../EmptyState/EmptyState';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import './CheckoutForm.css';

const initialForm = { name: '', phone: '', email: '', emailConfirm: '' };

const validate = ({ name, phone, email, emailConfirm }) => {
  const errors = {};
  if (name.trim().length < 3) errors.name = 'Ingresá tu nombre completo.';
  if (phone.replace(/\D/g, '').length < 8) errors.phone = 'Ingresá un teléfono válido.';
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Ingresá un email válido.';
  if (emailConfirm !== email) errors.emailConfirm = 'Los emails no coinciden.';
  return errors;
};

export default function CheckoutForm() {
  const { cart, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSending(true);
    setSubmitError(null);
    try {
      const id = await createOrder({
        buyer: { name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() },
        items: cart,
        total: totalPrice,
      });
      setOrderId(id);
      clearCart();
    } catch (err) {
      console.error('Error al generar la orden:', err);
      setSubmitError('No pudimos procesar tu compra. Intentá de nuevo en unos minutos.');
    } finally {
      setIsSending(false);
    }
  };

  if (orderId) {
    return (
      <main className="main-content">
        <div className="container checkout-page">
          <div className="checkout-success">
            <CheckCircle size={56} />
            <h1>¡Gracias por tu compra!</h1>
            <p>Tu orden fue registrada correctamente. Guardá este código de seguimiento:</p>
            <code className="checkout-order-id">{orderId}</code>
            <Link to="/productos" className="checkout-submit">
              Seguir comprando
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="main-content">
        <div className="container checkout-page">
          <EmptyState
            title="Tu carrito está vacío"
            message="Agregá productos al carrito antes de finalizar la compra."
            backTo="/productos"
            backLabel="Ver productos"
          />
        </div>
      </main>
    );
  }

  const fields = [
    { name: 'name', label: 'Nombre completo', type: 'text', autoComplete: 'name' },
    { name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
    { name: 'emailConfirm', label: 'Repetir email', type: 'email', autoComplete: 'email' },
  ];

  return (
    <main className="main-content">
      <div className="container checkout-page">
        <Breadcrumbs
          items={[
            { label: 'Inicio', to: '/' },
            { label: 'Carrito', to: '/cart' },
            { label: 'Checkout' },
          ]}
        />
        <h1 className="checkout-title">Finalizar compra</h1>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            {fields.map(({ name, label, type, autoComplete }) => (
              <div className="checkout-field" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  autoComplete={autoComplete}
                  value={form[name]}
                  onChange={handleChange}
                  disabled={isSending}
                  aria-invalid={Boolean(errors[name])}
                />
                {errors[name] && <span className="checkout-error">{errors[name]}</span>}
              </div>
            ))}

            {submitError && <p className="checkout-error checkout-error--block">{submitError}</p>}

            <button type="submit" className="checkout-submit" disabled={isSending}>
              {isSending ? 'Procesando compra...' : 'Confirmar compra'}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Tu pedido</h2>
            <ul>
              {cart.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.qty} x {item.name}
                  </span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

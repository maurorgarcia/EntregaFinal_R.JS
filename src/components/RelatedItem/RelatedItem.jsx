import { Link } from 'react-router-dom';
import { getCategoryNavName, formatPrice } from '../../utils/helpers';
import './RelatedItem.css';

export default function RelatedItem({ product }) {
  return (
    <Link to={`/item/${product.id}`} className="related-item">
      <div className="related-item-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="related-item-body">
        <span className="related-item-category">
          {getCategoryNavName(product.category)}
        </span>
        <h3>{product.name}</h3>
        <span className="related-item-price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  );
}

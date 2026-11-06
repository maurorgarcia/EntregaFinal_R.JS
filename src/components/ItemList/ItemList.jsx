import Item from '../Item/Item';

export default function ItemList({ products }) {
  // Componente de presentación: lista productos con map() y key
  return (
    <div className="productos-grid">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  );
}

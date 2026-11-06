import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  limit,
  writeBatch,
  increment,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './firebase';

const productsRef = collection(db, 'products');
const ordersRef = collection(db, 'orders');

const toProduct = (snapshot) => ({ id: snapshot.id, ...snapshot.data() });

export const getProducts = async (categoryId) => {
  const q = categoryId ? query(productsRef, where('category', '==', categoryId)) : productsRef;
  const snapshot = await getDocs(q);
  return snapshot.docs.map(toProduct);
};

export const getFeaturedProducts = async () => {
  const snapshot = await getDocs(query(productsRef, where('featured', '==', true)));
  return snapshot.docs.map(toProduct);
};

export const getProductById = async (id) => {
  const snapshot = await getDoc(doc(db, 'products', String(id)));
  if (!snapshot.exists()) {
    throw new Error('Producto no encontrado');
  }
  return toProduct(snapshot);
};

export const getRelatedProducts = async (productId, category, max = 3) => {
  const snapshot = await getDocs(
    query(productsRef, where('category', '==', category), limit(max + 1))
  );
  return snapshot.docs
    .map(toProduct)
    .filter((p) => p.id !== String(productId))
    .slice(0, max);
};

// Crea el documento de la orden y descuenta el stock en una sola operación (batch)
export const createOrder = async ({ buyer, items, total }) => {
  const orderRef = doc(ordersRef);
  const batch = writeBatch(db);

  batch.set(orderRef, {
    buyer,
    items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
    total,
    date: serverTimestamp(),
  });

  items.forEach(({ id, qty }) => {
    batch.update(doc(db, 'products', String(id)), { stock: increment(-qty) });
  });

  await batch.commit();
  return orderRef.id;
};

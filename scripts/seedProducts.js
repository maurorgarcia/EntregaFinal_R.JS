// Carga los productos en la colección "products" de Firestore.
// Uso: npm run seed   (lee las credenciales del archivo .env)
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, writeBatch } from 'firebase/firestore';
import { productos } from './productsData.js';

const app = initializeApp({
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
});

const db = getFirestore(app);
const batch = writeBatch(db);

productos.forEach(({ id, ...data }) => {
  batch.set(doc(db, 'products', String(id)), data);
});

await batch.commit();
console.log(`✓ ${productos.length} productos cargados en Firestore`);
process.exit(0);

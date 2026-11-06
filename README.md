# Esencial — E-Commerce (Proyecto Final React)

Single Page Application de e-commerce de objetos cotidianos con diseño consciente (aromas, cerámica y papelería). Desarrollada con **React**, **React Router** y **Firebase (Firestore)** para el curso de React de CoderHouse.

**Demo online:** https://esencialweb.vercel.app/

## Funcionalidades

- Catálogo dinámico leído desde Firestore, filtrable por categoría.
- Detalle de producto con selector de cantidad (`ItemCount`) validado por stock.
- `ItemCount` se oculta luego de agregar al carrito y ofrece "Ir al carrito" / "Seguir comprando".
- Carrito global con **Context API** (persistido en `localStorage`), con subtotales y total.
- `CartWidget` con el total de unidades en el carrito.
- Checkout con formulario validado: genera un documento en la colección `orders`, descuenta el stock de los productos y muestra el **ID de la orden** al usuario.
- Renderizado condicional: loaders (skeletons), "carrito vacío", "producto sin stock", errores y 404.
- Navegación SPA sin recargas con React Router.

## Rutas

| Ruta | Componente |
| --- | --- |
| `/` | `Home` |
| `/productos` | `ItemListContainer` |
| `/category/:categoryId` | `ItemListContainer` |
| `/item/:itemId` | `ItemDetailContainer` |
| `/cart` | `Cart` |
| `/checkout` | `CheckoutForm` |
| `*` | `NotFound` |

## Estructura

```
src/
├── components/     NavBar, CartWidget, ItemListContainer, ItemList, Item,
│                   ItemDetailContainer, ItemDetail, ItemCount, Cart, CartItem,
│                   CheckoutForm, ...
├── context/        CartContext (provider) y cartContextObject
├── hooks/          useCart
├── services/       firebase.js (config) y firestore.js (consultas y órdenes)
└── utils/          helpers (categorías, formatPrice)
scripts/            carga inicial de productos en Firestore
```

## Firestore

- **`products`**: `name`, `price` (número), `category`, `description`, `details`, `image`, `stock`, `specs[]`, `featured` (bool).
- **`orders`**: `buyer {name, phone, email}`, `items[] {id, name, price, qty}`, `total`, `date`.

## Puesta en marcha

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Crear un proyecto en [Firebase](https://console.firebase.google.com), habilitar **Firestore** y registrar una app web.
3. Copiar `.env.example` a `.env` y completar las credenciales de la app web.
4. Cargar los productos iniciales en Firestore:
   ```bash
   npm run seed
   ```
5. Iniciar la app:
   ```bash
   npm run dev
   ```

> Las reglas de Firestore deben permitir lectura de `products` y escritura en `orders` y actualización de `stock` (por ejemplo, modo de prueba durante la evaluación).

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run lint` — ESLint
- `npm run seed` — carga los productos en Firestore

## Tecnologías

React 19 · React Router 7 · Firebase / Firestore · Vite · lucide-react

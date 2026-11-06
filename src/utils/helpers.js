export const formatPrice = (price) => `$${Number(price).toLocaleString('es-AR')}`;

export const PAGE_HERO_IMAGES = {
  home: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1600&auto=format&fit=crop&q=80',
  productos: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1600&auto=format&fit=crop&q=80',
  nosotros: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?w=1600&auto=format&fit=crop&q=80',
  contacto: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&auto=format&fit=crop&q=80',
};

export const CATEGORIES = [
  {
    id: 'aromas',
    name: 'Aromas',
    displayName: 'Velas & Aromas',
    description: 'Velas, difusores y aromas naturales para transformar tu espacio con calma y calidez.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'ceramica',
    name: 'Cerámica',
    displayName: 'Vajilla & Cerámica',
    description: 'Piezas artesanales torneadas a mano, con acabados rústicos pensados para el uso diario.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'papeleria',
    name: 'Papelería',
    displayName: 'Papelería Ecológica',
    description: 'Cuadernos y libretas con materiales reciclados y procesos responsables con el medio ambiente.',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
  },
];

export const getCategoryById = (categoryId) => {
  return CATEGORIES.find((c) => c.id === categoryId) ?? null;
};

export const getCategoryDisplayName = (categoryId) => {
  if (!categoryId) return 'Nuestros Productos';
  const category = getCategoryById(categoryId);
  return category ? category.displayName : categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
};

export const getCategoryNavName = (categoryId) => {
  const category = getCategoryById(categoryId);
  return category ? category.name : categoryId;
};


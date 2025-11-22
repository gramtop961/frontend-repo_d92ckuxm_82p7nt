import ProductCard from './ProductCard'

const staticProducts = [
  {
    id: 'tee-classic-black',
    title: 'Classic Tee — Black',
    description: 'Ultra‑soft cotton tee with a relaxed fit. Perfect everyday essential.',
    price: 32,
    category: 'Tops',
    images: ['https://images.unsplash.com/photo-1520975922131-c0f3b1ee0290?q=80&w=1600&auto=format&fit=crop']
  },
  {
    id: 'hoodie-stone',
    title: 'Fleece Hoodie — Stone',
    description: 'Brushed interior with clean exterior. Cozy layering piece for cool days.',
    price: 78,
    category: 'Outerwear',
    images: ['https://images.unsplash.com/photo-1520975968319-8ce90a810dfc?q=80&w=1600&auto=format&fit=crop']
  },
  {
    id: 'cargo-olive',
    title: 'Utility Cargo — Olive',
    description: 'Tapered cargos with ample pocketing and stretch for movement.',
    price: 92,
    category: 'Bottoms',
    images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1600&auto=format&fit=crop']
  },
]

export default function Shop({ onAdd }) {
  return (
    <section id="shop" className="py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticProducts.map(p => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  )
}

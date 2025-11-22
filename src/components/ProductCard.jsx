import { ShoppingCart } from 'lucide-react'

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-white/20 transition">
      <div className="aspect-[4/5] w-full overflow-hidden">
        <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">{product.title}</h3>
          <span className="text-white/80 font-medium">${product.price.toFixed(2)}</span>
        </div>
        <p className="mt-1 text-white/60 text-sm line-clamp-2">{product.description}</p>
        <button onClick={() => onAdd(product)} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold transition">
          <ShoppingCart size={18} /> Add to cart
        </button>
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Shop({ onAdd }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/api/products`)
        const data = await res.json()
        setProducts(data.items || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return <div className="py-20 text-center text-white/70">Loading products…</div>
  }

  return (
    <section id="shop" className="py-16 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Featured</h2>
        {products.length === 0 ? (
          <div className="text-white/60">No products yet. Use the admin to add some.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(p => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

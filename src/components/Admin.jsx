import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin() {
  const [form, setForm] = useState({ title: '', price: '49.00', description: '', category: 'Tops', image: '' })
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function load() {
    const res = await fetch(`${API_BASE}/api/products`)
    const data = await res.json()
    setItems(data.items || [])
  }

  useEffect(() => { load() }, [])

  async function handleCreate(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: parseFloat(form.price),
          category: form.category,
          images: form.image ? [form.image] : [],
          sizes: ['S','M','L','XL'],
          in_stock: true
        })
      })
      if (!res.ok) throw new Error('Failed to create')
      setForm({ title: '', price: '49.00', description: '', category: 'Tops', image: '' })
      await load()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="admin" className="py-16 px-6 md:px-10 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-semibold">Add product</h3>
          <form onSubmit={handleCreate} className="mt-4 space-y-3">
            <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Title" value={form.title} onChange={e=>setForm(v=>({...v,title:e.target.value}))} required />
            <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Description" value={form.description} onChange={e=>setForm(v=>({...v,description:e.target.value}))} />
            <div className="grid grid-cols-2 gap-3">
              <input className="bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Price" value={form.price} onChange={e=>setForm(v=>({...v,price:e.target.value}))} required />
              <input className="bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Category" value={form.category} onChange={e=>setForm(v=>({...v,category:e.target.value}))} />
            </div>
            <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Image URL" value={form.image} onChange={e=>setForm(v=>({...v,image:e.target.value}))} />
            <button disabled={loading} className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:opacity-50">{loading ? 'Saving…' : 'Create product'}</button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map(it => (
              <div key={it.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <img src={it.images?.[0] || 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop'} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <div className="font-semibold">{it.title}</div>
                    <div className="text-white/70 text-sm">${it.price.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

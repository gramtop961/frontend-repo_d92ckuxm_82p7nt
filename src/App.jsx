import { useState } from 'react'
import Hero from './components/Hero'
import Shop from './components/Shop'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'
import Admin from './components/Admin'

function App() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)

  function addToCart(p) {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === p.id)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }
        return copy
      }
      return [...prev, { id: p.id, title: p.title, price: p.price, qty: 1 }]
    })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />

      <div className="px-6 md:px-10 -mt-20 relative z-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Shop onAdd={addToCart} />
          </div>
          <div>
            <Cart items={cart} onCheckout={() => setOpen(true)} />
          </div>
        </div>
      </div>

      <Admin />

      <CheckoutModal open={open} onClose={() => setOpen(false)} cartItems={cart} />

      <footer className="py-10 text-center text-white/60">© {new Date().getFullYear()} Vistro</footer>
    </div>
  )
}

export default App

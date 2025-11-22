import { useMemo } from 'react'

export default function Cart({ items, onCheckout }) {
  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0)
    const shipping = subtotal > 100 ? 0 : (items.length ? 7 : 0)
    const total = subtotal + shipping
    return { subtotal, shipping, total }
  }, [items])

  return (
    <aside className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white">
      <h3 className="font-semibold text-lg mb-3">Cart</h3>
      {items.length === 0 ? (
        <p className="text-white/60">Your cart is empty</p>
      ) : (
        <div className="space-y-3">
          {items.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span className="text-white/80">{it.title} × {it.qty}</span>
              <span className="text-white/80">${(it.price * it.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="h-px bg-white/10 my-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Subtotal</span>
            <span className="text-white/80">${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Shipping</span>
            <span className="text-white/80">${totals.shipping.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span className="text-white">Total</span>
            <span className="text-white">${totals.total.toFixed(2)}</span>
          </div>
          <button onClick={() => onCheckout(totals)} className="mt-2 w-full px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition">Checkout</button>
        </div>
      )}
    </aside>
  )
}

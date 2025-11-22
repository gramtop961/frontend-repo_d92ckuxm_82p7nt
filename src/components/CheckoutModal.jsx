import { useMemo } from 'react'

export default function CheckoutModal({ open, onClose, cartItems }) {
  if (!open) return null

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0)
    const shipping = subtotal > 100 ? 0 : (cartItems.length ? 7 : 0)
    const total = subtotal + shipping
    return { subtotal, shipping, total }
  }, [cartItems])

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 text-white">
        <div className="text-center">
          <h3 className="text-xl font-semibold">Static checkout</h3>
          <p className="mt-2 text-white/70">This preview runs without a backend. Totals are calculated locally.</p>
        </div>

        <div className="mt-6 space-y-2 text-white/90">
          {cartItems.map((it, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <span>{it.title} × {it.qty}</span>
              <span>${(it.price * it.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="h-px bg-white/10 my-2" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Shipping</span>
            <span>${totals.shipping.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold">
            <span className="text-white">Total</span>
            <span className="text-white">${totals.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white text-slate-900">Close</button>
        </div>
      </div>
    </div>
  )
}

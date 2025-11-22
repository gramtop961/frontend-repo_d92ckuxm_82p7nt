import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function CheckoutModal({ open, onClose, cartItems, totals }) {
  const [step, setStep] = useState('info')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [info, setInfo] = useState({ name: '', email: '', address: '' })
  const [card, setCard] = useState({ number: '4242 4242 4242 4242', month: '12', year: '2030', cvc: '123', name: 'Cardholder' })

  if (!open) return null

  async function handlePay() {
    setError('')
    setLoading(true)
    try {
      // 1) Create order
      const subtotal = cartItems.reduce((s, it) => s + it.price * it.qty, 0)
      const shipping = subtotal > 100 ? 0 : (cartItems.length ? 7 : 0)
      const total = subtotal + shipping
      const items = cartItems.map(it => ({ product_id: it.id, quantity: it.qty, size: it.size || null }))
      const resOrder = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: info,
          subtotal,
          shipping,
          total,
          currency: 'usd',
          status: 'pending'
        })
      })
      const order = await resOrder.json()
      if (!resOrder.ok) throw new Error(order.detail || 'Failed to create order')

      // 2) Charge
      const resPay = await fetch(`${API_BASE}/api/payments/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: order.id,
          card_number: card.number,
          exp_month: parseInt(card.month, 10),
          exp_year: parseInt(card.year, 10),
          cvc: card.cvc,
          name_on_card: card.name
        })
      })
      const pay = await resPay.json()
      if (!resPay.ok) throw new Error(pay.detail || 'Payment failed')

      setStep('success')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl p-6 text-white">
        {step === 'info' && (
          <div>
            <h3 className="text-xl font-semibold">Shipping info</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Full name" value={info.name} onChange={e=>setInfo(v=>({...v,name:e.target.value}))} />
              <input className="bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Email" value={info.email} onChange={e=>setInfo(v=>({...v,email:e.target.value}))} />
              <input className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Address" value={info.address} onChange={e=>setInfo(v=>({...v,address:e.target.value}))} />
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={() => setStep('payment')} className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600">Continue</button>
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div>
            <h3 className="text-xl font-semibold">Card payment</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Card number" value={card.number} onChange={e=>setCard(v=>({...v,number:e.target.value}))} />
              <input className="bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="MM" value={card.month} onChange={e=>setCard(v=>({...v,month:e.target.value}))} />
              <input className="bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="YYYY" value={card.year} onChange={e=>setCard(v=>({...v,year:e.target.value}))} />
              <input className="bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="CVC" value={card.cvc} onChange={e=>setCard(v=>({...v,cvc:e.target.value}))} />
              <input className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-3 outline-none" placeholder="Name on card" value={card.name} onChange={e=>setCard(v=>({...v,name:e.target.value}))} />
            </div>
            {error && <p className="mt-3 text-red-400 text-sm">{error}</p>}
            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep('info')} className="px-5 py-2 rounded-xl border border-white/20">Back</button>
              <button disabled={loading} onClick={handlePay} className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50">{loading ? 'Processing…' : 'Pay now'}</button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-10">
            <div className="text-4xl">🎉</div>
            <h3 className="mt-2 text-xl font-semibold">Payment successful</h3>
            <p className="text-white/70">Your order is confirmed and will be shipped soon.</p>
            <div className="mt-6">
              <button onClick={onClose} className="px-5 py-2 rounded-xl bg-white text-slate-900">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

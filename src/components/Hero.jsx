import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-3xl p-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow">Vistro</h1>
          <p className="mt-4 text-white/90 text-lg md:text-xl">Modern fashion meets seamless checkout. Shop the latest fits with secure card payments.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="#shop" className="px-6 py-3 rounded-full bg-white/90 hover:bg-white text-slate-900 font-semibold transition">Shop now</a>
            <a href="#collections" className="px-6 py-3 rounded-full border border-white/60 text-white hover:bg-white/10 font-semibold transition">Explore</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
    </section>
  )
}

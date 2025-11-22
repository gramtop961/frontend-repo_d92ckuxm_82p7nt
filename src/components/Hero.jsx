export default function Hero() {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.3),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(168,85,247,0.25),transparent_40%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/10 via-slate-950/40 to-slate-950" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow">Vistro</h1>
          <p className="mt-4 text-white/90 text-lg md:text-xl">Modern fashion meets seamless checkout. Shop the latest fits with a smooth demo experience.</p>
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

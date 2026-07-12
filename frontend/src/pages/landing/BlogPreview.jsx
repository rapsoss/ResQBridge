import { Link } from 'react-router-dom'
import AnimateIn from '../../components/ui/AnimateIn'

const STATUS_COLORS = {
  'Critically Endangered': 'from-red-500 to-red-700',
  'Endangered': 'from-orange-500 to-red-600',
  'Vulnerable': 'from-amber-400 to-orange-600',
  'Near Threatened': 'from-yellow-400 to-amber-600',
  'Least Concern': 'from-emerald-500 to-green-600',
}

const STATUS_BG = {
  'Critically Endangered': 'bg-red-100 text-red-700',
  'Endangered': 'bg-orange-100 text-orange-700',
  'Vulnerable': 'bg-amber-100 text-amber-700',
  'Near Threatened': 'bg-yellow-100 text-yellow-700',
  'Least Concern': 'bg-emerald-100 text-emerald-700',
}

export default function BlogPreview({ title, subtitle, species }) {
  const display = (species || []).slice(0, 4)

  if (!display.length) return null

  return (
    <section className="relative overflow-hidden border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_left,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Wildlife Guide</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">Meet the wildlife species of Palawan that you may encounter.</p>
        </AnimateIn>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {display.map((s, i) => (
            <AnimateIn key={s.name} delay={i * 100}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
                {s.images?.[0] ? (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={s.images[0]} alt={s.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className={`aspect-[16/9] bg-gradient-to-br ${STATUS_COLORS[s.status] || 'from-emerald-500 to-green-600'} flex items-center justify-center`}>
                    <span className="text-4xl font-bold text-white/50">{s.name[0]}</span>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <span className={`mb-2 inline-block self-start rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${STATUS_BG[s.status] || 'bg-gray-100 text-gray-700'}`}>
                    {s.status}
                  </span>
                  <h3 className="text-sm font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
                    {s.name}
                  </h3>
                  <p className="mt-0.5 text-xs italic text-gray-400">{s.scientificName}</p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500">
                    {s.habitat}
                  </p>
                  <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 text-[10px] text-gray-400">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 font-medium">{s.activeStatus}</span>
                    {s.hazard && <span className="rounded-md bg-red-50 px-2 py-0.5 font-medium text-red-600">{s.hazard}</span>}
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={300}>
          <div className="mt-8 text-center">
            <Link
              to="/wildlife-guide"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
            >
              View Full Wildlife Guide
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

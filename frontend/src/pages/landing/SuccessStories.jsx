import { useState } from 'react'
import { Modal } from '../../components/ui'
import AnimateIn from '../../components/ui/AnimateIn'

export default function SuccessStories({ title, subtitle, stories }) {
  const [selected, setSelected] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  if (!stories.length) return null

  return (
    <section className="relative overflow-hidden border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-1 max-w-3xl text-base leading-relaxed text-gray-400">{subtitle}</p>
        </AnimateIn>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {stories.map((s, i) => (
            <AnimateIn key={i} delay={i * 100}>
              <button
                onClick={() => setSelected(s)}
                className="group relative flex flex-col overflow-hidden rounded-2xl text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {s.image ? (
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.image} alt={s.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                ) : null}
                <div className={`flex flex-1 flex-col justify-between border border-gray-200 bg-white p-5 ${s.image ? 'border-t-0' : ''}`}>
                  <div>
                    <p className="text-sm font-semibold leading-relaxed text-gray-900">
                      &ldquo;{s.quote}&rdquo;
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-gray-500 line-clamp-2">{s.result}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-green-100 text-xs font-semibold text-emerald-700">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{s.name}</p>
                      <p className="text-[10px] text-gray-400">{s.role}</p>
                    </div>
                  </div>
                </div>
              </button>
            </AnimateIn>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Success Story" size="lg">
        {selected && (
          <div className="space-y-5">
            {selected.image && (
              <div className="relative">
                <img src={selected.image} alt={selected.name} onClick={() => setLightbox(selected.image)} className="w-full rounded-xl border border-gray-200 object-cover max-h-64 cursor-pointer" />
                <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">Click to expand</span>
              </div>
            )}
            <p className="text-lg font-semibold leading-relaxed text-gray-900">&ldquo;{selected.quote}&rdquo;</p>
            <p className="text-sm leading-relaxed text-gray-500">{selected.result}</p>
            <p className="text-sm leading-relaxed text-gray-500">{selected.fullStory}</p>
            <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-green-100 text-sm font-semibold text-emerald-700">
                {selected.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{selected.name}</p>
                <p className="text-xs text-gray-400">{selected.role}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="" className="max-h-full max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </section>
  )
}

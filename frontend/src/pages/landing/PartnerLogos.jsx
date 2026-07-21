import { useState } from 'react'
import AnimateIn from '../../components/ui/AnimateIn'
import { Modal } from '../../components/ui'

export default function PartnerLogos({ title, subtitle, partners }) {
  const [selected, setSelected] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  if (!partners.length) return null

  return (
    <section className="border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">{subtitle}</p>
        </AnimateIn>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <button
                onClick={() => setSelected(p)}
                className="group flex w-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md"
              >
                {p.image ? (
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-110">
                    <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50 transition-transform duration-300 group-hover:scale-110 group-hover:from-emerald-100 group-hover:to-green-100">
                    <span className="text-lg font-bold text-emerald-600">
                      {p.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                    </span>
                  </div>
                )}
                <p className="mt-4 text-center text-sm font-semibold text-gray-700">{p.name}</p>
                <p className="mt-0.5 text-center text-xs text-gray-400">{p.type}</p>
              </button>
            </AnimateIn>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Partner Organization" size="lg">
        {selected && (
          <div className="space-y-4">
            {selected.image && (
              <div className="relative">
                <img src={selected.image} alt={selected.name} onClick={() => setLightbox(selected.image)} className="w-full rounded-xl border border-gray-200 object-cover max-h-64 cursor-pointer" />
                <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">Click to expand</span>
              </div>
            )}
            <div className="flex items-center gap-4">
              {!selected.image && (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-green-50">
                  <span className="text-lg font-bold text-emerald-600">
                    {selected.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
                {selected.type && <p className="text-sm text-gray-500">{selected.type}</p>}
              </div>
            </div>
            {selected.desc && <p className="text-sm leading-relaxed text-gray-600">{selected.desc}</p>}
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

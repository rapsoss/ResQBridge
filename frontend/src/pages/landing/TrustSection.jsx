import { useState } from 'react'
import AnimateIn from '../../components/ui/AnimateIn'
import { Modal } from '../../components/ui'

export default function TrustSection({ title, subtitle, mediaMentions, awards }) {
  const [selected, setSelected] = useState(null)
  const [selectedType, setSelectedType] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  const mentions = mediaMentions?.length ? mediaMentions : null
  const awardList = awards?.length ? awards : null

  if (!mentions && !awardList) return null

  return (
    <section className="relative overflow-hidden border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        {title && (
          <AnimateIn>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">{subtitle}</p>}
          </AnimateIn>
        )}

        {(mentions || awardList) && (
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            {mentions && (
              <AnimateIn delay={100}>
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-emerald-500" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Media Mentions</h3>
                  </div>
                  <div className="space-y-4">
                    {mentions.map((m, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelected(m); setSelectedType('mention') }}
                        className="group flex w-full items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-sm font-bold text-white shadow-sm">
                          {m.logo}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-emerald-700">{m.name}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-gray-500 line-clamp-2">{m.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )}

            {awardList && (
              <AnimateIn delay={200}>
                <div>
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-amber-500" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Awards & Recognition</h3>
                  </div>
                  <div className="space-y-4">
                    {awardList.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => { setSelected(a); setSelectedType('award') }}
                        className="group flex w-full items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white shadow-sm">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-amber-700">{a.title}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{a.year} &middot; {a.org}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            )}
          </div>
        )}
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selectedType === 'award' ? 'Award' : 'Media Mention'} size="lg">
        {selected && (
          <div className="space-y-4">
            {selected.image && (
              <div className="relative">
                <img src={selected.image} alt={selected.title || selected.name} onClick={() => setLightbox(selected.image)} className="w-full rounded-xl border border-gray-200 object-cover max-h-64 cursor-pointer" />
                <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">Click to expand</span>
              </div>
            )}
            {selectedType === 'award' ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-sm">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selected.title}</h3>
                    <p className="text-sm text-gray-500">{selected.year} &middot; {selected.org}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-sm font-bold text-white shadow-sm">
                    {selected.logo}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selected.name}</h3>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{selected.desc}</p>
              </>
            )}
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

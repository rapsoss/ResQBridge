import { useState } from 'react'
import { Modal } from '../../components/ui'
import AnimateIn from '../../components/ui/AnimateIn'

export default function NewsEvents({ title, subtitle, news, events }) {
  const [selected, setSelected] = useState(null)
  const [tab, setTab] = useState('news')
  const [lightbox, setLightbox] = useState(null)

  return (
    <section className="relative overflow-hidden border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_left,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">{subtitle}</p>
        </AnimateIn>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {/* News */}
          <AnimateIn delay={100}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Latest News</h3>
              </div>
              <div className="space-y-4">
                {news.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => { setSelected(item); setTab('news') }}
                    className="group w-full rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="whitespace-nowrap rounded-lg bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-400">{item.date}</span>
                    </div>
                    <h4 className="mt-3 text-sm font-semibold text-gray-900 transition-colors group-hover:text-emerald-700">{item.title}</h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500 line-clamp-2">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Events */}
          <AnimateIn delay={200}>
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-emerald-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Upcoming Events</h3>
              </div>
              <div className="space-y-4">
                {events.map((ev) => (
                  <button
                    key={ev.title}
                    onClick={() => { setSelected(ev); setTab('event') }}
                    className="group w-full rounded-2xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-2">
                        <span className="text-sm font-bold text-emerald-700 uppercase">{ev.date.split(' ')[0]}</span>
                        <span className="text-[10px] font-medium text-gray-500">{ev.date.split(',')[0].replace(ev.date.split(' ')[0], '').trim()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 transition-colors group-hover:text-emerald-700">{ev.title}</h4>
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                          <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {ev.location}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-gray-500 line-clamp-2">{ev.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={tab === 'news' ? 'News' : 'Event'} size="lg">
        {selected && (
          <div className="space-y-4">
            {selected.image && (
              <div className="relative">
                <img src={selected.image} alt={selected.title} onClick={() => setLightbox(selected.image)} className="w-full rounded-xl border border-gray-200 object-cover max-h-64 cursor-pointer" />
                <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">Click to expand</span>
              </div>
            )}
            {tab === 'news' ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">{selected.category}</span>
                  <span className="text-sm text-gray-400">{selected.date}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{selected.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{selected.fullDesc || selected.desc}</p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex shrink-0 flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-5 py-3">
                    <span className="text-lg font-bold text-emerald-700 uppercase">{selected.date.split(' ')[0]}</span>
                    <span className="text-xs font-medium text-gray-500">{selected.date.split(',')[0].replace(selected.date.split(' ')[0], '').trim()}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selected.title}</h3>
                    {selected.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {selected.location}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">{selected.fullDesc || selected.desc}</p>
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

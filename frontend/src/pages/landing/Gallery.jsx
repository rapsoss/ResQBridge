import { useState } from 'react'
import { Modal } from '../../components/ui'
import AnimateIn from '../../components/ui/AnimateIn'

const GALLERY_COLORS = [
  { from: 'from-emerald-500', to: 'to-green-700' },
  { from: 'from-amber-400', to: 'to-orange-600' },
  { from: 'from-teal-500', to: 'to-cyan-700' },
  { from: 'from-blue-500', to: 'to-indigo-700' },
  { from: 'from-rose-400', to: 'to-pink-600' },
  { from: 'from-violet-500', to: 'to-purple-700' },
]

export default function Gallery({ title, subtitle, images }) {
  const [selected, setSelected] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  if (!images.length) return null

  return (
    <section className="border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-1 max-w-3xl text-base leading-relaxed text-gray-400">{subtitle}</p>
        </AnimateIn>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4">
          {images.map((img, i) => (
            <AnimateIn key={i} delay={i * 80}>
              <button
                onClick={() => setSelected(img)}
                className="group relative mb-5 block w-full overflow-hidden rounded-2xl text-left"
              >
                {img.image ? (
                  <img
                    src={img.image}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className={`aspect-[4/3] bg-gradient-to-br ${GALLERY_COLORS[i % GALLERY_COLORS.length].from} ${GALLERY_COLORS[i % GALLERY_COLORS.length].to}`} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2">
                  <p className="text-sm font-semibold text-white">{img.title}</p>
                  <p className="mt-0.5 text-xs text-white/70">{img.label}</p>
                </div>
              </button>
            </AnimateIn>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || 'Photo'} size="lg">
        {selected && (
          <div className="space-y-5">
            {selected.image ? (
              <div className="relative">
                <img src={selected.image} alt="" onClick={() => setLightbox(selected.image)} className="w-full rounded-xl border border-gray-200 object-cover max-h-64 cursor-pointer" />
                <span className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">Click to expand</span>
              </div>
            ) : (
              <div className="w-full rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 p-6">
                <p className="text-lg font-semibold text-white">{selected.title}</p>
              </div>
            )}
            <p className="text-sm leading-relaxed text-gray-500">{selected.desc}</p>
            <p className="text-xs text-gray-400">{selected.label} &middot; {selected.date}</p>
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

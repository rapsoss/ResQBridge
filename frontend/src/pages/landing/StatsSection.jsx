import AnimateIn from '../../components/ui/AnimateIn'

const features = [
  {
    title: 'Wildlife Reports',
    desc: 'Submit wildlife sighting, illegal possession, or human-wildlife conflict reports with photos and location.',
    svg: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    bg: 'from-emerald-500 to-green-600',
  },
  {
    title: 'Wildlife Guide',
    desc: 'Browse species profiles with conservation status, active periods, habitat, hazards, and safety notes.',
    svg: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
    bg: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Photo Evidence',
    desc: 'Attach up to 5 photos per report to help responders assess the situation accurately.',
    svg: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z',
    bg: 'from-amber-400 to-orange-500',
  },
  {
    title: 'Rescue Tools',
    desc: 'Live tracking, assignment management, and route navigation for rescue response teams.',
    svg: 'M11.42 15.17l-5.645 3.254a1.5 1.5 0 01-2.275-1.28v-7.29a1.5 1.5 0 012.275-1.28l5.645 3.254m5.645-3.254l5.645-3.255a1.5 1.5 0 012.275 1.28v7.29a1.5 1.5 0 01-2.275 1.28l-5.645-3.254m0 0l-5.645 3.254',
    bg: 'from-teal-500 to-cyan-600',
  },
]

export default function StatsSection({ stats }) {
  return (
    <section className="relative overflow-hidden border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.05),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <div className="mb-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="bg-gradient-to-br from-emerald-600 to-green-700 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={200}>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Wildlife Rescue Network
          </h2>
          <p className="mt-1 max-w-2xl text-base leading-relaxed text-gray-400">
            From the moment a wild animal goes missing to the joy of a safe return, ResQBridge connects every piece of the rescue puzzle.
          </p>
        </AnimateIn>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} delay={300 + i * 100}>
              <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.bg} shadow-sm transition-transform group-hover:scale-110`}>
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.svg} />
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-gray-400">{feature.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}

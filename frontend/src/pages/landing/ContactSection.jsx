import AnimateIn from '../../components/ui/AnimateIn'

export default function ContactSection({ contact }) {
  const socialLinks = [
    { name: 'Facebook', url: contact?.social?.facebook },
    { name: 'Instagram', url: contact?.social?.instagram },
    { name: 'Twitter', url: contact?.social?.twitter },
    { name: 'TikTok', url: contact?.social?.tiktok },
  ].filter((s) => s.url && typeof s.url === 'string' && s.url.trim().length > 0)

  return (
    <section className="relative overflow-hidden border-t border-gray-100 px-6 py-20 sm:px-8 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_right,rgba(16,185,129,0.04),transparent_60%)]" />

      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Us</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500">
            Reach out for rescues or inquiries.
          </p>
        </AnimateIn>

        <div className="mt-10 space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm max-w-lg">
          <InfoRow label="Phone Number" value={contact.phone} />
          {contact.telephone && <InfoRow label="Telephone" value={contact.telephone} />}
          <InfoRow label="Email" value={contact.email} />
          {socialLinks.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700">Follow Us</p>
              <div className="mt-2 flex gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-xs font-medium text-gray-500 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">{label}</p>
      <p className="mt-0.5 text-sm text-gray-500">{value}</p>
    </div>
  )
}

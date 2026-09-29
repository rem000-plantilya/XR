import InquiryForm from "@/components/InquiryForm";
import { faqs, items, penalties, peso, site, usageRules } from "@/lib/site";

const nav = [
  { href: "#rates", label: "Rates" },
  { href: "#policy", label: "Policy" },
  { href: "#inquire", label: "Inquire" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const contractFile = "/XR-Rentals-Rental-Agreement.docx";

function FacebookIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function PhoneIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.28 6.72 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.37c0-.52-.35-.97-.85-1.09l-4.42-1.1c-.44-.12-.9.05-1.17.41l-.97 1.29a1.13 1.13 0 0 1-1.21.38 12.04 12.04 0 0 1-7.14-7.14 1.13 1.13 0 0 1 .38-1.21l1.29-.97c.36-.27.53-.73.41-1.17l-1.1-4.42a1.13 1.13 0 0 0-1.09-.85H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------- Navbar ---------- */}
      <header className="no-print sticky top-0 z-40 border-b border-base-300 bg-base-100/90 backdrop-blur">
        <nav className="navbar mx-auto max-w-6xl px-4" aria-label="Main">
          <div className="navbar-start">
            <a href="#top" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
              <span className="grid size-9 place-items-center rounded-lg bg-primary text-sm text-primary-content">XR</span>
              {site.name}
            </a>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-1 px-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end gap-2">
            <a href="#inquire" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Book now
            </a>
            <div className="dropdown dropdown-end md:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-square" aria-label="Open menu">
                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-50 mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href}>{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="bg-gradient-to-br from-secondary to-neutral text-secondary-content">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
            <div>
              <p className="badge badge-accent mb-4 font-semibold">Party &amp; event rentals · {site.serviceArea}</p>
              <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                {site.name}: tables, chairs, smart videoke &amp; tents for your event
              </h1>
              <p className="mt-5 text-lg opacity-90">
                Affordable, clean and ready-to-use rentals for birthdays, fiestas, weddings and every celebration.
                Tables from {peso(100)}, chairs from {peso(8)}, videoke and tents at {peso(500)}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#inquire" className="btn btn-primary btn-lg">
                  Send an inquiry
                </a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg border-secondary-content/40 text-secondary-content hover:bg-secondary-content hover:text-secondary">
                  <FacebookIcon /> Message us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {items.map((it, i) => (
                <div key={it.key} className={`rounded-box bg-base-100/10 p-4 ring-1 ring-secondary-content/15 ${i === 0 ? "col-span-2" : ""}`}>
                  <div className="text-3xl" aria-hidden="true">
                    {it.emoji}
                  </div>
                  <p className="mt-2 font-semibold">{it.name}</p>
                  <p className="text-2xl font-extrabold text-accent">
                    {peso(it.price)}
                    <span className="text-sm font-medium opacity-80"> / {it.unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Quick facts (answer-first block for AI search / GEO) ---------- */}
        <section aria-labelledby="facts-title" className="mx-auto max-w-6xl px-4 py-12">
          <h2 id="facts-title" className="sr-only">
            Quick facts about {site.name}
          </h2>
          <div className="stats stats-vertical w-full border border-base-300 bg-base-100 shadow-sm lg:stats-horizontal">
            <div className="stat">
              <div className="stat-title">4ft tables</div>
              <div className="stat-value text-primary">{peso(100)}</div>
              <div className="stat-desc">per table</div>
            </div>
            <div className="stat">
              <div className="stat-title">Monoblock chairs</div>
              <div className="stat-value text-primary">{peso(10)}</div>
              <div className="stat-desc">per piece · kids chairs {peso(8)}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Smart videoke</div>
              <div className="stat-value text-primary">{peso(500)}</div>
              <div className="stat-desc">per unit, peripherals included</div>
            </div>
            <div className="stat">
              <div className="stat-title">Tent</div>
              <div className="stat-value text-primary">{peso(500)}</div>
              <div className="stat-desc">per tent</div>
            </div>
          </div>
        </section>

        {/* ---------- Rates ---------- */}
        <section id="rates" aria-labelledby="rates-title" className="bg-base-200">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 id="rates-title" className="text-3xl font-extrabold">
              Rental rates
            </h2>
            <p className="mt-2 max-w-2xl opacity-80">
              Simple, transparent pricing {site.rentalPeriod}. Mix and match what your event needs — the inquiry form
              calculates your estimate instantly.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <article key={it.key} className="card border border-base-300 bg-base-100 shadow-sm" itemScope itemType="https://schema.org/Offer">
                  <div className="card-body">
                    <div className="text-4xl" aria-hidden="true">
                      {it.emoji}
                    </div>
                    <h3 className="card-title" itemProp="name">
                      {it.name} rental
                    </h3>
                    <p className="opacity-80" itemProp="description">
                      {it.description}
                    </p>
                    {it.inclusions && (
                      <div className="mt-1 rounded-box bg-base-200 p-3 text-sm">
                        <p className="font-semibold">Inclusions:</p>
                        <ul className="mt-1 list-inside list-disc">
                          {it.inclusions.map((inc) => (
                            <li key={inc}>{inc}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="card-actions mt-2 items-center justify-between">
                      <p className="text-3xl font-extrabold text-primary">
                        <meta itemProp="priceCurrency" content="PHP" />
                        <span itemProp="price" content={String(it.price)}>
                          {peso(it.price)}
                        </span>
                        <span className="text-base font-medium opacity-70"> / {it.unit}</span>
                      </p>
                      <a href="#inquire" className="btn btn-primary btn-sm">
                        Reserve
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- How it works ---------- */}
        <section aria-labelledby="how-title" className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="how-title" className="text-3xl font-extrabold">
            How to rent from {site.name}
          </h2>
          <ul className="steps steps-vertical mt-8 w-full md:steps-horizontal">
            <li className="step step-primary">Send an online inquiry</li>
            <li className="step step-primary">We confirm availability &amp; quote</li>
            <li className="step step-primary">Sign the rental agreement</li>
            <li className="step step-primary">Enjoy your event, return items complete</li>
          </ul>
        </section>

        {/* ---------- Policy ---------- */}
        <section id="policy" aria-labelledby="policy-title" className="bg-base-200">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 id="policy-title" className="text-3xl font-extrabold">
              Damage, missing items &amp; proper usage policy
            </h2>
            <p className="mt-2 max-w-3xl opacity-80">
              We keep our rentals clean and in good condition for every customer. By renting, you agree to be
              responsible for the items while they are in your care.
            </p>

            <div role="alert" className="alert alert-warning mt-6">
              <span className="text-xl" aria-hidden="true">
                ⚠️
              </span>
              <span>
                <strong>Please do not use tables or chairs as a chopping board.</strong> Misuse, removing or tampering
                with the brand is treated as damage.
              </span>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-5">
              <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100 lg:col-span-3">
                <table className="table">
                  <caption className="sr-only">Penalty charges</caption>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Case</th>
                      <th className="text-right">Charge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penalties.map((p) => (
                      <tr key={p.item + p.case}>
                        <td className="font-medium">{p.item}</td>
                        <td>{p.case}</td>
                        <td className="text-right whitespace-nowrap">
                          {p.amount ? <strong className="text-error">{peso(p.amount)}</strong> : <span className="opacity-80">Actual cost</span>}
                          {p.note && p.amount ? <div className="text-xs opacity-70">{p.note}</div> : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold">Proper usage rules</h3>
                <ul className="mt-4 space-y-3">
                  {usageRules.map((r) => (
                    <li key={r} className="flex gap-3">
                      <span className="text-success" aria-hidden="true">
                        ✔
                      </span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
                <a href={contractFile} download className="btn btn-outline btn-secondary mt-6">
                  📄 Download printable rental agreement (.docx)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- Inquiry ---------- */}
        <section id="inquire" aria-labelledby="inquire-title" className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="inquire-title" className="text-3xl font-extrabold">
            Send an online inquiry
          </h2>
          <p className="mt-2 mb-8 max-w-2xl opacity-80">
            Tell us your event date and what you need. We&apos;ll confirm availability and send your final quote by text
            or call.
          </p>
          <InquiryForm />
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" aria-labelledby="faq-title" className="bg-base-200">
          <div className="mx-auto max-w-3xl px-4 py-16">
            <h2 id="faq-title" className="text-3xl font-extrabold">
              Frequently asked questions
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((f, i) => (
                <details key={f.q} className="collapse-arrow collapse border border-base-300 bg-base-100" open={i === 0}>
                  <summary className="collapse-title font-semibold">{f.q}</summary>
                  <div className="collapse-content">
                    <p>{f.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="contact-title" className="text-3xl font-extrabold">
            Contact {site.name}
          </h2>
          <address className="mt-8 grid gap-5 not-italic sm:grid-cols-2 lg:grid-cols-4">
            <a href={site.phoneHref} className="card border border-base-300 bg-base-100 transition hover:border-primary">
              <div className="card-body">
                <PhoneIcon className="size-7 text-primary" />
                <h3 className="font-bold">Call or text</h3>
                <p>{site.phone}</p>
              </div>
            </a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="card border border-base-300 bg-base-100 transition hover:border-primary">
              <div className="card-body">
                <FacebookIcon className="size-7 text-primary" />
                <h3 className="font-bold">Facebook</h3>
                <p className="break-all">{site.facebook.replace("https://www.", "")}</p>
              </div>
            </a>
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body">
                <span className="text-2xl" aria-hidden="true">
                  📍
                </span>
                <h3 className="font-bold">Service area</h3>
                <p>{site.serviceArea}</p>
              </div>
            </div>
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body">
                <span className="text-2xl" aria-hidden="true">
                  🕘
                </span>
                <h3 className="font-bold">Hours</h3>
                <p>{site.hours}</p>
              </div>
            </div>
          </address>
        </section>
      </main>

      <footer className="footer footer-center bg-neutral p-10 text-neutral-content">
        <aside>
          <p className="text-lg font-bold">{site.name}</p>
          <p>{site.tagline}</p>
          <p className="opacity-70">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </aside>
        <nav className="flex gap-4">
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FacebookIcon className="size-6" />
          </a>
          <a href={site.phoneHref} aria-label="Call">
            <PhoneIcon className="size-6" />
          </a>
        </nav>
      </footer>

      {/* Floating mobile call-to-action */}
      <div className="no-print fixed right-4 bottom-4 z-40 flex gap-2 md:hidden">
        <a href={site.messenger} target="_blank" rel="noopener noreferrer" className="btn btn-circle btn-secondary shadow-lg" aria-label="Messenger">
          <FacebookIcon />
        </a>
        <a href={site.phoneHref} className="btn btn-circle btn-primary shadow-lg" aria-label="Call us">
          <PhoneIcon />
        </a>
      </div>
    </>
  );
}

# XR Rentals — Website

Single-page website for **XR Rentals** (tables, chairs, smart videoke, tents) with online inquiry logging to Supabase.

Stack: Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · daisyUI v5 · Supabase

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase URL + anon key
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
```

The site works without Supabase configured; the inquiry form will just say it isn't set up yet.

## Supabase setup (inquiry logging)

1. Create a project at https://supabase.com.
2. Open **SQL Editor**, paste `supabase/migrations/20260929000000_create_inquiries.sql`, and run it.
   (Or with the CLI: `supabase link` then `supabase db push`.)
3. **Project Settings → API**: copy the Project URL and `anon` public key into `.env.local`.
4. Inquiries appear in **Table Editor → inquiries**. Update `status` (new → contacted → confirmed → completed / cancelled) and `admin_notes` there.

Security: RLS lets the public site **insert only**. Nobody can read inquiries with the anon key.

## Edit business details

Everything (phone, Facebook link, service area, hours, prices, penalties, FAQ) lives in **`lib/site.ts`**.
The phone number and Facebook link are placeholders — replace them there.

The printable contract is `public/XR-Rentals-Rental-Agreement.docx` (edit it in Word).
If you change prices or penalties, update both the contract and `lib/site.ts` so they match.

## SEO / GEO / AI search

- Metadata, Open Graph image, canonical URL, `robots.txt`, `sitemap.xml`, web manifest
- JSON-LD: `LocalBusiness` + `OfferCatalog` (prices), `FAQPage`, `WebSite`, `ReserveAction`
- `/llms.txt` — plain-text summary of prices, policy and FAQ for AI assistants
- `robots.txt` explicitly allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, …)
- Answer-first content: price stats block, FAQ written as full question/answer pairs

Set `NEXT_PUBLIC_SITE_URL` to your real domain when you deploy, and replace the
`serviceArea` / `address` placeholders in `lib/site.ts` with your actual city — local SEO depends on it.
# XR

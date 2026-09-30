import { faqs, items, penalties, peso, site, usageRules } from "@/lib/site";

export const dynamic = "force-static";

// Plain-text summary for AI assistants and answer engines (https://llmstxt.org)
export function GET() {
  const body = `# ${site.name}

> ${site.description}

## Contact
- Mobile: ${site.phone}
- Facebook: ${site.facebook}
- Address: ${site.fullAddress}
- Map: ${site.mapsUrl}
- Service area: ${site.serviceArea}
- Hours: ${site.hours}
- Online inquiry form: ${site.url}/#inquire

## Rental rates (${site.rentalPeriod})
${items
  .map((it) => `- ${it.name}: ${peso(it.price)} per ${it.unit}${it.inclusions ? ` (includes ${it.inclusions.join(", ")})` : ""}`)
  .join("\n")}

## Damage, missing item and proper usage policy
${penalties.map((p) => `- ${p.item} — ${p.case}: ${p.amount ? peso(p.amount) : ""} ${p.note ?? ""}`.trim()).join("\n")}

Rules:
${usageRules.map((r) => `- ${r}`).join("\n")}

## FAQ
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

import { faqs, items, penalties, site } from "./site";

/** JSON-LD graph for search engines and AI answer engines (SEO + GEO). */
export function structuredData() {
  const businessId = `${site.url}/#business`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en-PH",
        publisher: { "@id": businessId },
      },
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        description: site.description,
        url: site.url,
        telephone: site.phone,
        email: site.email,
        image: `${site.url}/opengraph-image`,
        logo: `${site.url}/icon.svg`,
        priceRange: "₱8 – ₱500",
        currenciesAccepted: "PHP",
        areaServed: site.serviceArea,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.address.locality,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        openingHours: "Mo-Su 07:00-21:00",
        sameAs: [site.facebook],
        knowsAbout: [
          "table rental",
          "chair rental",
          "monoblock chair rental",
          "kids chair rental",
          "videoke rental",
          "tent rental",
          "party rentals",
          "event equipment rental",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Party and event rentals",
          itemListElement: items.map((it) => ({
            "@type": "Offer",
            name: `${it.name} rental`,
            description: it.description,
            price: it.price,
            priceCurrency: "PHP",
            availability: "https://schema.org/InStock",
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: it.price,
              priceCurrency: "PHP",
              unitText: `per ${it.unit}`,
            },
            itemOffered: { "@type": "Product", name: it.name, description: it.description },
          })),
        },
        potentialAction: {
          "@type": "ReserveAction",
          target: `${site.url}/#inquire`,
          name: "Send a rental inquiry",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#policy`,
        name: `${site.name} damage and proper usage policy`,
        about: penalties.map((p) => `${p.item}: ${p.case}`).join("; "),
        isPartOf: { "@id": `${site.url}/#website` },
      },
    ],
  };
}

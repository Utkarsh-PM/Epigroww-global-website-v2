// Server-rendered JSON-LD structured data.
// Renders as <script type="application/ld+json"> in the HTML response — Google reads this
// directly from SSR output. No client JS, no hydration cost.

const SITE = "https://epigrowwglobal.com";

const SAME_AS = [
  "https://www.linkedin.com/company/epigroww-global",
  "https://www.instagram.com/epigrowwglobal",
  "https://www.facebook.com/epigrowwhq",
];

const OFFICES = [
  {
    "@type": "LocalBusiness",
    "@id": `${SITE}/#delhi`,
    name: "Epigroww Global — Delhi (Global HQ)",
    image: `${SITE}/logo.png`,
    url: SITE,
    telephone: "+91-89329-72567",
    address: {
      "@type": "PostalAddress",
      streetAddress: "WH 61, Block B, Mayapuri Industrial Area Phase I, Mayapuri",
      addressLocality: "New Delhi",
      postalCode: "110064",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "17:30",
      },
    ],
  },
  {
    "@type": "LocalBusiness",
    "@id": `${SITE}/#mumbai`,
    name: "Epigroww Global — Mumbai (Brand & Film Studio)",
    image: `${SITE}/logo.png`,
    url: SITE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Andheri West",
      addressLocality: "Mumbai",
      postalCode: "400053",
      addressCountry: "IN",
    },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${SITE}/#dubai`,
    name: "Epigroww Global — Dubai (MENA Growth Hub)",
    image: `${SITE}/logo.png`,
    url: SITE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Business Bay",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
  {
    "@type": "LocalBusiness",
    "@id": `${SITE}/#toronto`,
    name: "Epigroww Global — Toronto (North America Studio)",
    image: `${SITE}/logo.png`,
    url: SITE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "King Street West",
      addressLocality: "Toronto",
      postalCode: "M5V",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  },
];

const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Epigroww Global",
  legalName: "Epigroww Global Private Limited",
  url: SITE,
  logo: {
    "@type": "ImageObject",
    url: `${SITE}/logo.png`,
    width: 512,
    height: 512,
  },
  description:
    "Integrated marketing & advertising solutions company. Brand, media, technology and AI — engineered globally from Delhi, Mumbai, Dubai and Toronto.",
  foundingDate: "2021",
  sameAs: SAME_AS,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-89329-72567",
      contactType: "customer service",
      areaServed: ["IN", "AE", "CA"],
      availableLanguage: ["English", "Hindi"],
    },
  ],
};

const WEBSITE = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: SITE,
  name: "Epigroww Global",
  description:
    "Integrated marketing & advertising solutions — brand, media, tech and AI.",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: "en",
};

// Global JSON-LD: Organization + WebSite. Mounted once in the root layout.
export function GlobalJsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE) }}
      />
    </>
  );
}

// Contact-page JSON-LD: emit one LocalBusiness per office.
export function OfficesJsonLd() {
  return (
    <>
      {OFFICES.map((o) => (
        <script
          key={o["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({ "@context": "https://schema.org", ...o }),
          }}
        />
      ))}
    </>
  );
}

// Reusable BreadcrumbList for inner pages.
export function BreadcrumbJsonLd({ items }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

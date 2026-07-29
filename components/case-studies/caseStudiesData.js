// Single source of truth for the /case-studies page.
// The ledger index and the dossier sections both read from this array, so a
// brand is never described two different ways on the same page.
//
// `metrics` = hard, published numbers (rendered as the big numeral ledger).
// `scope`   = delivered workstreams, used when the engagement is qualitative
//             (brand launches, positioning mandates) rather than a media number.

export const CASE_STUDIES = [
  {
    id: "mitchell-usa",
    num: "01",
    brand: "Mitchell USA",
    category: "Performance",
    discipline: "Skincare · Marketplaces + Meta",
    market: "India",
    engagement: "Influencer selection → Amazon scale",
    window: "8 months",
    challenge:
      "Mitchell USA arrived with ROAS parked under 1 — unprofitable acquisition in a skincare category where even a 1.5 is hard-won. Discount-led traffic was propping up volume and quietly eating the P&L.",
    metrics: [
      { value: "90 lacs", label: "Revenue in 8 months" },
      { value: "110%", label: "ROAS lift in 6 months" },
      { value: "3×", label: "Growth journey, end to end" },
      { value: "2+", label: "ROI on Amazon, Flipkart & Meta — individually" },
      { value: "₹60L+", label: "Annual spend under management" },
    ],
    strategies: [
      {
        title: "ROAS turnaround from <1 to 2×",
        body: "The brand moved from loss-making acquisition to roughly 2× ROAS while staying inside one of the most contested skincare markets in India.",
      },
      {
        title: "Influencer selection wired to search demand",
        body: "Creators were picked against what people actually search for, so social interest compounded into monthly search volume and marketplace pull rather than a one-week spike.",
      },
      {
        title: "Amazon scaled as the demand engine",
        body: "Listings, sponsored placements and ranking velocity were built out so the marketplace absorbed the demand the top of funnel created.",
      },
      {
        title: "Channel-level profitability, never blended",
        body: "Amazon, Flipkart and Meta each had to clear 2+ ROI on their own. No channel was allowed to hide behind a blended average.",
      },
      {
        title: "Improved order quality",
        body: "Cutting discount-chasing traffic lifted buyer intent, reduced returns pressure and took operational strain off the team.",
      },
    ],
    quote: "From below break-even to a scalable growth foundation — in the same category, with the same catalogue.",
  },
  {
    id: "armaf",
    num: "02",
    brand: "Armaf",
    category: "Performance",
    discipline: "Fragrance · D2C, Content, Social",
    market: "Middle East → Global",
    engagement: "Digital growth partner",
    window: "6 months",
    challenge:
      "Armaf needed to scale new-customer acquisition on Shopify without leaning harder on discounts or surrendering profitability — while holding efficiency steady across Meta.",
    metrics: [
      { value: "79%", label: "Increase in new customers" },
      { value: "+2.2×", label: "ROAS lift in 6 months" },
    ],
    strategies: [
      {
        title: "Systematic scaling framework",
        body: "Budgets moved through a structured testing → validation → expansion process, so reach grew without efficiency slipping.",
      },
      {
        title: "Creative-led audience expansion",
        body: "Instead of static audience targeting, acquisition was driven by diverse creative angles that let the platform find high-intent buyers on its own.",
      },
      {
        title: "Rotation of new & under-exposed SKUs",
        body: "Newer and quieter SKUs were pushed into top-of-funnel to unlock fresh demand and surface products with real first-time-buyer appeal.",
      },
      {
        title: "Controlled experimentation",
        body: "Every change was tested in an isolated environment before rollout — learning without destabilising live performance.",
      },
    ],
    quote: "Growth that came from creative range and SKU depth, not from a bigger discount.",
  },
  {
    id: "beardo",
    num: "03",
    brand: "Beardo",
    category: "Performance",
    discipline: "Men's grooming · Meta-first acquisition",
    market: "India",
    engagement: "High-volume new customer acquisition",
    window: "11 months",
    challenge:
      "Beardo needed new customers at high volume and held consistent across a long operating window — no short-term spikes that destabilise the account the month after.",
    metrics: [
      { value: "3.58 lacs", label: "New customers added in 11 months" },
      { value: "3,58,419", label: "Exact new customer records" },
    ],
    strategies: [
      {
        title: "High-volume acquisition framework",
        body: "Growth was structured for sustained first-time-customer inflow rather than bursts that have to be paid back later.",
      },
      {
        title: "Creative diversification at scale",
        body: "Formats, hooks and narratives were tested continuously so acquisition momentum survived eleven straight months.",
      },
      {
        title: "Persona-based audience expansion",
        body: "New customer growth came from widening across buyer personas, which kept scale climbing without audience saturation.",
      },
      {
        title: "Meta-first new customer acquisition",
        body: "Meta ran as the core discovery platform — optimised for genuinely new buyers, not retargeting volume dressed up as growth.",
      },
    ],
    quote: "Eleven months of upward momentum, held by disciplined execution rather than a single winning ad.",
  },
  {
    id: "dream-beauty",
    num: "04",
    brand: "Dream Beauty",
    category: "Launch",
    discipline: "Beauty · Pharma-backed launch",
    market: "India",
    engagement: "Brand launch, end to end",
    window: "Launch programme",
    challenge:
      "A pharmaceutical company stepping into beauty. Clinical credibility was already there; a consumer brand language was not. The story, the deck, the positioning and the launch itself all had to be built from zero.",
    scope: [
      "Slide & narrative creation",
      "Communication delivery",
      "Brand positioning",
      "Full brand launch",
    ],
    strategies: [
      {
        title: "Narrative built before the identity",
        body: "The launch deck and communication came first — the argument for why a pharma house earns the right to a beauty shelf, written before anything was designed.",
      },
      {
        title: "Positioning translated from clinical to consumer",
        body: "Pharma rigour was converted into claims and language a beauty buyer actually responds to, without losing the credibility that made it different.",
      },
      {
        title: "Communication delivered, not just written",
        body: "Messaging was carried through every launch surface so the brand said one thing consistently on day one.",
      },
      {
        title: "A proper launch, run end to end",
        body: "Epigroww owned the launch programme itself — sequence, assets and execution — rather than handing over a strategy document.",
      },
    ],
    quote: "Pharma rigour, translated into a consumer beauty brand — positioned, packaged and launched.",
  },
  {
    id: "sonrisa",
    num: "05",
    brand: "Sonrisa",
    category: "Full-stack",
    discipline: "K-Beauty · End-to-end digital",
    market: "Korea → India",
    engagement: "Digital strategy + implementation",
    window: "Ongoing",
    challenge:
      "Korean formulation, made in Korea, engineered for Indian skin. Sonrisa needed one partner to define what the brand stands for — and then actually run every channel it lives on.",
    scope: [
      "Brand positioning",
      "Social media",
      "Marketplaces",
      "D2C",
      "Digital strategy",
      "Implementation",
    ],
    strategies: [
      {
        title: "Positioning defined first",
        body: "Made-in-Korea formulation for Indian skin is a specific promise. It was written down and locked before a single channel was switched on.",
      },
      {
        title: "Social built as the discovery layer",
        body: "Social carries the education a K-beauty entrant needs in India — ingredients, routine and proof — rather than being treated as a posting calendar.",
      },
      {
        title: "Marketplaces run as a revenue channel",
        body: "Listings, content and search visibility were operated properly instead of being left as a passive catalogue upload.",
      },
      {
        title: "D2C as the brand-owned surface",
        body: "The direct storefront holds the full story and the margin, with marketplaces feeding discovery into it.",
      },
    ],
    quote: "One operating system across positioning, social, marketplaces and D2C — strategy and implementation from the same team.",
  },
  {
    id: "birra",
    num: "06",
    brand: "Birra",
    category: "Full-stack",
    discipline: "Fragrance · D2C + Content",
    market: "Middle East",
    engagement: "End-to-end digital",
    window: "Ongoing",
    challenge:
      "A Middle Eastern fragrance house consolidating its entire digital presence with one partner — the D2C storefront and the content engine that has to keep feeding it.",
    scope: ["D2C", "Content", "End-to-end digital"],
    strategies: [
      {
        title: "D2C owned end to end",
        body: "Storefront, merchandising and the buying journey are run as one system rather than split across vendors who never see the same dashboard.",
      },
      {
        title: "Content as the demand engine",
        body: "Fragrance sells on world-building. Content is produced against that, at the cadence performance actually needs.",
      },
      {
        title: "One partner, one accountability line",
        body: "End-to-end digital by Epigroww — no gaps between the people making the work and the people answering for the numbers.",
      },
    ],
    quote: "End-to-end digital for a Middle Eastern fragrance house — content and commerce on one accountability line.",
  },
];

// The repeatable operating principles behind the numbers above. Pulled from the
// same engagements, not invented for the page.
export const PLAYBOOK = [
  {
    num: "01",
    title: "Controlled experimentation",
    body: "Every change is tested in an isolated environment before it goes live everywhere. We learn without destabilising an account that is already working.",
  },
  {
    num: "02",
    title: "Creative-led audience expansion",
    body: "Creative angles do the targeting. Give the platform enough range and it finds high-intent buyers faster than a hand-built audience ever will.",
  },
  {
    num: "03",
    title: "Persona-based expansion",
    body: "Scale comes from widening across real buyer personas, not from over-constraining one audience until it saturates and CAC climbs.",
  },
  {
    num: "04",
    title: "Velocity-controlled scaling",
    body: "When higher spend starts inflating CAC, we deliberately slow the pace. Efficiency is protected first; volume follows it.",
  },
];

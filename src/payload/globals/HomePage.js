/**
 * HOME PAGE content. Tabs map 1:1 to the visible sections on /.
 */
export const HomePage = {
  slug: "home-page",
  access: { read: () => true },
  label: "Home page",
  admin: {
    group: "Pages",
    description: "Everything on the home page — Hero, Showreel, Manifesto, Growth Engine, Live Pulse, Featured Work, Approach, Global Footprint, Voices, CTA.",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          name: "hero",
        label: "Hero",
          fields: [
            { name: "heroTopline", type: "text", defaultValue: "Integrated growth since 2021" },
            { name: "heroEyebrowNum", type: "text", defaultValue: "(01)" },
            { name: "heroEyebrowText", type: "text", defaultValue: "Media · Brand · Tech — unified" },
            {
              type: "row",
              fields: [
                { name: "headlinePrefix", type: "text", defaultValue: "We engineer", admin: { width: "33%", description: "Text BEFORE the italic accent word." } },
                { name: "headlineAccent", type: "text", defaultValue: "growth", admin: { width: "33%", description: "The italic accent word (rendered with brand highlight)." } },
                { name: "headlineSuffix", type: "text", defaultValue: "that compounds across four continents.", admin: { width: "34%", description: "Text AFTER the italic accent word." } },
              ],
            },
            {
              name: "heroBlurb",
              type: "textarea",
              defaultValue: "An integrated growth partner sitting at the intersection of brand, media, and technology. 500+ clients, 40+ industries — delivered from Delhi, Mumbai, Dubai & Toronto.",
              admin: { description: "Paragraph beneath the headline. Plain text — italics are added by the template." },
            },
            {
              name: "heroStats",
              type: "array",
              minRows: 3,
              maxRows: 3,
              labels: { singular: "Stat", plural: "Stats" },
              admin: { description: "Three small stats below the blurb (e.g. \"300+ Campaigns…\")." },
              fields: [
                { name: "num", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
            {
              type: "group",
              name: "heroFilm",
              label: "Hero film (right-side video)",
              fields: [
                { name: "video", type: "upload", relationTo: "media", admin: { description: "Looping video file. Falls back to poster image if absent." } },
                { name: "videoUrl", type: "text", admin: { description: "Or paste an external video URL (Pexels, your S3, etc.)." } },
                { name: "poster", type: "upload", relationTo: "media", admin: { description: "Poster shown before video loads." } },
                { name: "badge", type: "text", defaultValue: "LIVE · Mumbai studio" },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  type: "group",
                  name: "ctaPrimary",
                  admin: { width: "50%" },
                  fields: [
                    { name: "label", type: "text", defaultValue: "Learn more" },
                    { name: "href", type: "text", defaultValue: "/work" },
                  ],
                },
                {
                  type: "group",
                  name: "ctaGhost",
                  admin: { width: "50%" },
                  fields: [
                    { name: "label", type: "text", defaultValue: "Hire us" },
                    { name: "href", type: "text", defaultValue: "/contact" },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "showreel",
        label: "Showreel",
          fields: [
            { name: "showreelLabel", type: "text", defaultValue: "— 01.5 / Showreel · Spring 2026" },
            {
              type: "row",
              fields: [
                { name: "showreelPrefix", type: "text", defaultValue: "A week's", admin: { width: "33%" } },
                { name: "showreelAccent", type: "text", defaultValue: "output", admin: { width: "33%", description: "Italic accent word." } },
                { name: "showreelSuffix", type: "text", defaultValue: ", cut into ninety seconds.", admin: { width: "34%" } },
              ],
            },
            { name: "showreelVideo", type: "upload", relationTo: "media", admin: { description: "Showreel video file." } },
            { name: "showreelVideoUrl", type: "text", admin: { description: "Or external video URL." } },
            { name: "showreelPoster", type: "upload", relationTo: "media" },
            { name: "showreelDuration", type: "text", defaultValue: "01:28", admin: { description: "Display duration on the player." } },
            {
              name: "showreelMarquee",
              type: "array",
              labels: { singular: "Reel item", plural: "Reel items" },
              admin: { description: "Thumbnails in the marquee strip beneath the video." },
              fields: [
                { name: "weekTag", type: "text", admin: { description: "Short tag e.g. \"WK 17\"." } },
                { name: "title", type: "text" },
                { name: "image", type: "upload", relationTo: "media", required: true },
              ],
            },
          ],
        },
        {
          name: "manifesto",
        label: "Manifesto",
          fields: [
            { name: "manifestoLabel", type: "text", defaultValue: "— 02 / Philosophy · Read · 18 sec" },
            {
              name: "manifestoBody",
              type: "textarea",
              defaultValue: "We don't sell services. We engineer outcomes — pairing award-winning creative with performance data and tech that compounds. One team, four cities, endless specificity.",
              admin: { description: "The big philosophy paragraph. Scroll-revealed word by word." },
            },
            { name: "manifestoAuthor", type: "text", defaultValue: "— Danish Abbasi" },
            { name: "manifestoAuthorRole", type: "text", defaultValue: "Founder, Epigroww Global" },
          ],
        },
        {
          name: "growthEngine",
        label: "Growth engine",
          fields: [
            { name: "geLabel", type: "text", defaultValue: "— 03 / The growth engine" },
            {
              type: "row",
              fields: [
                { name: "geHeadingPrefix", type: "text", defaultValue: "Four disciplines,", admin: { width: "33%" } },
                { name: "geHeadingAccent", type: "text", defaultValue: "one compounding", admin: { width: "33%" } },
                { name: "geHeadingSuffix", type: "text", defaultValue: "system.", admin: { width: "34%" } },
              ],
            },
            {
              name: "geLede",
              type: "textarea",
              defaultValue: "Media, Brand, Tech and AI — run as a single pod, priced as a single retainer, measured against a single revenue line.",
            },
            {
              name: "pillarRefs",
              type: "relationship",
              relationTo: "pillars",
              hasMany: true,
              admin: { description: "The pillars shown in the orbital. Add all 4." },
            },
          ],
        },
        {
          name: "livePulse",
        label: "Live pulse",
          fields: [
            { name: "lpLabel", type: "text", defaultValue: "— 04 / What's happening right now" },
            { name: "lpLiveBadge", type: "text", defaultValue: "LIVE · Q2 2026" },
            {
              type: "row",
              fields: [
                { name: "lpHeadingPrefix", type: "text", defaultValue: "Numbers that", admin: { width: "33%" } },
                { name: "lpHeadingAccent", type: "text", defaultValue: "tick", admin: { width: "33%" } },
                { name: "lpHeadingSuffix", type: "text", defaultValue: "while you're reading.", admin: { width: "34%" } },
              ],
            },
            {
              name: "lpMetrics",
              type: "array",
              labels: { singular: "Metric", plural: "Metrics" },
              admin: { description: "Live-ticker metrics. perSec controls auto-increment rate (0 = static)." },
              fields: [
                { name: "key", type: "text", required: true, admin: { description: "Internal key, e.g. \"imp\", \"rev\"." } },
                { name: "label", type: "text", required: true },
                { name: "seed", type: "number", required: true, admin: { description: "Starting value." } },
                { name: "perSec", type: "number", defaultValue: 0, admin: { description: "Increment per second (0 = static)." } },
                { name: "unit", type: "text", admin: { description: "Suffix, e.g. \"%\". Leave empty for none." } },
                {
                  name: "format",
                  type: "select",
                  defaultValue: "number",
                  options: [
                    { label: "Number (comma-separated)", value: "number" },
                    { label: "Currency ($)", value: "usd" },
                    { label: "Percent", value: "percent" },
                  ],
                },
              ],
            },
            {
              name: "lpFeed",
              type: "array",
              labels: { singular: "Activity item", plural: "Activity items" },
              admin: { description: "Below-the-metrics activity feed." },
              fields: [
                { name: "timeTag", type: "text", admin: { description: "e.g. \"IST 14:32\"." } },
                { name: "text", type: "text", required: true },
              ],
            },
          ],
        },
        {
          name: "approach",
        label: "Approach",
          fields: [
            { name: "apLabel", type: "text", defaultValue: "— 06 / The approach" },
            {
              type: "row",
              fields: [
                { name: "apHeadingPrefix", type: "text", defaultValue: "Omni-channel, data-backed,", admin: { width: "50%" } },
                { name: "apHeadingAccent", type: "text", defaultValue: "creative-fueled.", admin: { width: "50%" } },
              ],
            },
            {
              name: "apLede",
              type: "textarea",
              defaultValue: "Our four-step operating system — refined across 300+ campaigns and 40+ industries — makes growth measurable, repeatable, and quietly obsessive.",
            },
            {
              name: "apSteps",
              type: "array",
              labels: { singular: "Step", plural: "Steps" },
              minRows: 1,
              fields: [
                { name: "num", type: "text", required: true, admin: { description: "e.g. \"01\"." } },
                { name: "kind", type: "text", admin: { description: "Short tag, e.g. \"Discover\"." } },
                { name: "title", type: "text", required: true },
                { name: "desc", type: "textarea" },
                {
                  name: "chips",
                  type: "array",
                  labels: { singular: "Chip", plural: "Chips" },
                  fields: [{ name: "label", type: "text", required: true }],
                },
                { name: "image", type: "upload", relationTo: "media" },
              ],
            },
          ],
        },
        {
          name: "logoBand",
        label: "Logo band",
          fields: [
            { name: "lbCaption", type: "text", defaultValue: "— 09 / Trusted · Meta · Google · Amazon · Shopify certified" },
            {
              name: "lbBrandsA",
              type: "array",
              labels: { singular: "Brand", plural: "Top-band brands" },
              admin: { description: "Top marquee (scrolls left)." },
              fields: [{ name: "name", type: "text", required: true }],
            },
            {
              name: "lbBrandsB",
              type: "array",
              labels: { singular: "Stat", plural: "Bottom-band stats" },
              admin: { description: "Bottom marquee (lime accent, scrolls right)." },
              fields: [{ name: "name", type: "text", required: true }],
            },
          ],
        },
        {
          name: "voicesFooterCta",
        label: "Voices · Footer CTA",
          fields: [
            {
              name: "voicesHeadingPrefix",
              type: "text",
              defaultValue: "What the",
            },
            { name: "voicesHeadingAccent", type: "text", defaultValue: "people paying us" },
            { name: "voicesHeadingSuffix", type: "text", defaultValue: "say." },
            {
              name: "ctaEyebrow",
              type: "text",
              defaultValue: "— Your next chapter",
            },
            {
              name: "ctaHeading",
              type: "text",
              defaultValue: "Engineer your next growth chapter with us.",
            },
            {
              name: "ctaAccent",
              type: "text",
              defaultValue: "next growth chapter",
              admin: { description: "Substring of the heading to italicise as accent." },
            },
          ],
        },
        {
          name: "seo",
        label: "SEO",
          fields: [
            { name: "seoTitle", type: "text", admin: { description: "Page title. Falls back to site default." } },
            { name: "seoDescription", type: "textarea" },
            { name: "seoOgImage", type: "upload", relationTo: "media" },
          ],
        },
      ],
    },
  ],
};

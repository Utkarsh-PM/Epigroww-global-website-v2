import SmoothScrollProvider from "../../components/providers/SmoothScrollProvider";
import ScrollTriggerCleanup from "../../components/providers/ScrollTriggerCleanup";
import PageShell from "../../components/providers/PageShell";
import CustomCursor from "../../components/cursor/CustomCursor";
import Nav from "../../components/navigation/Nav";
import MenuProvider from "../../components/navigation/MenuProvider";
import Footer from "../../components/footer/Footer";
import { GlobalJsonLd } from "../../components/seo/JsonLd";
import "./globals.scss";

const SITE_URL = "https://epigrowwglobal.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Epigroww Global — Growth. Engineered Globally.",
    template: "%s",
  },
  description:
    "Epigroww Global is an integrated marketing & advertising solutions company — brand, media, technology and AI. 500+ clients across 40+ industries, delivered from Delhi, Mumbai, Dubai & Toronto.",
  keywords: [
    "integrated marketing agency India",
    "advertising agency Delhi",
    "performance marketing agency",
    "brand and media agency",
    "ecommerce marketing agency",
    "AI marketing solutions",
    "marketing agency Dubai",
    "marketing agency Toronto",
    "marketplace management India",
    "Epigroww Global",
  ],
  applicationName: "Epigroww Global",
  authors: [{ name: "Epigroww Global" }],
  creator: "Epigroww Global",
  publisher: "Epigroww Global Private Limited",
  category: "Marketing & Advertising",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Epigroww Global",
    title: "Epigroww Global — Growth. Engineered Globally.",
    description:
      "Integrated marketing & advertising solutions — brand, media, tech and AI. Delivered from Delhi, Mumbai, Dubai & Toronto.",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Epigroww Global",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Epigroww Global — Growth. Engineered Globally.",
    description:
      "Integrated marketing & advertising solutions — brand, media, tech and AI.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // verification: { google: "PASTE-GSC-VERIFICATION-CODE-HERE" },
};

// Inlined into <head> so it runs BEFORE paint — prevents a flash of wrong theme
// AND tells the browser not to restore scroll on refresh (Lenis-powered smooth
// scrolling fights with the browser's auto restore; users expect refresh → top).
const themeBootScript = `
  (function() {
    try {
      var stored = localStorage.getItem('epg-theme');
      var theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    try {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      // Cancel any pre-paint scroll the browser may have queued.
      window.scrollTo(0, 0);
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <GlobalJsonLd />
      </head>
      <body>
        <SmoothScrollProvider>
          <ScrollTriggerCleanup />
          <CustomCursor />
          <MenuProvider>
            <Nav />
            <PageShell>{children}</PageShell>
            <Footer />
          </MenuProvider>
          <div className="grain-overlay" aria-hidden="true" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

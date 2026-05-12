import SmoothScrollProvider from "../../components/providers/SmoothScrollProvider";
import ScrollTriggerCleanup from "../../components/providers/ScrollTriggerCleanup";
import PageShell from "../../components/providers/PageShell";
import CustomCursor from "../../components/cursor/CustomCursor";
import Nav from "../../components/navigation/Nav";
import MenuProvider from "../../components/navigation/MenuProvider";
import Footer from "../../components/footer/Footer";
import "./globals.scss";

export const metadata = {
  title: "Epigroww Global — Growth. Engineered Globally.",
  description:
    "Epigroww Global is an integrated growth partner operating at the intersection of brand, media, and technology. 500+ clients across 40+ industries, delivered from Delhi, Mumbai, Dubai & Toronto.",
  icons: { icon: "/favicon.svg" },
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

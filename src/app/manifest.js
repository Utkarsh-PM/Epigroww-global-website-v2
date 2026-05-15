export default function manifest() {
  return {
    name: 'Epigroww Global',
    short_name: 'Epigroww',
    description:
      'Integrated marketing & advertising solutions — brand, media, tech and AI. Delivered from Delhi, Mumbai, Dubai & Toronto.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

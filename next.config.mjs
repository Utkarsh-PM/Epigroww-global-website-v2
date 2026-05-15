/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
  async redirects() {
    return [
      // Force apex (epigrowwglobal.com) as canonical. Any www.* request gets 301'd.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.epigrowwglobal.com' }],
        destination: 'https://epigrowwglobal.com/:path*',
        permanent: true,
      },

      // Legacy WordPress URLs → new App Router paths.
      // Next.js auto-handles trailing slashes, so /about-us and /about-us/ both match.
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/our-work', destination: '/work', permanent: true },
      { source: '/our-work-dev', destination: '/work', permanent: true },
      { source: '/terms-conditions', destination: '/terms-and-conditions', permanent: true },
      { source: '/technology-solution', destination: '/tech-solutions', permanent: true },
      { source: '/eg-commerce', destination: '/ecommerce-solutions', permanent: true },

      // Legacy sub-brand pages → their nearest equivalent service page.
      { source: '/epigroww-digital', destination: '/media-solutions', permanent: true },
      { source: '/epigroww-creators', destination: '/brand-solutions', permanent: true },
      { source: '/epigroww-productions', destination: '/brand-solutions', permanent: true },

      // Legacy hub/category pages → home or work.
      { source: '/industries', destination: '/work', permanent: true },
      { source: '/research-solutions', destination: '/', permanent: true },
      { source: '/consulting-services', destination: '/', permanent: true },
      { source: '/solutions', destination: '/', permanent: true },

      // Legacy WordPress drafts/landers/utility pages → home.
      { source: '/sample-home-page', destination: '/', permanent: true },
      { source: '/homedraft', destination: '/', permanent: true },
      { source: '/landingpage1', destination: '/', permanent: true },
      { source: '/new', destination: '/', permanent: true },
      { source: '/podcast', destination: '/', permanent: true },
      { source: '/mc-case-study', destination: '/work', permanent: true },
      { source: '/d2c-calculator', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;

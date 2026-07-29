const SITE = 'https://epigrowwglobal.com';

export default function sitemap() {
  const now = new Date();

  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/work', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/case-studies', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/media-solutions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/brand-solutions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/tech-solutions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ai-solutions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/ecommerce-solutions', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/careers', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/questionnaire', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms-and-conditions', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/refunds-policy', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map((r) => ({
    url: `${SITE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}

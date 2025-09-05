import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://china-victory-parade.vercel.app';
  const currentDate = new Date().toISOString();

  const staticPages = [
    {
      url: '/',
      lastModified: currentDate,
      changeFreq: 'monthly',
      priority: '1.0'
    },
    {
      url: '/timeline/',
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/equipment/',
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: '0.9'
    },
    {
      url: '/gallery/',
      lastModified: currentDate,
      changeFreq: 'weekly',
      priority: '0.8'
    }
  ];

  // Equipment pages
  const equipmentPages = [
    'type-99a2',
    'j-20',
    'df-41'
  ].map(slug => ({
    url: `/equipment/${slug}/`,
    lastModified: currentDate,
    changeFreq: 'monthly',
    priority: '0.7'
  }));

  // Timeline pages
  const timelinePages = [
    '1949',
    '1984',
    '1999',
    '2009',
    '2015',
    '2019'
  ].map(year => ({
    url: `/timeline/${year}/`,
    lastModified: currentDate,
    changeFreq: 'monthly',
    priority: '0.7'
  }));

  const allPages = [...staticPages, ...equipmentPages, ...timelinePages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en${page.url}" />
    <xhtml:link rel="alternate" hreflang="zh" href="${baseUrl}/zh${page.url}" />
  </url>`).join('\n')}
</urlset>`.trim();

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `
User-agent: *
Allow: /

# Sitemap
Sitemap: https://china-victory-parade.vercel.app/sitemap.xml

# Block access to sensitive paths
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /private/

# Allow access to media files
Allow: /images/
Allow: /videos/
Allow: /models/
Allow: /static/

# Crawl delay for large media files
Crawl-delay: 1
  `.trim();

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/en/admin/']
      }
    ],
    sitemap: 'https://www.nova-baie.com/sitemap.xml',
    host: 'https://www.nova-baie.com'
  }
}

import { MetadataRoute } from 'next'

const baseUrl = 'https://www.nova-baie.com'
const lastModified = new Date()

const routes = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/realisations', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/actualites', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/a-propos', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
  { path: '/mentions-legales', priority: 0.2, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const frRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))

  const enRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}/en${path}`,
    lastModified,
    changeFrequency,
    priority: priority * 0.9,
  }))

  return [...frRoutes, ...enRoutes]
}

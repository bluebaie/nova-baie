import { MetadataRoute } from 'next'
import { publishedCaseStudies } from '@/lib/projects'

const baseUrl = 'https://www.nova-baie.com'

const routes = [
  { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/realisations', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/actualites', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/a-propos', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const frRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
  }))

  const enRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}/en${path}`,
    changeFrequency,
    priority: priority * 0.9,
  }))

  const cases = publishedCaseStudies.flatMap(project => ([
    { url: `${baseUrl}/realisations/${project.slug}`, changeFrequency: 'monthly' as const, priority: 0.72 },
    { url: `${baseUrl}/en/realisations/${project.slug}`, changeFrequency: 'monthly' as const, priority: 0.65 },
  ]))
  return [...frRoutes, ...enRoutes, ...cases]
}

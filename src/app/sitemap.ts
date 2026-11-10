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

// Every URL declares its French/English alternates so Google pairs both versions.
const languages = (path: string) => ({ languages: { fr: `${baseUrl}${path}`, en: `${baseUrl}/en${path}`, 'x-default': `${baseUrl}${path}` } })

export default function sitemap(): MetadataRoute.Sitemap {
  const frRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    changeFrequency,
    priority,
    alternates: languages(path),
  }))

  const enRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}/en${path}`,
    changeFrequency,
    priority: priority * 0.9,
    alternates: languages(path),
  }))

  const cases = publishedCaseStudies.flatMap(project => {
    const path = `/realisations/${project.slug}`
    // The flagship case study is ranked just below the main commercial pages.
    const priority = project.flagship ? 0.8 : 0.72
    return [
      { url: `${baseUrl}${path}`, changeFrequency: 'monthly' as const, priority, alternates: languages(path) },
      { url: `${baseUrl}/en${path}`, changeFrequency: 'monthly' as const, priority: Math.round(priority * 0.9 * 100) / 100, alternates: languages(path) },
    ]
  })
  return [...frRoutes, ...enRoutes, ...cases]
}

import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/ui/container'
import { SectionHeading } from '@/components/ui/section-heading'
import { projects } from '@/lib/site-data'
import { ProjectCard } from '@/components/shared/project-card'
import { Button } from '@/components/ui/button'

export async function WorkPreviewSection() {
  const t = await getTranslations('work')
  const translatedProjects = t.raw('projects') as Array<{
    title: string
    category: string
    description: string
    tags: string[]
    stats: string
  }>

  const mergedProjects = projects.map((p, i) => ({
    ...p,
    ...(translatedProjects[i] ?? {}),
  }))

  return (
    <section className="section-padding bg-nova-sand">
      <Container>
        <SectionHeading
          eyebrow={t('eyebrow')}
          title={t('title')}
          description={t('description')}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {mergedProjects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-10">
          <Button href="/realisations" variant="secondary">{t('cta')}</Button>
        </div>
      </Container>
    </section>
  )
}

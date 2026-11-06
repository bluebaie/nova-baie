import { getTranslations } from 'next-intl/server';
import { PenTool, Workflow, ArrowUpRight, Compass } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Link } from '@/lib/navigation';
import { capabilityGroups } from '@/lib/expertises';

const icons = { create: PenTool, connect: Workflow, develop: Compass };
const destinations = { create: 'identity', connect: 'automation', develop: 'web' };
export async function CapabilitiesSection() {
  const t = await getTranslations('capabilities');
  const visual = await getTranslations('visual');
  return <section className="section-padding" aria-labelledby="capabilities-title"><Container>
    <div className="section-intro" data-reveal><div><p className="eyebrow">{visual('capabilities')}</p><h2 id="capabilities-title">{t('title')}</h2></div></div>
    <div className="capability-grid">{capabilityGroups.map((id, index) => { const Icon = icons[id]; return <article key={id} className="capability" data-reveal>
      <div className="capability-top"><span className="capability-icon"><Icon size={24} aria-hidden="true" /></span><span aria-hidden="true">0{index + 1}</span></div>
      <h3>{t(`${id}.title`)}</h3><p>{t(`${id}.description`)}</p>
      <Link href={`/services#${destinations[id]}`} className="text-link">{visual('discover')}<ArrowUpRight aria-hidden="true" /></Link>
    </article>; })}</div>
  </Container></section>;
}

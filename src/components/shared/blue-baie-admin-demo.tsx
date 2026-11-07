'use client';

import { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, CalendarDays, ChartNoAxesCombined, ChevronDown, CircleCheck, FileText, Home, LayoutDashboard, Link2, LockKeyhole, Sparkles, WalletCards, Wrench } from 'lucide-react';

type Locale = 'fr' | 'en';
const demoData = {
  fr: {
    eyebrow: 'PLATEFORME MÉTIER · APERÇU INTERACTIF', title: 'Derrière chaque séjour, une plateforme qui orchestre l’activité.',
    intro: 'Une reconstitution d’interface pour illustrer les familles d’outils du projet. Les écrans ci-dessous sont conçus pour cette étude de cas et ne sont pas des captures du logiciel Blue Baie.',
    disclaimer: 'Interface de démonstration — données fictives', modules: [
      ['Vue d’ensemble', 'Dashboard'], ['Réservations', 'Calendrier'], ['Logements', 'Portefeuille'], ['Fiche logement', 'Pilotage'], ['Facturation', 'Exports'], ['Contenus', 'Édition'], ['Visibilité & SEO', 'Analyse'], ['Intégrations & IA', 'Écosystème'],
    ],
    workspace: 'Espace de démonstration', range: 'Semaine du 12 au 18 octobre', occupancy: 'Séjours actifs', arrivals: 'Arrivées aujourd’hui', tasks: 'À coordonner', revenues: 'Relevé fictif', properties: 'Logements démo', activity: 'Activité récente', reservations: 'Planning des séjours', owner: 'Propriétaires', manage: 'Gestion des contenus', visibility: 'Visibilité de démonstration', integrations: 'Connexions documentées', concept: 'Piste à qualifier', fictiveMetrics: 'Données et indicateurs entièrement fictifs',
  },
  en: {
    eyebrow: 'BUSINESS PLATFORM · INTERACTIVE PREVIEW', title: 'Behind every stay, a platform coordinating the operation.',
    intro: 'An interface recreation illustrating the project’s tool families. The screens below were designed for this case study and are not screenshots of Blue Baie software.',
    disclaimer: 'Demonstration interface — fictional data', modules: [
      ['Overview', 'Dashboard'], ['Reservations', 'Calendar'], ['Properties', 'Portfolio'], ['Property file', 'Operations'], ['Billing', 'Exports'], ['Content', 'Editing'], ['Visibility & SEO', 'Analytics'], ['Integrations & AI', 'Ecosystem'],
    ],
    workspace: 'Demonstration workspace', range: 'Week of October 12–18', occupancy: 'Active stays', arrivals: 'Arrivals today', tasks: 'To coordinate', revenues: 'Fictional statement', properties: 'Demo properties', activity: 'Recent activity', reservations: 'Stay schedule', owner: 'Owners', manage: 'Content management', visibility: 'Demonstration visibility', integrations: 'Documented connections', concept: 'Concept to validate', fictiveMetrics: 'All data and indicators are fictional',
  },
} as const;

const calendarRows = [
  { property: 'La Dune Claire', cells: ['•', '•', '·', '·', '·', '•', '•'] },
  { property: 'Les Galets Bleus', cells: ['·', '•', '•', '•', '·', '·', '·'] },
  { property: 'La Maison des Pins', cells: ['•', '•', '•', '·', '·', '•', '•'] },
];
const demoBookings = [
  { guest: 'Camille Durand', stay: '12 — 14 oct.', property: 'La Dune Claire', state: 'Confirmé' },
  { guest: 'Alex Martin', stay: '13 — 17 oct.', property: 'Les Galets Bleus', state: 'À préparer' },
  { guest: 'Lou Bernard', stay: '15 — 18 oct.', property: 'La Maison des Pins', state: 'Confirmé' },
];

export function BlueBaieAdminDemo({ locale }: { locale: string }) {
  const lang: Locale = locale === 'en' ? 'en' : 'fr';
  const t = demoData[lang];
  const [active, setActive] = useState(0);
  const english = lang === 'en';

  return <section id="bb-admin-section" className="bb-admin-demo section-padding" aria-labelledby="bb-admin-title">
    <div className="container">
      <header className="bb-admin-heading"><p className="bb-eyebrow">{t.eyebrow}</p><h2 id="bb-admin-title">{t.title}</h2><p>{t.intro}</p></header>
      <div className="bb-admin-shell">
        <div className="bb-demo-ribbon"><span><LockKeyhole size={14} aria-hidden="true"/>{t.disclaimer}</span><span>{t.fictiveMetrics}</span></div>
        <div className="bb-admin-app">
          <aside className="bb-admin-sidebar" aria-label={english ? 'Demo module navigation' : 'Navigation des modules de démonstration'}>
            <div className="bb-admin-brand"><span className="bb-admin-brand-mark" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><path d="M3 22c5-9 9-9 14 0s9 9 16 0M3 27c5-5 9-5 14 0s9 5 16 0"/></svg></span><span>BLUE BAIE<small>{english ? 'Concierge · demo' : 'Conciergerie · démo'}</small></span></div>
            <nav role="tablist" aria-label={english ? 'Platform modules' : 'Modules de la plateforme'} aria-orientation="vertical">
              {t.modules.map(([title, short], index) => <button key={title} type="button" role="tab" id={`bb-demo-tab-${index}`} aria-label={`${title} — ${short}`} aria-selected={active === index} aria-controls="bb-demo-panel" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
                event.preventDefault(); const next = (index + (event.key === 'ArrowDown' ? 1 : -1) + t.modules.length) % t.modules.length;
                setActive(next); document.getElementById(`bb-demo-tab-${next}`)?.focus();
              }}><span className="bb-admin-nav-icon">{[<LayoutDashboard key="d"/>,<CalendarDays key="c"/>,<Home key="h"/>,<Wrench key="w"/>,<WalletCards key="f"/>,<FileText key="t"/>,<ChartNoAxesCombined key="s"/>,<Link2 key="l"/>][index]}</span><span>{title}</span>{active === index && <span className="bb-admin-active-dot" aria-hidden="true"/>}</button>)}
            </nav>
            <div className="bb-admin-sidebar-note"><span className="bb-demo-status-dot"/> {english ? 'Illustrative workspace' : 'Espace illustratif'}</div>
          </aside>
          <div className="bb-admin-main">
            <div className="bb-admin-topbar"><div><span>{t.workspace}</span><strong>{t.modules[active][0]} <ChevronDown size={14}/></strong></div><div className="bb-demo-user"><span>Démo</span><span aria-hidden="true">DB</span></div></div>
            <div className="bb-admin-content" role="tabpanel" id="bb-demo-panel" aria-labelledby={`bb-demo-tab-${active}`} tabIndex={0} key={active}>
              <div className="bb-admin-panel-heading"><div><p>{t.workspace}</p><h3>{t.modules[active][0]}</h3></div><span className="bb-demo-date"><CalendarDays size={14}/>{t.range}</span></div>
              {active === 0 && <>
                <div className="bb-demo-kpis">{[[t.occupancy,'18','sur 24'],[t.arrivals,'04',english?'planned':'prévues'],[t.tasks,'07',english?'open items':'éléments ouverts'],[t.properties,'24',english?'illustrative':'illustratifs']].map(([label,value,note])=><article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small><i aria-hidden="true"><ChartNoAxesCombined/></i></article>)}</div>
                <div className="bb-demo-lower"><div className="bb-demo-card"><div className="bb-demo-card-heading"><strong>{t.activity}</strong><span>{english?'Sample':'Exemple'}</span></div>{demoBookings.slice(0,2).map(row=><div className="bb-demo-activity" key={row.guest}><span className="bb-demo-avatar">{row.guest.split(' ').map(n=>n[0]).join('')}</span><div><strong>{row.guest}</strong><small>{row.property}</small></div><span className="bb-demo-state">{row.state}</span></div>)}</div><div className="bb-demo-card bb-demo-chart"><div className="bb-demo-card-heading"><strong>{english?'Weekly activity':'Activité de la semaine'}</strong><span>{english?'Illustrative':'Illustrative'}</span></div><div className="bb-demo-bars" role="img" aria-label={t.fictiveMetrics}>{[38,58,45,82,66,94,54].map((height,index)=><i key={index} style={{height:`${height}%`}}/>)}</div><div className="bb-demo-days">{(english?['M','T','W','T','F','S','S']:['L','M','M','J','V','S','D']).map((day,index)=><span key={index}>{day}</span>)}</div></div></div>
              </>}
              {active === 1 && <div className="bb-demo-card bb-demo-calendar"><div className="bb-demo-card-heading"><strong>{t.reservations}</strong><span className="bb-demo-legend"><i/> {english?'Stay':'Séjour'} <i/> {english?'Turnover':'Rotation'}</span></div><div className="bb-calendar-grid"><div className="bb-calendar-days"><span/>{(english?['Mon 12','Tue 13','Wed 14','Thu 15','Fri 16','Sat 17','Sun 18']:['Lun 12','Mar 13','Mer 14','Jeu 15','Ven 16','Sam 17','Dim 18']).map(day=><span key={day}>{day}</span>)}</div>{calendarRows.map((row,index)=><div className="bb-calendar-row" key={row.property}><strong>{row.property}</strong><div>{row.cells.map((cell,day)=><i key={day} className={cell==='•'?`is-booked is-tone-${index}`:''}/>)}</div></div>)}</div><p className="bb-demo-caption">{t.fictiveMetrics}</p></div>}
              {active === 2 && <div className="bb-demo-property-grid">{[['Les Galets Bleus','Quend · 4 voyageurs','Disponible'],['La Dune Claire','Saint-Valery · 6 voyageurs','En séjour'],['La Maison des Pins','Le Crotoy · 5 voyageurs','Préparation']].map(([name,meta,status],i)=><article className="bb-demo-property" key={name}><div className={`bb-demo-property-visual visual-${i}`}><Home aria-hidden="true"/><span>{english?'DEMO PROPERTY':'LOGEMENT DÉMO'}</span></div><div><strong>{name}</strong><small>{meta}</small><span className="bb-demo-state">{status}</span></div></article>)}</div>}
              {active === 3 && <div className="bb-demo-card bb-demo-file"><div className="bb-demo-file-cover"><Home/><span>{english?'FICTIONAL PROPERTY':'LOGEMENT FICTIF'}</span></div><div className="bb-demo-file-info"><div><p>{english?'Central property record':'Fiche logement centralisée'}</p><h4>La Dune Claire</h4><span>Saint-Valery-sur-Somme · 3 chambres</span></div><div className="bb-demo-file-modules">{(english?['Stay calendar','Owner relations','Operations','Billing']:['Calendrier des séjours','Relation propriétaire','Opérations','Facturation']).map((name,i)=><span key={name}><CircleCheck/>{name}<small>{i===0?'12':i===1?'03':'—'}</small></span>)}</div></div></div>}
              {active === 4 && <div className="bb-demo-card bb-demo-table"><div className="bb-demo-card-heading"><strong>{english?'Fictional statement':'Relevé de démonstration'}</strong><span className="bb-demo-action"><ArrowDownToLine size={15}/>{english?'Export example':'Exemple d’export'}</span></div><div className="bb-demo-table-row is-head"><span>{english?'Property':'Logement'}</span><span>{english?'Period':'Période'}</span><span>{english?'Sample amount':'Montant fictif'}</span><span>Status</span></div>{demoBookings.map((item,i)=><div className="bb-demo-table-row" key={item.guest}><span>{item.property}</span><span>{12+i}–{14+i} Oct.</span><span>{['€ 684','€ 912','€ 756'][i]}</span><span className="bb-demo-state">{english?'Example':'Exemple'}</span></div>)}<p className="bb-demo-caption">{english?'Illustrative entries only. No accounting data.':'Lignes illustratives uniquement. Aucune donnée comptable réelle.'}</p></div>}
              {active === 5 && <div className="bb-demo-editor"><div className="bb-demo-card bb-demo-edit-list"><div className="bb-demo-card-heading"><strong>{t.manage}</strong><FileText/></div>{['Guide de séjour','Découvrir la baie','Les services propriétaires'].map((name,i)=><div className="bb-demo-edit-item" key={name}><FileText/><span>{name}<small>{english?'Updated for demo':'Actualisé pour la démo'}</small></span><span className="bb-demo-state">{i===0?'Publié':'Brouillon'}</span></div>)}</div><div className="bb-demo-card bb-demo-edit-preview"><span>{english?'PUBLIC PAGE PREVIEW':'APERÇU DE PAGE PUBLIQUE'}</span><h4>{english?'A stay shaped by the Bay':'Un séjour au rythme de la baie'}</h4><p>{english?'A fictional editorial preview showing how public content can be structured.':'Un aperçu éditorial fictif montrant la structuration des contenus publics.'}</p><span className="bb-demo-action">{english?'Open preview':'Voir l’aperçu'} <ArrowUpRight/></span></div></div>}
              {active === 6 && <div className="bb-demo-seo"><div className="bb-demo-card bb-demo-seo-score"><span>{t.visibility}</span><strong>84<small>/100</small></strong><div className="bb-demo-score-ring"><span>SEO</span></div><p>{t.fictiveMetrics}</p></div><div className="bb-demo-card bb-demo-seo-checks">{(english?['Page titles','Image descriptions','Local content','Mobile experience']:['Titres des pages','Descriptions des images','Contenus locaux','Expérience mobile']).map((label,i)=><div key={label}><span><CircleCheck/>{label}</span><strong>{['92%','86%','78%','96%'][i]}</strong></div>)}</div></div>}
              {active === 7 && <div className="bb-demo-ecosystem"><div className="bb-demo-card bb-demo-connections"><div className="bb-demo-connection-node"><span>PUBLIC</span><strong>{english?'Website':'Site internet'}</strong><small>bluebaie.fr</small></div><div className="bb-demo-connection-lines"><i/><i/><i/></div><div className="bb-demo-connection-node"><span>INTEGRATION</span><strong>Beds24</strong><small>{english?'Booking engine':'Moteur de réservation'}</small></div><div className="bb-demo-connection-node"><span>OPERATIONS</span><strong>{english?'Business tools':'Outils métier'}</strong><small>{english?'Keycafe · Zoho':'Keycafe · Zoho'}</small></div><p>{english?'Integration names are shown as project scope; this diagram does not expose credentials, technical flows or production data.':'Les noms d’intégrations illustrent le périmètre du projet ; ce schéma ne révèle ni identifiants, ni flux techniques, ni données de production.'}</p></div><div className="bb-demo-card bb-demo-ai"><Sparkles/><span>{english?'AI / automation':'IA / automatisations'}</span><strong>{english?'Scope to qualify':'Périmètre à qualifier'}</strong><p>{english?'No AI capability is presented as delivered. Future use cases require validation.':'Aucune capacité IA n’est présentée comme livrée. Les usages futurs restent à valider.'}</p><span className="bb-demo-status-pill">{english?'Future direction':'Perspective future'}</span></div></div>}
              <div className="bb-demo-footer-note"><LockKeyhole size={13}/>{t.disclaimer}<span>{t.modules[active][1]}</span></div>
            </div>
          </div>
        </div>
        <div className="bb-demo-module-rail" aria-hidden="true">{t.modules.map((module,index)=><i key={module[0]} className={active===index?'active':''}/>)}</div>
      </div>
    </div>
  </section>;
}

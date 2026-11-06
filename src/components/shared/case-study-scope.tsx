import Image from 'next/image';

const positions = [
  { left: '17%', top: '27%' },
  { left: '50%', top: '13%' },
  { left: '83%', top: '27%' },
  { left: '17%', top: '73%' },
  { left: '50%', top: '87%' },
  { left: '83%', top: '73%' },
];

export function CaseStudyScope({ items, title, caption }: { items: string[]; title: string; caption: string }) {
  return <div className="case-scope-visual" data-scope-diagram>
    <p className="eyebrow">{title}</p>
    <div className="case-scope-map">
      <svg viewBox="0 0 1000 560" preserveAspectRatio="none" fill="none" aria-hidden="true">
        {items.map((_, index) => {
          const position = positions[index % positions.length];
          const x = Number.parseFloat(position.left) * 10;
          const y = Number.parseFloat(position.top) * 5.6;
          return <g key={index}><path data-draw d={`M500 280 Q${(x + 500) / 2} ${(y + 280) / 2 - 28} ${x} ${y}`} /><circle cx={x} cy={y} r="3" /></g>;
        })}
      </svg>
      <div className="case-scope-core"><Image src="/images/logo-blue-baie.png" alt="" width={72} height={72} /><span>Blue Baie</span></div>
      <ul aria-label={title}>
        {items.map((item, index) => <li key={item} style={positions[index % positions.length]}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>)}
      </ul>
    </div>
    <p className="case-scope-caption">{caption}</p>
  </div>;
}

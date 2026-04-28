type Props = {
  variant: 'header' | 'footer'
  linkedIn?: string
  instagram?: string
  facebook?: string
}

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-full w-full">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

const socials = [
  { key: 'linkedIn', label: 'LinkedIn', Icon: IconLinkedIn },
  { key: 'instagram', label: 'Instagram', Icon: IconInstagram },
  { key: 'facebook', label: 'Facebook', Icon: IconFacebook },
] as const

export function SocialLinks({
  variant,
  linkedIn = '#',
  instagram = '#',
  facebook = '#',
}: Props) {
  const hrefs: Record<string, string> = { linkedIn, instagram, facebook }

  if (variant === 'footer') {
    return (
      <div className="flex gap-3">
        {socials.map(({ key, label, Icon }) => (
          <a
            key={key}
            href={hrefs[key]}
            aria-label={label}
            target={hrefs[key] !== '#' ? '_blank' : undefined}
            rel={hrefs[key] !== '#' ? 'noopener noreferrer' : undefined}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-nova-navy/15 p-2 text-nova-navy/60 transition-all duration-200 hover:border-nova-navy/30 hover:bg-nova-horizon hover:text-nova-navy"
          >
            <Icon />
          </a>
        ))}
      </div>
    )
  }

  return (
    <div className="hidden items-center gap-1 md:flex">
      {socials.map(({ key, label, Icon }) => (
        <a
          key={key}
          href={hrefs[key]}
          aria-label={label}
          target={hrefs[key] !== '#' ? '_blank' : undefined}
          rel={hrefs[key] !== '#' ? 'noopener noreferrer' : undefined}
          className="flex h-8 w-8 items-center justify-center p-1.5 text-nova-navy/50 transition-colors duration-200 hover:text-nova-navy"
        >
          <Icon />
        </a>
      ))}
    </div>
  )
}

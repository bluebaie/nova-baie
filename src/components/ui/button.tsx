import { ArrowUpRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function Button({ href, children, variant = 'primary', className }: {
  href: string; children: React.ReactNode; variant?: 'primary' | 'secondary' | 'light' | 'dark'; className?: string;
}) {
  return <Link href={href} className={cn('button', `button-${variant}`, className)}><span>{children}</span><ArrowUpRight aria-hidden="true" /></Link>;
}

export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-nova-navy/10 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-nova-navy">
      {children}
    </span>
  );
}
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  className
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-200",
        variant === "primary" &&
          "bg-nova-navy text-white hover:bg-nova-blue",
        variant === "secondary" &&
          "border border-white/70 text-white backdrop-blur hover:border-white hover:bg-white/10",
        className
      )}
    >
      {children}
    </Link>
  );
}
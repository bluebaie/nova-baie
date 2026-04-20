import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Offer = {
  name: string;
  price: string;
  description: string;
  idealFor: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export function OfferCard({ offer }: { offer: Offer }) {
  return (
    <article
      className={cn(
        "card-premium flex h-full flex-col p-8",
        offer.highlighted && "border-nova-navy bg-nova-navy text-white"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className={cn(
              "text-sm uppercase tracking-[0.16em]",
              offer.highlighted ? "text-white/80" : "text-nova-text"
            )}
          >
            {offer.name}
          </p>
          <h3 className={cn("mt-3", offer.highlighted && "text-white")}>{offer.price}</h3>
        </div>
      </div>

      <p className={cn("mt-5", offer.highlighted && "text-white/85")}>
        {offer.description}
      </p>

      <div className="mt-6 rounded-2xl border border-current/10 p-4">
        <p className={cn("text-sm", offer.highlighted ? "text-white/80" : "text-nova-text")}>
          Idéal pour
        </p>
        <p className={cn("mt-2 text-base leading-7", offer.highlighted && "text-white")}>
          {offer.idealFor}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {offer.features.map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex items-start gap-3 text-sm leading-6",
              offer.highlighted ? "text-white/90" : "text-nova-text"
            )}
          >
            <Check className="mt-1 h-4 w-4 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          href="/contact"
          variant={offer.highlighted ? "secondary" : "primary"}
          className={offer.highlighted ? "border-white text-white hover:border-white hover:text-white" : ""}
        >
          {offer.cta}
        </Button>
      </div>
    </article>
  );
}
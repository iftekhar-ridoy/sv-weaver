import { LucideIcon } from "lucide-react";

interface Perk {
  Icon: LucideIcon;
  title: string;
  description: string;
}

interface PerksSectionProps {
  perks: Perk[];
}

export default function PerksSection({ perks }: PerksSectionProps) {
  return (
    <section className="bg-secondary/50 py-16 sm:py-24 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-8 text-center">
          {perks.map((perk) => (
            <div key={perk.title} className="flex flex-col items-center">
              <perk.Icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold">{perk.title}</h3>
              <p className="mt-1 text-muted-foreground text-sm">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { EXHIBITS, ExhibitTile } from "@/features/lab";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURED_SLUGS = ["proximity-reveal", "rocket-ship", "falling-emojis"];

export default function LabSection() {
  const featured = EXHIBITS.filter((exhibit) =>
    FEATURED_SLUGS.includes(exhibit.slug)
  );

  return (
    <section id="lab" className="mb-20 scroll-mt-[72px]">
      {/* Section Header */}
      <div className="mb-2 flex items-center gap-4">
        <h2 className="whitespace-nowrap text-lg">LAB</h2>
        <div className="h-px flex-1 bg-border" />
        <Link
          href="/lab"
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          All {EXHIBITS.length} specimens
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Section Description */}
      <p className="mb-6 text-sm text-muted-foreground">
        A working collection of animation and interaction studies. Every tile
        is live — try them.
      </p>

      {/* Featured exhibits — single column until lg so hairline rows stay full */}
      <div className="grid grid-cols-1 border-l border-t border-border lg:grid-cols-3">
        {featured.map((exhibit) => (
          <ExhibitTile key={exhibit.slug} exhibit={exhibit} />
        ))}
      </div>
    </section>
  );
}

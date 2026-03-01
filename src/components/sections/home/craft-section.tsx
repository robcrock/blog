import { Card } from "@/components/ui/card";
import { allCrafts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DISPLAY_COUNT = 6;

export default function CraftSection() {
  const crafts = allCrafts
    .filter((craft) => craft.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, DISPLAY_COUNT);

  if (crafts.length === 0) {
    return null;
  }

  const hasMore = allCrafts.filter((c) => c.published).length > DISPLAY_COUNT;

  return (
    <section id="craft" className="mb-20 scroll-mt-[72px]">
      {/* Section Header */}
      <div className="flex gap-4 items-center mb-2">
        <h2 className="text-lg whitespace-nowrap">CRAFT</h2>
        <div className="flex-1 h-px bg-border" />
        {hasMore && (
          <Link
            href="/craft"
            className="flex gap-1 items-center text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
          >
            See all
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Section Description */}
      <p className="mb-6 text-sm text-muted-foreground">
        Interactive experiments exploring the invisible details of interface
        design.
      </p>

      {/* Craft Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {crafts.map((craft) => (
          <Link
            key={craft.slug}
            href={craft.url}
            className="group focus-visible:outline-none"
          >
            <Card className="overflow-hidden ring-2 ring-transparent ring-offset-1 transition-all duration-200 focus-within:ring-primary hover:ring-primary">
              {/* Preview Media */}
              <div className="overflow-hidden relative w-full aspect-video bg-muted">
                {craft.video ? (
                  <>
                    {/* Blur placeholder — shows instantly while video loads */}
                    {craft.poster && (
                      <img
                        src={craft.poster}
                        alt=""
                        aria-hidden="true"
                        className="object-cover absolute inset-0 w-full h-full blur-xl scale-110"
                      />
                    )}
                    {/* Actual video with dual-format sources */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="object-cover absolute inset-0 w-full h-full"
                    >
                      <source
                        src={craft.video.replace(".mp4", ".webm")}
                        type="video/webm"
                      />
                      <source src={craft.video} type="video/mp4" />
                    </video>
                  </>
                ) : craft.image ? (
                  <Image
                    src={craft.image}
                    alt={craft.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(hsl(var(--muted-foreground)/0.1)_1px,transparent_1px)] [background-size:20px_20px]">
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {craft.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold transition-colors group-hover:text-primary">
                    {craft.title}
                  </h3>
                  <time
                    dateTime={craft.date}
                    className="text-sm text-muted-foreground"
                  >
                    {format(new Date(craft.date), "MMM yyyy")}
                  </time>
                </div>

                <p className="text-sm line-clamp-2 text-muted-foreground">
                  {craft.description}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

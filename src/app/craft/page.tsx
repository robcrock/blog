// src/app/craft/page.tsx
import Container from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { allCrafts } from "contentlayer/generated";
import { compareDesc, format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Craft | Robert Crocker",
  description:
    "Interactive experiments and deep-dives into the invisible details of interface design.",
};

export default function CraftPage() {
  const crafts = allCrafts
    .filter((craft) => craft.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <Container>
      {/* Page Header */}
      <header className="mb-8">
        <Link
          href="/#craft"
          className="inline-flex gap-2 items-center mb-6 text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
        >
          ← Back to home
        </Link>
        <h1 className="mb-4 text-4xl font-bold tracking-tighter sm:text-5xl">
          Craft
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Interactive experiments exploring the invisible details that make
          interfaces feel right. Each piece includes a live demo and a deep-dive
          into the how and why.
        </p>
      </header>

      {/* Craft Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {crafts.map((craft) => (
          <Link
            key={craft.slug}
            href={craft.url}
            className="group focus-visible:outline-none"
          >
            <Card className="overflow-hidden ring-2 ring-transparent ring-offset-1 transition-all duration-200 hover:ring-primary focus-within:ring-primary">
              {/* Preview Media */}
              <div className="relative w-full h-48 bg-muted">
                {craft.video ? (
                  <video
                    src={craft.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="object-cover w-full h-full"
                  />
                ) : craft.image ? (
                  <Image
                    src={craft.image}
                    alt={craft.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  // Fallback: subtle pattern background
                  <div className="flex items-center justify-center w-full h-full bg-[radial-gradient(hsl(var(--muted-foreground)/0.1)_1px,transparent_1px)] [background-size:20px_20px]">
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {craft.title.charAt(0)}
                    </span>
                  </div>
                )}

                {/* Hover indicator */}
                <div className="absolute top-3 right-3 p-1.5 bg-primary text-primary-foreground backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold transition-colors group-hover:text-primary">
                    {craft.title}
                  </h2>
                  <time
                    dateTime={craft.date}
                    className="text-sm text-muted-foreground"
                  >
                    {format(new Date(craft.date), "MMM yyyy")}
                  </time>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {craft.description}
                </p>

                {/* Tags */}
                {craft.tags && craft.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {craft.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {crafts.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>Craft pieces coming soon. Check back shortly.</p>
        </div>
      )}
    </Container>
  );
}

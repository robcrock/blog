import {
  CHAPTERS,
  EXHIBITS,
  LabGallery,
  exhibitsByChapter,
} from "@/features/lab";
import Container from "@/shared/layout/container";
import Link from "next/link";

export const metadata = {
  title: "Lab | Robert Crocker",
  description:
    "A gallery of live animation and interaction studies — SVG drawing, particle systems, cursor physics, and motion details you can play with.",
};

export default function LabPage() {
  return (
    <Container className="pt-8 pb-20">
      <header className="mb-12">
        <Link
          href="/#lab"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          ← Back to home
        </Link>

        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h1 className="text-balance text-4xl font-bold tracking-tighter sm:text-5xl">
            Lab
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground tabular-nums">
            {EXHIBITS.length} specimens · all live
          </p>
        </div>

        <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
          Animation and interaction studies built while figuring out how
          interfaces should feel — from cursor math to SVG drawing to particle
          systems. Nothing here is a screenshot. Go ahead and touch it.
        </p>
      </header>

      <div className="space-y-16">
        {CHAPTERS.map((chapter) => {
          const exhibits = exhibitsByChapter(chapter.id);
          if (exhibits.length === 0) return null;

          return (
            <section
              key={chapter.id}
              id={chapter.id}
              aria-label={chapter.title}
            >
              {/* Chapter header */}
              <div className="mb-2 flex items-baseline gap-4">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {chapter.numeral}
                </span>
                <h2 className="text-lg font-medium">{chapter.title}</h2>
                <div className="h-px flex-1 self-center bg-border" />
                <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                  {exhibits[0].number}–{exhibits[exhibits.length - 1].number}
                </span>
              </div>
              <p className="mb-6 max-w-2xl text-pretty text-sm text-muted-foreground">
                {chapter.intro}
              </p>

              <LabGallery exhibits={exhibits} />
            </section>
          );
        })}
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        Several of these grew into long-form write-ups —{" "}
        <Link
          href="/craft"
          className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
        >
          read the essays in Craft
        </Link>
        .
      </p>
    </Container>
  );
}

import Container from "@/components/layout/container";
import { Card } from "@/components/ui/card";
import { PROJECTS } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Work | Robert Crocker",
  description:
    "Pixel-perfect solutions to Frontend Mentor challenges, built with care.",
};

export default function ProjectsPage() {
  if (PROJECTS.length === 0) {
    return null;
  }

  return (
    <Container className="pt-8 pb-20">
      {/* Page Header */}
      <header className="mb-8">
        <Link
          href="/#projects"
          className="inline-flex gap-2 items-center mb-6 text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
        >
          ← Back to home
        </Link>
        <h1 className="mb-4 text-4xl font-bold tracking-tighter sm:text-5xl">
          Work
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Pixel-perfect solutions to Frontend Mentor challenges, built with care
          and attention to detail.
        </p>
      </header>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <Card
            key={project.link}
            className="ring-2 ring-transparent ring-offset-1 transition-all duration-200 group focus-within:ring-primary hover:ring-primary"
          >
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden relative w-full h-48 rounded focus-visible:outline-none"
              aria-label={`View ${project.title} on Frontend Mentor (opens in new tab)`}
              title={project.title}
            >
              <Image
                src={project.image}
                alt={project.title}
                className="transition-all duration-300 group-hover:scale-105"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                }}
              />
              {/* External link indicator */}
              <div className="absolute right-3 top-3 rounded-full bg-primary p-1.5 text-primary-foreground opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  );
}

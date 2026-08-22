import { Card } from "@/shared/components/card";
import type { Project } from "@/shared/lib/constants";
import { ArrowRight } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

interface ProjectCardProps {
  project: Project;
  headingLevel: "h2" | "h3";
  id?: string;
}

export function ProjectCard({ project, headingLevel, id }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <Card
      id={id}
      className="group/card overflow-hidden ring-2 ring-transparent ring-offset-1 transition-shadow duration-200 focus-within:ring-primary hover:ring-primary"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group/project block rounded focus-visible:outline-none"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            className="object-cover transition-transform duration-300 group-hover/project:scale-105"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{
              viewTransitionName: `projects-canvas-${project.slug}`,
            }}
          />
          <span className="absolute right-3 top-3 rounded-full bg-primary p-1.5 text-primary-foreground shadow backdrop-blur-sm">
            <ArrowRight aria-hidden className="size-4" />
          </span>
        </div>

        <div className="space-y-3 p-4">
          <div className="space-y-1.5">
            <Heading className="text-base font-semibold tracking-tight text-foreground">
              {project.title}
            </Heading>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </div>

          <ul aria-label="Technologies" className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </Card>
  );
}

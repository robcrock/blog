"use client";

import { ProjectCard } from "@/features/projects/project-card";
import { NAVIGATION_ITEMS, PROJECTS } from "@/shared/lib/constants";
import { Link } from "next-view-transitions";

const DISPLAY_COUNT = 6;

export default function ProjectsSection() {
  if (PROJECTS.length === 0) {
    return null;
  }

  const displayedProjects = PROJECTS.slice(0, DISPLAY_COUNT);
  const projectsNavItem = NAVIGATION_ITEMS.find(
    (item) => item.id === "projects"
  )!;

  return (
    <section id={projectsNavItem.id} className="scroll-mt-[72px] mb-20">
      {/* Section Header */}
      <div className="flex gap-4 items-center mb-2">
        <h2 className="text-lg whitespace-nowrap">
          {projectsNavItem.label}
        </h2>
        <div className="flex-1 h-px bg-border" />
        {projectsNavItem.page && (
          <Link
            href={projectsNavItem.page}
            className="text-sm font-medium whitespace-nowrap transition-colors text-muted-foreground hover:text-primary"
          >
            See all
          </Link>
        )}
      </div>

      {/* Section Description */}
      <p className="mb-6 text-sm text-muted-foreground">
        Pixel perfect execution of Frontend Mentor challenges.
      </p>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            id={`project-${index}`}
            project={project}
            headingLevel="h3"
          />
        ))}
      </div>
    </section>
  );
}

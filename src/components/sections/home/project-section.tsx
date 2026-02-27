"use client";

import { Card } from "@/components/ui/card";
import { NAVIGATION_ITEMS, PROJECTS } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
          <Card
            key={index}
            id={`project-${index}`}
            className="ring-2 ring-transparent ring-offset-1 transition-all duration-200 group hover:ring-primary focus-within:ring-primary"
          >
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden relative z-0 w-full h-48 rounded focus-visible:outline-none"
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
              <div className="absolute top-3 text-primary-foreground right-3 p-1.5 bg-primary backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}

"use client";

import { Card } from "@/components/ui/card";
import { NAVIGATION_ITEMS, PROJECTS } from "@/constants";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProjectsSection() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (PROJECTS.length === 0) {
    return null;
  }

  // const displayedProjects = PROJECTS.slice(0, DISPLAY_COUNT);
  const projectsNavItem = NAVIGATION_ITEMS.find(
    (item) => item.id === "projects"
  )!;

  return (
    <div>
      {/* Page Header */}
      <h2 className="text-lg whitespace-nowrap mv-2">
        {projectsNavItem.label}
      </h2>
      <div className="flex-1 mb-4 h-px bg-border" />

      {/* Section Description */}
      <p className="mb-6 text-sm text-muted-foreground">
        Frontend Mentor challenges—click any project to view the solution.
      </p>

      {/* Projects Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => (
          <Card
            key={index}
            id={`project-${index}`}
            className="ring-2 ring-transparent ring-offset-1 transition-all duration-200 group hover:ring-primary focus-within:ring-primary"
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
              <div className="absolute top-3 text-primary-foreground right-3 p-1.5 bg-primary backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}

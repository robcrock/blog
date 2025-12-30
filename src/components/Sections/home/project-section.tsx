"use client";

import { useState } from "react";

import section from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { NAVIGATION_ITEMS, PROJECTS } from "@/constants";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const INITIAL_DISPLAY_COUNT = 6;

export default function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);

  if (PROJECTS.length === 0) {
    return null;
  }

  const displayedProjects = showAll
    ? PROJECTS
    : PROJECTS.slice(0, INITIAL_DISPLAY_COUNT);
  const remainingCount = PROJECTS.length - INITIAL_DISPLAY_COUNT;

  const handleLoadMore = () => setShowAll(true);

  const projectsNavItem = NAVIGATION_ITEMS.find(
    (item) => item.id === "projects"
  )!;

  return (
    <section id={projectsNavItem.id} className="scroll-mt-[72px] mb-20">
      <div className="flex gap-4 items-center mb-6">
        <h2 className="text-lg whitespace-nowrap">{projectsNavItem.label}</h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="grid gap-2 mb-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project, index) => {
          const isNewlyRevealed = showAll && index >= INITIAL_DISPLAY_COUNT;
          const animationDelay = isNewlyRevealed
            ? `${(index - INITIAL_DISPLAY_COUNT) * 100}ms`
            : "0ms";

          return (
            <Card
              key={index}
              id={`project-${index}`}
              className={`p-1 group relative ring-2 ring-transparent ring-offset-1 transition-all duration-200 focus-within:ring-primary shadow-subtle overflow-hidden ${
                isNewlyRevealed ? "animate-fade-in-up" : ""}`}
              style={{
                animationDelay: isNewlyRevealed ? animationDelay : undefined,
              }}
            >
              <Link
                href={project.link}
                className="block overflow-hidden relative w-full h-48 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`View ${project.title} project`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  className="transition-all duration-300 hover:scale-105"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
              <CardContent className="group-hover:-translate-y-[0.25rem] absolute inset-x-1 bottom-0 translate-y-[calc(100%+0.25rem)] flex justify-between items-center py-1 px-3 transition-transform duration-400 ease-[cubic-bezier(1,0,0,1)] bg-[#FAFAFA]/95 rounded-sm shadow-subtle">
                <CardTitle className="text-md">{project.title}</CardTitle>
                <Link href={project.link} className="text-primary">
                  <ExternalLinkIcon className="w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {!showAll && remainingCount > 0 && (
        <div className="flex justify-center">
          <Button
            onClick={handleLoadMore}
            aria-label={`Reveal ${remainingCount} more portfolio projects`}
            aria-live="polite"
          >
            Show {remainingCount} More Projects
          </Button>
        </div>
      )}
    </section>
  );
}

import { ProjectCard } from "@/features/projects/project-card";
import Container from "@/shared/layout/container";
import { PROJECTS } from "@/shared/lib/constants";
import { Link } from "next-view-transitions";

export const metadata = {
  title: "Work",
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
          <ProjectCard key={project.slug} project={project} headingLevel="h2" />
        ))}
      </div>
    </Container>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: Project[] = [
  {
    title: "Project 1",
    description: "A sleek web application for managing personal finances.",
    image: "/images/featured-projects/article_preview_component.png",
    link: "#",
  },
  {
    title: "Project 2",
    description: "An AI-powered tool for optimizing workout routines.",
    image: "/images/featured-projects/blog_preview_card.png",
    link: "#",
  },
  {
    title: "Project 3",
    description: "A mobile app for tracking and reducing carbon footprint.",
    image: "/images/featured-projects/nft_preview_card.png",
    link: "#",
  },
  {
    title: "Project 4",
    description: "An e-commerce platform for sustainable products.",
    image: "/images/featured-projects/password_generator_app.png",
    link: "#",
  },
];

export default function FeaturedProjects() {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold">Featured Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                {project.description}
              </p>
              <Link
                href={project.link}
                className="inline-flex items-center text-primary hover:underline"
              >
                View Project
                <ExternalLink className="w-4 h-4 ml-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

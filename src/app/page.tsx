import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import avatar from "../../public/images/avatar.png";

interface Article {
  title: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
}

const articles: Article[] = [
  {
    title: "Article 1",
    description:
      "Short description of the article goes here. This gives a brief overview of what the reader can expect.",
  },
  {
    title: "Article 2",
    description:
      "Short description of the article goes here. This gives a brief overview of what the reader can expect.",
  },
  {
    title: "Article 3",
    description:
      "Short description of the article goes here. This gives a brief overview of what the reader can expect.",
  },
];

const projects: Project[] = [
  {
    title: "Project 1",
    description:
      "Brief description of the project and its main features or purpose.",
  },
  {
    title: "Project 2",
    description:
      "Brief description of the project and its main features or purpose.",
  },
  {
    title: "Project 3",
    description:
      "Brief description of the project and its main features or purpose.",
  },
  {
    title: "Project 4",
    description:
      "Brief description of the project and its main features or purpose.",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl px-4 py-8 mx-auto">
      <header className="flex items-center justify-between mb-12">
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="#" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Articles
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary">
                Uses
              </Link>
            </li>
          </ul>
        </nav>
        <Button variant="ghost" size="icon" className="rounded-full">
          <span className="sr-only">Toggle theme</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        </Button>
      </header>

      <section className="flex justify-start gap-6 mb-16 text-center">
        <Image
          src={avatar}
          alt="Robert Crocker"
          width={120}
          height={120}
          className="rounded-full"
        />
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-3xl font-bold">Robert Crocker</h1>
          <p className="text-xl text-muted-foreground">
            Developer, aspiring designer, life-long lifter and learner.
          </p>
          <div>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://twitter.com">
                <X size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://linkedin.com">
                <Linkedin size={20} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="mb-6 text-2xl font-bold">Recent Articles</h2>
        <div className="space-y-6">
          {articles.map((article, index) => (
            <div key={index} className="pb-6 border-b border-border">
              <h3 className="mb-2 text-xl font-semibold">
                <Link href="#" className="text-primary hover:underline">
                  {article.title}
                </Link>
              </h3>
              <p className="text-muted-foreground">{article.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link
                  href="#"
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Learn more
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

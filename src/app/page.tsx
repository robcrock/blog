"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Linkedin, Moon, Sun, X } from "lucide-react";
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
  image: string;
  link: string;
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
    description: "A sleek web application for managing personal finances.",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
  },
  {
    title: "Project 2",
    description: "An AI-powered tool for optimizing workout routines.",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
  },
  {
    title: "Project 3",
    description: "A mobile app for tracking and reducing carbon footprint.",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
  },
  {
    title: "Project 4",
    description: "An e-commerce platform for sustainable products.",
    image: "/placeholder.svg?height=200&width=300",
    link: "#",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {darkMode ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle dark mode</span>
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
        <h2 className="mb-6 text-2xl font-semibold">Featured Projects</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:shadow-xl hover:scale-105"
            >
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-48"
              />
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <Link
                  href={project.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View Project
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import FeaturedProjectSection from "@/components/FeaturedProjectSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Linkedin, Moon, Sun, Twitter } from "lucide-react";
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
    description:
      "Brief description of the project and its main features or purpose.",
    link: "#",
  },
  {
    title: "Project 2",
    description:
      "Brief description of the project and its main features or purpose.",
    link: "#",
  },
  {
    title: "Project 3",
    description:
      "Brief description of the project and its main features or purpose.",
    link: "#",
  },
  {
    title: "Project 4",
    description:
      "Brief description of the project and its main features or purpose.",
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
      <header className="flex items-center justify-between mb-16">
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
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="rounded-full"
        >
          {darkMode ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          <span className="sr-only">Toggle dark mode</span>
        </Button>
      </header>

      <section className="mb-16 text-center">
        <Image
          src={avatar}
          alt="John Doe"
          width={120}
          height={120}
          className="mx-auto mb-4 rounded-full"
        />
        <h1 className="mb-2 text-3xl font-bold">John Doe</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Developer, writer, and creator of useful things.
        </p>
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com">
              <Twitter size={20} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com">
              <Linkedin size={20} />
            </Link>
          </Button>
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

      <FeaturedProjectSection />
    </div>
  );
}

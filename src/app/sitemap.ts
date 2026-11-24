import { EXHIBITS } from "@/features/lab";
import { PROJECTS, SITE_URL } from "@/shared/lib/constants";
import { allCrafts, allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import type { MetadataRoute } from "next";

const STATIC_PATHS = ["/", "/posts", "/craft", "/lab", "/projects"] as const;

function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const crafts = allCrafts
    .filter((craft) => craft.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return [
    ...STATIC_PATHS.map((path) => ({ url: absoluteUrl(path) })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/posts/${post.slug}`),
      lastModified: new Date(post.date),
    })),
    ...crafts.map((craft) => ({
      url: absoluteUrl(`/craft/${craft.slug}`),
      lastModified: new Date(craft.date),
    })),
    ...EXHIBITS.map((exhibit) => ({
      url: absoluteUrl(`/lab/${exhibit.slug}`),
    })),
    ...PROJECTS.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
    })),
  ];
}

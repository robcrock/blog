import { promises as fs } from "fs";
import path from "path";
import { cache } from "react";

import { compileMDX } from "next-mdx-remote/rsc";

export interface Post {
  slug: string;
  title: string;
  topic?: string;
  date?: string;
  content?: string;
}

export interface Frontmatter {
  title: string;
  topic?: string;
  date?: string;
}

// Cache the post listing
export const getPosts = cache(async () => {
  const filenames = await fs.readdir(path.join(process.cwd(), "src/posts"));

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const content = await fs.readFile(
        path.join(process.cwd(), "src/posts", filename),
        "utf-8"
      );
      const { frontmatter } = await compileMDX<Frontmatter>({
        source: content,
        options: { parseFrontmatter: true },
      });

      return {
        slug: filename.replace(".mdx", ""),
        ...frontmatter,
      };
    })
  );

  return posts.filter((post) => post.title !== "Blog");
});

// Cache individual post content
export const getPost = cache(async (slug: string) => {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/posts", `${slug}.mdx`),
    "utf-8"
  );

  return content;
});

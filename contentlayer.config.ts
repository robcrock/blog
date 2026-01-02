// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer2/source-files";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// =============================================================================
// CRAFT - Interactive experiments with deep-dive explanations
// =============================================================================
export const Craft = defineDocumentType(() => ({
  name: "Craft",
  filePathPattern: "craft/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
      description: "The title of the craft piece",
    },
    date: {
      type: "date",
      required: true,
      description: "The publication date",
    },
    description: {
      type: "string",
      required: true,
      description: "A brief description for the preview card",
    },
    video: {
      type: "string",
      required: false,
      description:
        "Path to preview video (e.g., /craft/graph-slider/preview.mp4)",
    },
    image: {
      type: "string",
      required: false,
      description:
        "Fallback image if no video (e.g., /craft/graph-slider/cover.png)",
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: false,
      description:
        "Technologies or concepts used (e.g., ['SVG', 'offset-path', 'Framer Motion'])",
    },
    published: {
      type: "boolean",
      default: true,
      description: "Whether the craft piece is published",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("craft/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/craft/${doc._raw.flattenedPath.replace("craft/", "")}`,
    },
    readingTime: {
      type: "number",
      resolve: (doc) => {
        const wordsPerMinute = 200;
        const words = doc.body.raw.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
      },
    },
  },
}));

// =============================================================================
// POST - Blog posts (deprecated, keeping for backwards compatibility)
// =============================================================================
export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "posts/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
      description: "The title of the post",
    },
    topic: {
      type: "string",
      required: true,
      description: "The topic/category of the post",
    },
    date: {
      type: "date",
      required: true,
      description: "The publication date",
    },
    description: {
      type: "string",
      required: false,
      description: "A brief description for SEO and previews",
    },
    published: {
      type: "boolean",
      default: true,
      description: "Whether the post is published",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("posts/", ""),
    },
    url: {
      type: "string",
      resolve: (doc) =>
        `/posts/${doc._raw.flattenedPath.replace("posts/", "")}`,
    },
    readingTime: {
      type: "number",
      resolve: (doc) => {
        const wordsPerMinute = 200;
        const words = doc.body.raw.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
      },
    },
  },
}));

// =============================================================================
// SOURCE CONFIGURATION
// =============================================================================
export default makeSource({
  contentDirPath: "content",
  documentTypes: [Craft, Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            light: "github-light",
            dark: "github-dark",
          },
          keepBackground: true,
          onVisitLine(node: any) {
            // Prevent lines from collapsing in display
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: any) {
            node.properties.className.push("highlighted-line");
          },
          onVisitHighlightedChars(node: any) {
            node.properties.className = ["highlighted-chars"];
          },
        },
      ],
    ],
  },
});

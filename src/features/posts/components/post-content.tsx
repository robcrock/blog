import { promises as fs } from "fs";
import path from "path";

import { MdxContent } from "./mdx-content";

type PostContentProps = {
  postSlug: string;
};

const PostContent = async ({ postSlug }: PostContentProps) => {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/posts", `${postSlug}.mdx`),
    "utf-8"
  );

  return <MdxContent postContent={content} />;
};

export { PostContent };

import fs from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  topic: string;
  date: string;
};

export async function getAllPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "src/app/posts");
  
  // Get all directories in the posts folder
  const directories = fs.readdirSync(postsDirectory);
  
  const posts = await Promise.all(
    directories
      .filter(dir => {
        // Filter out non-post directories (like page.tsx)
        const fullPath = path.join(postsDirectory, dir);
        return fs.statSync(fullPath).isDirectory() && dir !== "[slug]";
      })
      .map(async (dir) => {
        try {
          // Try to import the MDX file to get its metadata
          const mdxPath = path.join(postsDirectory, dir, "page.mdx");
          
          if (fs.existsSync(mdxPath)) {
            // For now, we'll use a simple approach - read the file and extract metadata
            const fileContents = fs.readFileSync(mdxPath, "utf8");
            
            // Look for exported metadata in the MDX file
            const metadataMatch = fileContents.match(/export\s+const\s+metadata\s*=\s*({[\s\S]*?});/);
            
            if (metadataMatch) {
              // Parse the metadata object
              try {
                // eslint-disable-next-line no-eval
                const metadata = eval(`(${metadataMatch[1]})`);
                return {
                  slug: metadata.slug || dir,
                  title: metadata.title || dir,
                  topic: metadata.topic || "General",
                  date: metadata.date || new Date().toISOString().split('T')[0],
                };
              } catch (e) {
                console.error(`Error parsing metadata for ${dir}:`, e);
              }
            }
            
            // Fallback to directory name if no metadata found
            return {
              slug: dir,
              title: dir.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
              topic: "General",
              date: new Date().toISOString().split('T')[0],
            };
          }
          
          return null;
        } catch (error) {
          console.error(`Error reading post ${dir}:`, error);
          return null;
        }
      })
  );
  
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
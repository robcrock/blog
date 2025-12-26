import {
  ArticleSection,
  PostsSection,
  ProfileSection,
  ProjectSection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <ProfileSection />
      <ArticleSection />
      <ProjectSection />
      <PostsSection />
    </>
  );
}

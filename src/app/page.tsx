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
      <div className="flex flex-col gap-20">
        <ArticleSection />
        <ProjectSection />
        <PostsSection />
      </div>
    </>
  );
}

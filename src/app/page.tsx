import Header from "@/components/Header";
import {
  ArticleSection,
  FeaturedProjectSection,
  ProfileSection,
} from "@/components/Sections";

export default function Home() {
  return (
    <div className="container max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
      <Header />
      <ProfileSection />
      <ArticleSection />
      <FeaturedProjectSection />
    </div>
  );
}

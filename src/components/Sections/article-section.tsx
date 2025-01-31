import Link from "next/link";

interface Article {
  title: string;
  description: string;
}

// TODO: I would like to add articles by setting up MDX
const articles: Article[] = [];

export default function ArticleSection() {
  if (articles.length === 0) {
    return null;
  }

  return (
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
  );
}

// src/app/craft/[slug]/page.tsx
import { CraftDetailPage } from "@/features/craft";
import { allCrafts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface CraftPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all craft pieces
export async function generateStaticParams() {
  return allCrafts
    .filter((craft) => craft.published)
    .map((craft) => ({
      slug: craft.slug,
    }));
}

// Generate metadata for each craft piece
export async function generateMetadata({
  params,
}: CraftPageProps): Promise<Metadata> {
  const { slug } = await params;
  const craft = allCrafts.find((c) => c.slug === slug);

  if (!craft) {
    return {
      title: "Craft Not Found",
    };
  }

  // Use craft image or fallback to default OG image
  const ogImage = craft.image || "/og-image.png";
  const url = `https://robcrock.com/craft/${slug}`;

  return {
    title: craft.title,
    description: craft.description,
    openGraph: {
      type: "article",
      url,
      title: craft.title,
      description: craft.description,
      publishedTime: craft.date,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: craft.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: craft.title,
      description: craft.description,
      images: [ogImage],
    },
  };
}

export default async function Page({ params }: CraftPageProps) {
  const { slug } = await params;

  // Get all published crafts sorted by date
  const sortedCrafts = allCrafts
    .filter((c) => c.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const craftIndex = sortedCrafts.findIndex((c) => c.slug === slug);
  const craft = sortedCrafts[craftIndex];

  if (!craft) {
    notFound();
  }

  // Get prev/next for navigation
  const prevCraft =
    craftIndex < sortedCrafts.length - 1 ? sortedCrafts[craftIndex + 1] : null;
  const nextCraft = craftIndex > 0 ? sortedCrafts[craftIndex - 1] : null;

  return (
    <CraftDetailPage craft={craft} prevCraft={prevCraft} nextCraft={nextCraft} />
  );
}

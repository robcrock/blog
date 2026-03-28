// src/app/craft/page.tsx
import { CraftListPage } from "@/features/craft";
import { allCrafts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

export const metadata = {
  title: "Craft | Robert Crocker",
  description:
    "Interactive experiments and deep-dives into the invisible details of interface design.",
};

export default function CraftPage() {
  const crafts = allCrafts
    .filter((craft) => craft.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return <CraftListPage crafts={crafts} />;
}

import React from "react";

import { format } from "date-fns";
import Link from "next/link";

import Card from "../card";
import styles from "./BlogSummaryCard.module.css";

function BlogSummaryCard({
  slug,
  title,
  publishedOn,
  abstract,
}: {
  slug: string;
  title: string;
  publishedOn: string;
  abstract: string;
}) {
  const href = `/${slug}`;
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");

  return (
    <Card className={styles.wrapper}>
      <Link href={href} className={styles.title}>
        {title}
      </Link>
      <time dateTime={publishedOn}>{humanizedDate}</time>
      <p>
        {abstract}{" "}
        <Link href={href} className={styles.continueReadingLink}>
          Continue reading <span className={styles.arrow}>→</span>
        </Link>
      </p>
    </Card>
  );
}

export default BlogSummaryCard;

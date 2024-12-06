import React from "react";

import { cn } from "@/lib/utils";
import { format } from "date-fns";

import styles from "./BlogHero.module.css";

function BlogHero({
  title,
  publishedOn,
  className,
  ...delegated
}: {
  title: string;
  publishedOn: string;
  className?: string;
  [key: string]: any;
}) {
  const humanizedDate = format(new Date(publishedOn), "MMMM do, yyyy");

  return (
    <header className={cn(styles.wrapper, className)} {...delegated}>
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>
          Published on <time dateTime={publishedOn}>{humanizedDate}</time>
        </p>
      </div>
    </header>
  );
}

export default BlogHero;

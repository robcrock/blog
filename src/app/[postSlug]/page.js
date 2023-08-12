import React from "react"
import { MDXRemote } from "next-mdx-remote/rsc"

import BlogHero from "@/components/BlogHero"

import styles from "./postSlug.module.css"
import { loadBlogPost } from "@/helpers/file-helpers"

async function BlogPost({ params }) {
  const { content } = await loadBlogPost(params.postSlug)

  return (
    <article className={styles.wrapper}>
      <BlogHero title="Example post!" publishedOn={new Date()} />
      <div className={styles.page}>
        <MDXRemote source={content} />
      </div>
    </article>
  )
}

export default BlogPost

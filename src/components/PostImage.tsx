"use client";

import Image from "next/image";

export default function PostImage({ src }: { src: string }) {
  return (
    <Image
      src={src}
      alt="The Problem"
      width={800}
      height={600}
      priority
      className="rounded-lg"
    />
  );
}

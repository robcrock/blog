"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

interface PostImageProps {
  src: string;
  alt: string;
}

export default function PostImage({ src, alt }: PostImageProps) {
  return (
    <div className="w-full max-w-[450px] sm:max-w-[600px] lg:max-w-[800px] my-10 mx-auto px-4 sm:px-0">
      <AspectRatio ratio={16 / 9}>
        <Image
          width={800}
          height={450}
          src={src}
          alt={alt}
          className="object-cover rounded-md"
        />
      </AspectRatio>
    </div>
  );
}

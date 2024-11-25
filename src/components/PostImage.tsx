"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function PostImage({ src }: { src: string }) {
  return (
    <div className="w-[450px] my-10 mx-auto">
      <AspectRatio ratio={16 / 9}>
        <Image
          width={325}
          height={253}
          src={src}
          alt="Image"
          className="object-cover rounded-md"
        />
      </AspectRatio>
    </div>
  );
}

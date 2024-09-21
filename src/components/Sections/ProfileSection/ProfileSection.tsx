import { Button } from "@/components/ui/button";
import { Linkedin, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import avatar from "../../../../public/images/avatar.png";

export default function ProfileSection() {
  return (
    <section className="flex gap-10 mt-10 mb-20">
      <Image
        src={avatar}
        alt="Robert Crocker"
        width={120}
        height={120}
        className="border-2 rounded-full"
      />
      <div className="flex flex-col items-start justify-center gap-2">
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-3xl font-bold">Robert Crocker</h1>
          <p className="text-xl text-muted-foreground">
            Developer, writer, and creator of useful things.
          </p>
        </div>
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com">
              <X size={20} />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com">
              <Linkedin size={20} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

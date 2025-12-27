import { Button } from "@/components/ui/button";
import { SiGithub, SiMentorcruise, SiX } from "@icons-pack/react-simple-icons";
import { LucideLinkedin } from "lucide-react";
import Link from "next/link";

const links = [
  {
    href: "https://www.linkedin.com/in/robertcrocker/",
    icon: <LucideLinkedin size={20} />,
  },
  {
    href: "https://github.com/robcrock",
    icon: <SiGithub size={20} />,
  },
  {
    href: "https://x.com/robcrock",
    icon: <SiX size={20} />,
  },
  {
    href: "https://mentorcruise.com/mentor/robertcrocker/",
    icon: <SiMentorcruise />,
  },
];

export default function ProfileSection() {
  return (
    <section className="flex gap-10 mt-10 mb-14">
      <div className="flex flex-col gap-4 justify-center items-start">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary">
            Robert Crocker
          </h1>
          <p className="text-lg md:text-xl text-foreground">
            Developer, community builder, and creator of useful things.
          </p>
        </div>
        <div className="flex justify-center">
          {links.map(({ href, icon }) => {
            return (
              <Button
                key={href}
                variant="ghost"
                size="icon"
                render={<Link href={href} />}
              >
                {icon}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

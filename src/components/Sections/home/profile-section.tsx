import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
      <Avatar className="w-[120px] h-[120px] border-2">
        <AvatarImage src="/images/avatar.png" alt="Robert Crocker" />
        <AvatarFallback>RC</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2 justify-center items-start">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-3xl font-bold">Robert Crocker</h1>
          <p className="text-xl text-muted-foreground">
            Developer, community builder, and creator of useful things.
          </p>
        </div>
        <div className="flex justify-center">
          {links.map(({ href, icon }) => {
            return (
              <Button key={href} variant="ghost" size="icon" render={<Link href={href} />}>
                {icon}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

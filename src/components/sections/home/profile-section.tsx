import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants";
import { renderSocialIcon } from "@/lib/social-icons";
import Link from "next/link";

export default function ProfileSection() {
  return (
    <section className="flex gap-10 mt-10 mb-10">
      <div className="flex flex-col gap-2 justify-center items-start">
        <div className="flex flex-col justify-center items-start">
          <h1 className="text-5xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
            Robert Crocker
          </h1>
          <p className="text-lg md:text-xl text-foreground">
            Craft obsessed developer drawn to design.
          </p>
        </div>
        <div className="flex justify-center">
          {SOCIAL_LINKS.map(({ href, icon }) => {
            return (
              <Button
                key={href}
                variant="ghost"
                size="icon"
                render={<Link href={href} />}
              >
                {renderSocialIcon({ iconName: icon, size: 20 })}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

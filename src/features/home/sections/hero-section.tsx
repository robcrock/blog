import { Button } from "@/shared/components/button";
import { SOCIAL_LINKS } from "@/constants";
import { renderSocialIcon } from "@/shared/lib/social-icons";
import Link from "next/link";

import InteractiveDotGrid from "../components/interactive-dot-grid";

const HeroSection = () => {
  return (
    <section
      id="hero-section"
      className="grid overflow-hidden relative grid-cols-1 mb-16 md:mb-24 md:h-screen md:grid-cols-2"
    >
      {/* Left col: dot grid fills the full column */}
      <div className="overflow-hidden aspect-square md:aspect-auto md:h-full">
        <InteractiveDotGrid />
      </div>

      {/* Right col: name, tagline, socials — vertically centered */}
      <div className="flex flex-col gap-6 px-8 py-10 md:px-10 md:pt-44 lg:px-14">
        <div>
          <h1 className="text-5xl font-bold leading-none tracking-tighter md:text-7xl lg:text-8xl xl:text-[84px]">
            Robert
            <br />
            Crocker
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Craft obsessed developer who designs.
          </p>
        </div>

        <div className="flex gap-2 items-center">
          {SOCIAL_LINKS.map(({ href, icon }) => (
            <Button
              key={href}
              variant="ghost"
              size="icon"
              render={<Link href={href} />}
            >
              {renderSocialIcon({ iconName: icon, size: 24 })}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

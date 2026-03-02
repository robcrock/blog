import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/constants";
import { renderSocialIcon } from "@/lib/social-icons";

import InteractiveDotGrid from "./components/interactive-dot-grid";

const HeroSection = () => {
  return (
    <section id="hero-section" className="relative overflow-hidden -mt-[100px] md:-mt-[160px] py-6 md:py-10">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-10 lg:gap-14">
        {/* Left side: Dot Grid */}
        <div className="shrink-0 w-64 h-64 md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px]">
          <InteractiveDotGrid />
        </div>

        {/* Right side: Name & Socials — top-aligned, no logo */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6">
          <div>
            <h1 className="text-5xl font-bold tracking-tighter leading-none md:text-6xl lg:text-7xl xl:text-[84px]">
              Robert
              <br />
              Crocker
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Craft obsessed developer who designs.
            </p>
          </div>

          <div className="flex items-center gap-2">
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
      </div>
    </section>
  );
};

export default HeroSection;

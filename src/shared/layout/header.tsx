"use client";

import { useEffect, useState } from "react";

import { SOCIAL_LINKS } from "@/constants";
import { renderSocialIcon } from "@/shared/lib/social-icons";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/shared/brand/logo";
import { Button } from "@/shared/components/button";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Show header only after hero section has scrolled off screen
  const [heroInView, setHeroInView] = useState(true);

  useEffect(() => {
    if (!isHome) return;
    const hero = document.getElementById("hero-section");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHome]);

  const headerVisible = !isHome || !heroInView;

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          opacity: headerVisible ? 1 : 0,
          y: headerVisible ? 0 : "-100%",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          pointerEvents: headerVisible ? "auto" : "none",
        }}
        // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
        className="fixed left-0 right-0 top-0 z-[100] bg-background/95 backdrop-blur-sm"
      >
        <div className="container flex flex-col items-center px-4 py-2 mx-auto max-w-6xl md:flex-row">
          {/* Logo and name container - appears first on mobile */}
          <div className="flex gap-1 items-center -ml-3 w-full md:w-auto md:gap-4">
            <div className="shrink-0">
              <Link
                href="/"
                onClick={handleLogoClick}
                className="block rounded ring-offset-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Logo className="h-[54px] w-[54px] md:h-[68px] md:w-[68px]" />
              </Link>
            </div>

            <div className="flex flex-col justify-center items-start min-w-0 shrink-0">
              <h1 className="self-start text-2xl font-bold tracking-tighter whitespace-nowrap md:text-3xl lg:text-4xl">
                Robert Crocker
              </h1>

              <p className="text-sm text-muted-foreground md:text-base">
                Craft obsessed developer who designs.
              </p>
            </div>
          </div>

          {/* Social icons - appears below on mobile, to the right on desktop */}
          <div className="relative z-[101] flex w-full items-center gap-4 md:ml-auto md:w-auto">
            {/* Social icons */}
            <div className="hidden items-center md:ml-auto md:flex">
              {SOCIAL_LINKS.map(({ href, icon }) => (
                <Button
                  key={href}
                  variant="ghost"
                  size="icon"
                  render={<Link href={href} />}
                >
                  {renderSocialIcon({ iconName: icon, size: 20 })}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </motion.header>
      {/* Spacer so content isn't hidden under the fixed header on non-home pages */}
      {!isHome && <div className="h-[70px] md:h-[84px]" aria-hidden="true" />}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

import { SOCIAL_LINKS } from "@/constants";
import { renderSocialIcon } from "@/lib/social-icons";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../brand/logo";
import { Button } from "../ui/button";

const clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

function useBoundedScroll(bounds: number) {
  const { scrollY } = useScroll();
  const scrollYBounded = useMotionValue(0);
  const scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, bounds],
    [0, 1]
  );

  useEffect(() => {
    const onChange = (current: number) => {
      const previous = scrollY.getPrevious() ?? 0;
      const diff = current - previous;
      const newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds));
    };

    const unsubscribe = scrollY.on("change", onChange);
    return () => unsubscribe();
  }, [bounds, scrollY, scrollYBounded]);

  return { scrollY, scrollYBounded, scrollYBoundedProgress };
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMobile = useMediaQuery("(max-width: 767px)");

  const { scrollYBoundedProgress } = useBoundedScroll(200);

  const logoScale = useTransform(scrollYBoundedProgress, [0, 1], [1, 0.4]);
  const logoWidth = useTransform(scrollYBoundedProgress, [0, 1], [68, 27.2]); // 68 * 0.4

  const nameScale = useTransform(scrollYBoundedProgress, [0, 1], [1, 0.75]);

  // Track when to show subtext based on scroll progress
  const [showSubtext, setShowSubtext] = useState(true);
  useMotionValueEvent(scrollYBoundedProgress, "change", (latest) => {
    setShowSubtext(latest < 0.5);
  });

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
          height: headerVisible ? (isMobile ? 100 : 160) : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          pointerEvents: headerVisible ? "auto" : "none",
        }}
        // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
        className="fixed top-0 left-0 right-0 z-[100] overflow-hidden bg-background/95 backdrop-blur-sm"
      >
        <div className="container flex flex-col items-center px-4 py-2 mx-auto max-w-6xl md:flex-row">
      {/* Logo and name container - appears first on mobile */}
      <motion.div
        // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
        className="flex gap-1 items-center -ml-3 w-full md:w-auto md:gap-4"
      >
        {/* Logo - scales down on scroll */}
        <motion.div
          style={{
            scale: logoScale,
            width: logoWidth,
          }}
          // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
          className="origin-left shrink-0"
        >
          <Link
            href="/"
            onClick={handleLogoClick}
            className="block rounded ring-offset-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Logo className="mb-2 h-[54px] w-[54px] md:h-[68px] md:w-[68px]" />
          </Link>
        </motion.div>

        {/* Name and subtext container */}
        <motion.div
          layout
          transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
          // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
          className="flex flex-col justify-center items-start min-w-0 shrink-0"
        >
          {/* Name - scales down on scroll */}
          <motion.h1
            style={{ scale: nameScale, transformOrigin: "0% center" }}
            transition={{ duration: 0.2, ease: [0.455, 0.03, 0.515, 0.955] }}
            // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
            className="self-start text-2xl font-bold tracking-tighter whitespace-nowrap md:text-3xl lg:text-4xl"
          >
            Robert Crocker
          </motion.h1>

          {/* Subtext - exits on scroll */}
          <AnimatePresence>
            {showSubtext && (
              <motion.p
                layout
                initial={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
                className="overflow-hidden text-sm text-foreground md:text-base"
              >
                Craft obsessed developer who designs.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Social icons - appears below on mobile, to the right on desktop */}
      <motion.div
        // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
        className="relative z-[101] flex w-full items-center gap-4 md:ml-auto md:w-auto"
      >
        {/* Social icons */}
        <motion.div
          // @ts-expect-error - Framer Motion 11 + React 19 type compatibility issue
          className="hidden items-center md:ml-auto md:flex"
        >
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
        </motion.div>
      </motion.div>
        </div>
      </motion.header>
      {/* Spacer so content isn't hidden under the fixed header on non-home pages */}
      {!isHome && (
        <div className="h-[100px] md:h-[160px]" aria-hidden="true" />
      )}
    </>
  );
}

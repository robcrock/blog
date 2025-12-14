"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../brand/logo";
import { ThemeSwitcher } from "../theme/theme-switcher";

const navItems = [
  { href: "#projects", label: "Projects", id: "projects" },
  { href: "#posts", label: "Posts", id: "posts" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const scrollDelta = useRef(0);
  const isResettingNavigation = useRef(false);
  const isUpdatingHashFromScroll = useRef(false);
  const updateActiveSectionFromHashRef = useRef<(() => void) | null>(null);

  // Sync activeSection with URL hash - hash is the source of truth
  useEffect(() => {
    if (!isHome) return;

    const updateActiveSectionFromHash = () => {
      const hash = window.location.hash.slice(1); // Remove #
      const sectionId = navItems.find((item) => item.id === hash)?.id || null;
      setActiveSection(sectionId);
    };

    // Store the function in a ref so scroll handler can call it
    updateActiveSectionFromHashRef.current = updateActiveSectionFromHash;

    // Initial sync
    updateActiveSectionFromHash();

    const handleHashChange = () => {
      updateActiveSectionFromHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [isHome]);

  // Removed IntersectionObserver - it was causing conflicts with scroll handler

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show
          const hideThreshold = 100; // Minimum scroll distance down before hiding
          const scrollDeltaY = currentScrollY - lastScrollY.current;

          // Show header at the top of the page
          if (currentScrollY < scrollThreshold) {
            setIsVisible(true);
            scrollDelta.current = 0;
            // At the top, clear hash to reset to home
            if (
              !isResettingNavigation.current &&
              !isUpdatingHashFromScroll.current
            ) {
              if (window.location.hash) {
                isUpdatingHashFromScroll.current = true;
                window.history.replaceState(null, "", window.location.pathname);
                // Manually trigger hash sync since replaceState doesn't fire hashchange
                if (updateActiveSectionFromHashRef.current) {
                  updateActiveSectionFromHashRef.current();
                }
                setTimeout(() => {
                  isUpdatingHashFromScroll.current = false;
                }, 0);
              }
            }
            // If we're at the top and were resetting, clear the flag since we've reached the top
            if (isResettingNavigation.current) {
              isResettingNavigation.current = false;
            }
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return; // Early return to skip section detection
          } else {
            // Accumulate scroll delta when scrolling down
            if (scrollDeltaY > 0) {
              scrollDelta.current += scrollDeltaY;
              // Only hide if we've scrolled enough distance down
              if (scrollDelta.current >= hideThreshold) {
                setIsVisible(false);
              }
            } else {
              // Scrolling up - reset delta and show header
              scrollDelta.current = 0;
              setIsVisible(true);
            }

            // If user manually scrolls away from top, clear the reset flag
            // This allows navigation to work normally if user intervenes during logo scroll
            if (
              isResettingNavigation.current &&
              scrollDeltaY !== 0 &&
              currentScrollY >= scrollThreshold
            ) {
              isResettingNavigation.current = false;
            }
          }

          // Don't update hash if we're resetting navigation or if hash update is in progress
          if (
            isResettingNavigation.current ||
            isUpdatingHashFromScroll.current
          ) {
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          // Check if we're above the first nav section (projects) AND near the top of the page
          if (currentScrollY < 100) {
            const firstNavSection = document.getElementById(navItems[0].id);
            if (firstNavSection) {
              const rect = firstNavSection.getBoundingClientRect();
              // If the section's top is below the viewport top, we're above it
              if (rect.top > 0) {
                // Clear hash if we're above all sections
                if (window.location.hash) {
                  isUpdatingHashFromScroll.current = true;
                  window.history.replaceState(
                    null,
                    "",
                    window.location.pathname
                  );
                  // Manually trigger hash sync since replaceState doesn't fire hashchange
                  if (updateActiveSectionFromHashRef.current) {
                    updateActiveSectionFromHashRef.current();
                  }
                  setTimeout(() => {
                    isUpdatingHashFromScroll.current = false;
                  }, 0);
                }
                lastScrollY.current = currentScrollY;
                ticking.current = false;
                return;
              }
            }
          }

          // Detect which section is in view and update hash accordingly
          const viewportHeight = window.innerHeight;
          const viewportTop = 0; // Viewport top is always 0 in getBoundingClientRect
          const viewportBottom = viewportHeight;
          const viewportCenter = viewportHeight / 2;

          // Find the section closest to viewport center
          let closestSection: { id: string; distance: number } | null = null;

          for (const item of navItems) {
            const element = document.getElementById(item.id);
            if (element) {
              const rect = element.getBoundingClientRect();
              // rect.top and rect.bottom are already relative to viewport
              const elementTop = rect.top;
              const elementBottom = rect.bottom;
              const elementCenter = rect.top + rect.height / 2;

              // Check if section is meaningfully in viewport (at least 20% visible)
              const visibleHeight =
                Math.min(elementBottom, viewportBottom) -
                Math.max(elementTop, viewportTop);
              const visibilityRatio = visibleHeight / rect.height;
              const distance = Math.abs(viewportCenter - elementCenter);

              if (
                elementTop <= viewportBottom &&
                elementBottom >= viewportTop &&
                visibilityRatio >= 0.2
              ) {
                if (!closestSection || distance < closestSection.distance) {
                  closestSection = { id: item.id, distance };
                }
              }
            }
          }

          // Update hash if we found a section and it's different from current hash
          if (closestSection) {
            const currentHash = window.location.hash.slice(1);
            if (currentHash !== closestSection.id) {
              isUpdatingHashFromScroll.current = true;
              window.history.replaceState(null, "", `#${closestSection.id}`);
              // Manually trigger hash sync since replaceState doesn't fire hashchange
              if (updateActiveSectionFromHashRef.current) {
                updateActiveSectionFromHashRef.current();
              }
              setTimeout(() => {
                isUpdatingHashFromScroll.current = false;
              }, 0);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Reset navigation state and prevent updates during scroll
    isResettingNavigation.current = true;

    // Clear any hash from the URL
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Flag will be cleared in scroll handler when we reach the top
    } else {
      // If navigating from another page, scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Flag will be cleared in scroll handler when we reach the top
      }, 100);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 flex justify-between items-center py-6 bg-background/80 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Link href="/" onClick={handleLogoClick}>
        <Logo className="w-10 h-10" />
      </Link>

      <div className="flex items-center">
        {isHome && (
          <nav className="mr-6 ml-auto">
            <ul className="flex space-x-6">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const hasActiveSection = activeSection !== null;

                return (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`transition-opacity ${
                        hasActiveSection
                          ? isActive
                            ? "opacity-100"
                            : "opacity-50"
                          : "opacity-100"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        <ThemeSwitcher />
      </div>
    </header>
  );
}

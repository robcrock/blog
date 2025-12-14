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

  useEffect(() => {
    if (!isHome) return;

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
    };

    const sectionStates = new Map<string, IntersectionObserverEntry>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sectionStates.set(entry.target.id, entry);
        } else {
          sectionStates.delete(entry.target.id);
        }
      });

      // Don't update active section if we're resetting navigation or at the very top
      if (isResettingNavigation.current || window.scrollY < 50) {
        // Always clear active section when resetting or at the top
        setActiveSection(null);
        return;
      }

      // Check if we're above the first nav section (projects)
      // We're above it if the section hasn't entered the viewport yet
      const firstNavSection = document.getElementById(navItems[0].id);
      if (firstNavSection) {
        const rect = firstNavSection.getBoundingClientRect();
        // If the section's top is below the viewport top, we're above it
        if (rect.top > 0) {
          setActiveSection(null);
          return;
        }
      }

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let activeId: string | null = null;

      sectionStates.forEach((entry, id) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          activeId = id;
        }
      });

      // Only set active section if intersection ratio is meaningful (at least 10%)
      if (activeId && maxRatio >= 0.1) {
        setActiveSection(activeId);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Function to observe sections
    const observeSections = () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Ensure activeSection is null on initial mount if at the top
    if (window.scrollY < 50) {
      setActiveSection(null);
    }

    // Try immediately, then retry after a delay for async components
    observeSections();
    const timeoutId = setTimeout(observeSections, 500);

    // Also observe on scroll to catch sections that load later
    const checkSections = () => {
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element && !sectionStates.has(item.id)) {
          observer.observe(element);
        }
      });
    };

    const scrollCheckInterval = setInterval(checkSections, 1000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(scrollCheckInterval);
      navItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [isHome]);

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
            // At the top, always clear active section
            setActiveSection(null);
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
          }

          // Don't update active section if we're resetting navigation - check this BEFORE any section detection
          if (isResettingNavigation.current) {
            // Keep activeSection null during reset
            setActiveSection(null);
            lastScrollY.current = currentScrollY;
            ticking.current = false;
            return;
          }

          // Check if we're above the first nav section (projects) AND near the top of the page
          // Only reset when we're truly at the top, not when scrolling between sections
          if (currentScrollY < 100) {
            const firstNavSection = document.getElementById(navItems[0].id);
            if (firstNavSection) {
              const rect = firstNavSection.getBoundingClientRect();
              // If the section's top is below the viewport top, we're above it
              if (rect.top > 0) {
                setActiveSection(null);
                lastScrollY.current = currentScrollY;
                ticking.current = false;
                return;
              }
            }
          }

          // Fallback: Check which section is in view when IntersectionObserver might miss it
          const viewportHeight = window.innerHeight;
          const viewportTop = currentScrollY;
          const viewportBottom = currentScrollY + viewportHeight;
          const viewportCenter = currentScrollY + viewportHeight / 2;

          // Check if we're near the bottom of the page
          const documentHeight = document.documentElement.scrollHeight;
          const isNearBottom = viewportBottom >= documentHeight - 100;

          if (isNearBottom) {
            // If near bottom, check if Posts section is visible
            const postsElement = document.getElementById("posts");
            if (postsElement) {
              const postsRect = postsElement.getBoundingClientRect();
              const postsTop = currentScrollY + postsRect.top;
              if (postsTop <= viewportBottom) {
                setActiveSection("posts");
              }
            }
          } else {
            // Find the section closest to viewport center
            let closestSection: { id: string; distance: number } | null = null;

            for (const item of navItems) {
              const element = document.getElementById(item.id);
              if (element) {
                const rect = element.getBoundingClientRect();
                const elementTop = currentScrollY + rect.top;
                const elementBottom = elementTop + rect.height;
                const elementCenter = elementTop + rect.height / 2;

                // Check if section is meaningfully in viewport (at least 20% visible)
                const visibleHeight =
                  Math.min(elementBottom, viewportBottom) -
                  Math.max(elementTop, viewportTop);
                const visibilityRatio = visibleHeight / rect.height;

                if (
                  elementTop <= viewportBottom &&
                  elementBottom >= viewportTop &&
                  visibilityRatio >= 0.2
                ) {
                  const distance = Math.abs(viewportCenter - elementCenter);
                  if (!closestSection || distance < closestSection.distance) {
                    closestSection = { id: item.id, distance };
                  }
                }
              }
            }

            if (closestSection) {
              setActiveSection(closestSection.id);
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
    // Set flag first, before any state updates or scrolls
    isResettingNavigation.current = true;
    setActiveSection(null);

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

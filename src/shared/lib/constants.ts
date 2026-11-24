// src/constants.ts
/** Canonical origin. `metadataBase` in the root layout uses this same value. */
export const SITE_URL = "https://robcrock.com";

export const BLOG_TITLE = "Robert's Site";
export const COLOR_THEME_COOKIE_NAME = "color-theme";

export const NAVIGATION_ITEMS = [
  { id: "lab", label: "LAB", href: "#lab", page: "/lab" },
  { id: "craft", label: "CRAFT", href: "#craft", page: "/craft" },
  { id: "projects", label: "WORK", href: "#projects", page: "/projects" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/robertcrocker/", icon: "LinkedIn" },
  { href: "https://github.com/robcrock", icon: "GitHub" },
  { href: "https://x.com/robcrock", icon: "X" },
  { href: "mailto:robert@robcrock.com", icon: "Email" },
] as const;

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  /** URL-safe id that drives the /projects/[slug] detail route */
  slug: string;
  /** Deployed Vercel URL — embedded in the detail page iframe and the "open full site" link */
  liveUrl: string;
  /** GitHub repo, surfaced as an optional "view source" link */
  repoUrl?: string;
  /** Original Frontend Mentor solution page, kept for reference */
  link?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Bookmark Landing Page",
    description:
      "Responsive product page with tabbed features, form validation, and an accessible FAQ flow.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/bookmark_landing_page.png",
    slug: "bookmark-landing-page",
    liveUrl: "https://bookmark-landing-page-jade-gamma.vercel.app",
    repoUrl: "https://github.com/robcrock/bookmark-landing-page",
    link: "https://www.frontendmentor.io/solutions/bookmark-landing-page-9Cv_AE_iki",
  },
  {
    title: "Room Homepage",
    description:
      "Editorial commerce layout with an adaptive hero carousel and clear product storytelling.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/room_homepage.png",
    slug: "room-homepage",
    liveUrl: "https://room-homepage-rust-mu.vercel.app",
    repoUrl: "https://github.com/robcrock/room-homepage",
    link: "https://www.frontendmentor.io/solutions/room-homepage-challenge-hDpuScvD3N",
  },
  {
    title: "Loopstudio Landing Page",
    description:
      "Image-led campaign page built around resilient grid composition and responsive typography.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/loopstudio_landing_page.png",
    slug: "loopstudio-landing-page",
    liveUrl: "https://loopstudios-landing-page-lovat.vercel.app",
    repoUrl: "https://github.com/robcrock/loopstudios-landing-page",
    link: "https://www.frontendmentor.io/solutions/loopstudio-landing-page-JUIE31Bv1F",
  },
  {
    title: "NFT Card Component",
    description:
      "Collectible preview with layered hover states, responsive imagery, and structured pricing.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/nft_preview_card.png",
    slug: "nft-card-component",
    liveUrl: "https://nft-preview-card-beta-kohl.vercel.app",
    repoUrl: "https://github.com/robcrock/nft-preview-card",
    link: "https://www.frontendmentor.io/solutions/nft-card-component-zlC2SsaeJs",
  },
  {
    title: "Password Generator App",
    description:
      "Password generator with custom controls, strength feedback, and clipboard support.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/password_generator_app.png",
    slug: "password-generator-app",
    liveUrl: "https://password-generator-six-alpha.vercel.app",
    repoUrl: "https://github.com/robcrock/password-generator",
    link: "https://www.frontendmentor.io/solutions/password-generator-VW-IC174JO",
  },
  {
    title: "Frontend Quiz App",
    description:
      "Multi-topic quiz flow with clear answer states, score tracking, and a responsive theme.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/frontend_quiz_app.png",
    slug: "frontend-quiz-app",
    liveUrl: "https://quiz-app-jet-three.vercel.app",
    repoUrl: "https://github.com/robcrock/quiz-app",
    link: "https://www.frontendmentor.io/solutions/quiz-app-solution-PcNwlo7VyW",
  },
  {
    title: "Tip Calculator App",
    description:
      "Real-time bill splitter with validated inputs, custom tip controls, and per-person totals.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/tip_calculator_app.png",
    slug: "tip-calculator-app",
    liveUrl: "https://tip-calculator-pearl-iota.vercel.app",
    repoUrl: "https://github.com/robcrock/tip-calculator",
    link: "https://www.frontendmentor.io/solutions/tip-calculator-5XprC0QSFe",
  },
  {
    title: "Time Tracking Dashboard",
    description:
      "Responsive activity dashboard with daily, weekly, and monthly summaries driven by local data.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/time_tracking_dashboard.png",
    slug: "time-tracking-dashboard",
    liveUrl: "https://time-tracking-dashboard-three-phi.vercel.app",
    repoUrl: "https://github.com/robcrock/time-tracking-dashboard",
    link: "https://www.frontendmentor.io/solutions/time-tracking-dashboard-solution-q42DUSOvk5",
  },
];

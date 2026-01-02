// src/constants.ts
export const BLOG_TITLE = "Robert's Site";
export const COLOR_THEME_COOKIE_NAME = "color-theme";

export const NAVIGATION_ITEMS = [
  { id: "projects", label: "WORK", href: "#projects", page: "/projects" },
  { id: "craft", label: "CRAFT", href: "#craft", page: "/craft" },
  { id: "connect", label: "CONNECT", href: "#connect", page: null },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/robertcrocker/", icon: "LinkedIn" },
  { href: "https://github.com/robcrock", icon: "GitHub" },
  { href: "https://x.com/robcrock", icon: "X" },
  {
    href: "https://mentorcruise.com/mentor/robertcrocker/",
    icon: "MentorCruise",
  },
  {
    href: "https://www.skool.com/robert-crockers-skool-3349/about?ref=5d65b749cbe94b9e8f8ac2a2beb55f26",
    icon: "Skool",
  },
] as const;

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Bookmark Landing Page",
    description:
      "This challenge will really test your layout skills. There are also areas that will require some JavaScript, such as the tabbed features section and the FAQ accordion.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/bookmark_landing_page.png",
    link: "https://www.frontendmentor.io/solutions/bookmark-landing-page-9Cv_AE_iki",
  },
  {
    title: "Room Homepage",
    description:
      "This small homepage challenge packs a big punch to test your layout skills. There's also a slider in there to add a JS layer for extra practice.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/room_homepage.png",
    link: "https://www.frontendmentor.io/solutions/room-homepage-challenge-hDpuScvD3N",
  },
  {
    title: "Loopstudio Landing Page",
    description:
      "This challenge is perfect if you're looking to test your CSS Grid chops. Even without Grid, this project will be a fun one to help you practice your layout skills!",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/loopstudio_landing_page.png",
    link: "https://www.frontendmentor.io/solutions/loopstudio-landing-page-JUIE31Bv1F",
  },
  {
    title: "NFT Card Component",
    description:
      "This HTML & CSS only challenge is perfect for anyone just starting out or anyone wanting a small project to play around with.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/nft_preview_card.png",
    link: "https://www.frontendmentor.io/solutions/nft-card-component-zlC2SsaeJs",
  },
  {
    title: "Password Generator App",
    description:
      "This app will be an excellent test of your HTML, CSS, and JS skills. You'll build custom form controls and use JavaScript to generate random passwords.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/password_generator_app.png",
    link: "https://www.frontendmentor.io/solutions/password-generator-VW-IC174JO",
  },
  {
    title: "Frontend Quiz App",
    description:
      "This app will test your skills (as well as your knowledge!) as you build out a fully functional quiz. We provide a local JSON file to help you practice working with JSON!",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/frontend_quiz_app.png",
    link: "https://www.frontendmentor.io/solutions/quiz-app-solution-PcNwlo7VyW",
  },
  {
    title: "Tip Calculator App",
    description:
      "This small app is perfect for anyone starting to get to grips with JavaScript. The calculator functionality will be a nice test!",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/tip_calculator_app.png",
    link: "https://www.frontendmentor.io/solutions/tip-calculator-5XprC0QSFe",
  },
  {
    title: "Time Tracking Dashboard",
    description:
      "A perfect opportunity to practice your CSS Grid skills. For anyone wanting to take it up a notch, we provide a JSON data file to practice working with data.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/time_tracking_dashboard.png",
    link: "https://www.frontendmentor.io/solutions/time-tracking-dashboard-solution-q42DUSOvk5",
  },
];

export interface ConnectOffering {
  title: string;
  description: string;
  platform: "MentorCruise" | "Skool" | "Email";
  link: string;
  features: string[];
}

export const CONNECT_OFFERINGS: ConnectOffering[] = [
  {
    title: "1-on-1 Mentorship",
    description:
      "Personalized guidance for your frontend development journey. Whether you're transitioning careers or leveling up your skills, I'll help you get there faster.",
    platform: "MentorCruise",
    link: "https://mentorcruise.com/mentor/robertcrocker/",
    features: [
      "Weekly 1-on-1 sessions",
      "Code reviews & feedback",
      "Career guidance",
      "Portfolio reviews",
    ],
  },
  {
    title: "Community Learning",
    description:
      "Join a community of like-minded developers learning together. Get access to resources, discussions, and group learning sessions.",
    platform: "Skool",
    link: "https://www.skool.com/robert-crockers-skool-3349/about?ref=5d65b749cbe94b9e8f8ac2a2beb55f26",
    features: [
      "Community discussions",
      "Shared resources",
      "Group challenges",
      "Peer networking",
    ],
  },
  {
    title: "Quick Chat",
    description:
      "Have a project idea, a quick question, or just want to connect? Drop me an email and let's start a conversation.",
    platform: "Email",
    link: "mailto:robert@robcrock.com",
    features: [
      "Project inquiries",
      "Quick questions",
      "Collaboration opportunities",
      "General networking",
    ],
  },
] as const;

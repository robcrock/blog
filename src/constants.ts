export const BLOG_TITLE = "Robert's Site";
export const COLOR_THEME_COOKIE_NAME = "color-theme";

export const NAVIGATION_ITEMS = [
  { id: "projects", label: "PROJECTS", href: "#projects" },
  { id: "posts", label: "POSTS", href: "#posts" },
] as const;

export const SOCIAL_LINKS = [
  { href: "https://www.linkedin.com/in/robertcrocker/", icon: "LinkedIn" },
  { href: "https://github.com/robcrock", icon: "GitHub" },
  { href: "https://x.com/robcrock", icon: "X" },
  { href: "https://mentorcruise.com/mentor/robertcrocker/", icon: "MentorCruise" },
  {
    href: "https://www.skool.com/robert-crockers-skool-3349/about?ref=5d65b749cbe94b9e8f8ac2a2beb55f26",
    icon: "Skool",
  },
] as const;

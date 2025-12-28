export const BLOG_TITLE = "Robert's Site";
export const COLOR_THEME_COOKIE_NAME = "color-theme";

export const NAVIGATION_ITEMS = [
  { id: "projects", label: "PROJECTS", href: "#projects" },
  { id: "posts", label: "POSTS", href: "#posts" },
  { id: "chat", label: "CHAT", href: "#chat" },
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
  {
    title: "Newsletter Sign Up Form",
    description:
      "This will test your skills with basic form structure, validation, and submission. The success state will also be an excellent opportunity to work with DOM manipulation.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/newsletter_sign-up_form.png",
    link: "https://www.frontendmentor.io/solutions/newsletter-sign-up-form-with-success-message-YH6-r-KIII",
  },
  {
    title: "Article Preview Component",
    description:
      "Practice your layout skills with this article preview component. There's lots of fun to be had playing around with animations for the sharing icons as well.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/article_preview_component.png",
    link: "https://www.frontendmentor.io/solutions/article-preview-component-gAlNsowTxx",
  },
  {
    title: "Social Links Profile",
    description:
      "In this small project, you'll build out your social link-sharing profile. You can even personalize it and use it to share all your social profiles!",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/social_links_profile.png",
    link: "https://www.frontendmentor.io/solutions/social-links-profile-solution-Sc52h024l9",
  },
  {
    title: "QR Code Component",
    description:
      "A perfect first challenge if you're new to HTML and CSS. The card layout doesn't shift, so it's ideal if you haven't learned about building responsive layouts yet.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/qr_code_component.png",
    link: "https://www.frontendmentor.io/solutions/qr-code-component-CROS2yI7sD",
  },
  {
    title: "Result Summary Component",
    description:
      "This challenge has something for everyone. It's a HTML and CSS only project, but we've also provided a JSON file of the test results for anyone wanting to practice JS.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/results_summary_component.png",
    link: "https://www.frontendmentor.io/solutions/result-summary-component-SUXothL8Ci",
  },
  {
    title: "FAQ Accordion",
    description:
      "In this challenge, you'll build an FAQ accordion. This is an extremely common front-end pattern, so it's an excellent opportunity to get some practice in!",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/faq_accordion_card.png",
    link: "https://www.frontendmentor.io/solutions/faq-accordion-wyYdUl1Oko",
  },
  {
    title: "Blog Preview Component",
    description:
      "This HTML & CSS-only challenge is a perfect project for beginners getting up to speed with HTML and CSS fundamentals, like HTML structure and the box model.",
    tags: ["Next.js", "Tailwind", "Shadcn"],
    image: "/images/featured-projects/blog_preview_card.png",
    link: "https://www.frontendmentor.io/solutions/blog-preview-card-jazYTe285N",
  },
] as const;

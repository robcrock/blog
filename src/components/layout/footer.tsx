import Link from "next/link";

const socialLinks = [
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/robertcrocker/",
  },
  {
    label: "GITHUB",
    href: "https://github.com/robcrock",
  },
  {
    label: "SKOOL",
    href: "https://www.skool.com/robert-crockers-skool-3349/about?ref=5d65b749cbe94b9e8f8ac2a2beb55f26",
  },
];

export default function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="flex justify-between items-center">
        <p className="font-medium uppercase">ROBERT CROCKER</p>
        <div className="flex gap-4 items-center">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-mediumleading-none text-primary uppercase tracking-[0.8px]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

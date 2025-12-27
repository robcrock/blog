"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../brand/logo";

const navItems = [
  { href: "#projects", label: "PROJECTS", id: "projects" },
  { href: "#posts", label: "POSTS", id: "posts" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="flex sticky top-0 z-50 justify-between items-center py-4 backdrop-blur-sm bg-background/95">
      <Link href="/" onClick={handleLogoClick}>
        <Logo className="w-10 h-10" />
      </Link>

      <div className="flex items-center">
        {isHome && (
          <nav className="mr-6 ml-auto">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        {/* <ThemeSwitcher /> */}
      </div>
    </header>
  );
}

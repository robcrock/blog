"use client";

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
                    className="text-base font-medium hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <ThemeSwitcher />
      </div>
    </header>
  );
}

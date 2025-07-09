"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./logo";
import { ThemeSwitcher } from "./theme/theme-switcher";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = [{ href: "/posts", label: "Posts" }];

  return (
    <header className="flex items-center justify-between py-6">
      <Link href="/">
        <Logo className="w-10 h-10" />
      </Link>

      {isHome && (
        <nav className="ml-6 mr-auto">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <ThemeSwitcher />
    </header>
  );
}

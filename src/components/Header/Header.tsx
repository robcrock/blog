"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "react-feather";

import Logo from "../../components/icons/logo";
import { Button } from "../ui/button";

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
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

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        className="rounded-full"
      >
        {resolvedTheme === "dark" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </header>
  );
}

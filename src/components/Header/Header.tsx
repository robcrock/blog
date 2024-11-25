"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "react-feather";

import Logo from "../../components/icons/logo";
import { Button } from "../ui/button";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  console.log("pathname", pathname);
  const isHome = pathname === "/";

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const navItems: { href: string; label: string }[] = [
    { href: "/posts", label: "Posts" },
    // { href: "#", label: "Articles" },
    // { href: "#", label: "Projects" },
    // { href: "#", label: "Uses" },
  ];

  return (
    <header className="flex items-center justify-between py-6">
      <Link href={"/"}>
        <Logo className="w-10 h-10" />
      </Link>
      {isHome && (
        <nav className="ml-6 mr-auto">
          {navItems && (
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        className="rounded-full"
      >
        {darkMode ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
        <span className="sr-only">Toggle dark mode</span>
      </Button>
    </header>
  );
}

export default Header;

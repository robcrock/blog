"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "../brand/logo";

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
      <Link
        href="/"
        onClick={handleLogoClick}
        className="rounded ring-offset-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Logo className="w-10 h-10" />
      </Link>
    </header>
  );
}

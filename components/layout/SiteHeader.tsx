"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clubLinks } from "@/data/links";

const links = [
  ["Projects", "/projects"],
  ["Hackathon", "/hackathon"],
  ["Team", "/people"],
  ["About", "/about"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  const navigation = (
    <>
      {links.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          aria-current={pathname === href ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
      <a
        className="btn btn-sm"
        href={clubLinks.signup}
        target="_blank"
        rel="noopener noreferrer"
      >
        Join the club
      </a>
    </>
  );

  return (
    <header className="site-header">
      <div className="container header-bar">
        <Link className="logo" href="/" aria-label="Claude Builder Club McGill, home">
          Claude Builder Club <small>McGill</small>
        </Link>
        <nav className="site-nav" aria-label="Main">
          {navigation}
        </nav>
        <details
          className="mobile-menu"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.currentTarget.open = false;
              e.currentTarget.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>Menu</summary>
          <nav
            aria-label="Main"
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("a"))
                e.currentTarget.closest("details")?.removeAttribute("open");
            }}
          >
            {navigation}
          </nav>
        </details>
      </div>
    </header>
  );
}

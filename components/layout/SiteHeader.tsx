"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  ["About", "/about"],
  ["Projects", "/#projects"],
  ["Team", "/people"],
  ["Hackathon", "/hackathon"],
];
export function SiteHeader() {
  const pathname = usePathname();
  const navigation = (
    <>
      {links.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href ||
            (href === "/hackathon" && pathname === "/hackathon26")
              ? "page"
              : undefined
          }
        >
          {label}
        </Link>
      ))}
      <Link
        className="button"
        href="/contact"
        aria-current={pathname === "/contact" ? "page" : undefined}
      >
        Join CBC <span aria-hidden="true">↗</span>
      </Link>
    </>
  );
  return (
    <header className="site-header">
      <div className="container header-bar">
        <Link className="logo" href="/" aria-label="Claude Builder Club home">
          <span className="logo-mark" aria-hidden="true">
            ✳
          </span>
          <span>
            Claude Builder Club<small>McGill University</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
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
            aria-label="Mobile navigation"
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

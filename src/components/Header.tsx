"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/festival", label: "Festival" },
  { href: "/experiences", label: "Expériences" },
  { href: "/passeport", label: "Passeport" },
  { href: "/oteranga", label: "Oteranga" },
  { href: "/communaute", label: "Communauté" },
  { href: "/impact", label: "Impact" },
  { href: "/#histoire", label: "À propos" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-10 z-50 backdrop-blur-md transition-colors duration-[400ms] border-b ${
        scrolled
          ? "bg-bg/92 border-ink/14"
          : "bg-bg/42 border-ink/8"
      }`}
    >
      <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:px-[72px]">
        <Link
          href="#top"
          className="font-display font-semibold text-xl tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          Origin&nbsp;Teranga
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-sm font-semibold text-ink/62 hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:block">
          <a
            href="/reserver"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            S&apos;inscrire
          </a>
        </div>

        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="xl:hidden relative h-10 w-10 flex items-center justify-center text-ink"
        >
          <span
            className={`absolute block h-[1.5px] w-6 bg-current transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-2"
            }`}
          />
          <span
            className={`absolute block h-[1.5px] w-6 bg-current transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute block h-[1.5px] w-6 bg-current transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-2"
            }`}
          />
        </button>
      </div>

      <div
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-[400ms] ease-out bg-bg/97 border-t border-ink/10 ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-5 py-6 sm:px-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base font-semibold text-ink/80 border-b border-ink/8 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/reserver"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink"
          >
            S&apos;inscrire
          </a>
        </nav>
      </div>
    </header>
  );
}

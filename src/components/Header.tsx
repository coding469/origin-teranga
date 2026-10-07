"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#manifesto", label: "Festival" },
  { href: "#histoire", label: "Concept" },
  { href: "#programme", label: "Programme" },
  { href: "#activites", label: "Activités" },
  { href: "#partenaires", label: "Partenaires" },
  { href: "#contact", label: "Contact" },
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
      className={`sticky top-0 z-50 backdrop-blur-md transition-colors duration-[400ms] border-b ${
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

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-sm font-semibold text-ink/62 hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#reserver"
            className="inline-flex h-[52px] items-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft hover:-translate-y-0.5"
          >
            Réserver
          </a>
        </div>

        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden relative h-10 w-10 flex items-center justify-center text-ink"
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
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-[400ms] ease-out bg-bg/97 border-t border-ink/10 ${
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
            href="#reserver"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-full bg-clay px-7 text-sm font-bold text-ink"
          >
            Réserver
          </a>
        </nav>
      </div>
    </header>
  );
}

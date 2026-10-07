const FESTIVAL_LINKS = [
  { label: "Le concept", href: "#manifesto" },
  { label: "Programme", href: "#programme" },
  { label: "Notre histoire", href: "#histoire" },
  { label: "Partenaires", href: "#partenaires" },
];

const ACTIVITY_LINKS = [
  { label: "Voyage privé", href: "#activites" },
  { label: "The Party", href: "#activites" },
  { label: "Battle Afro", href: "#battle" },
  { label: "Marketplace", href: "#activites" },
];

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14 2h3.2c.3 2 1.7 3.6 3.8 3.9v3.2c-1.5 0-2.9-.5-4-1.3v6.8a6 6 0 1 1-6-6c.3 0 .7 0 1 .1v3.3a2.7 2.7 0 1 0 1.9 2.6V2z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 22v-8.3h2.8l.4-3.2h-3.2V8.3c0-.9.3-1.6 1.7-1.6h1.6V3.8C16.5 3.7 15.4 3.6 14.2 3.6c-2.5 0-4.2 1.5-4.2 4.3v2.6H7.2v3.2H10V22h3.5z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0A0908] px-5 pt-16 pb-9 sm:px-8 lg:px-[72px]">
      <div className="flex flex-wrap justify-between gap-12 border-b border-ink/14 pb-12">
        <div className="max-w-[340px] flex-1 basis-[280px]">
          <div className="mb-4 font-display text-xl font-semibold">
            Origin&nbsp;Teranga
          </div>
          <p className="mb-5 text-sm leading-relaxed text-ink/62">
            Un festival culturel africain qui rassemble les générations, les
            talents et les histoires — entre Dakar et Paris.
          </p>
          <div className="flex gap-2.5">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-ink/22 transition-all duration-300 hover:border-clay-soft hover:bg-clay/14"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="TikTok"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-ink/22 transition-all duration-300 hover:border-clay-soft hover:bg-clay/14"
            >
              <TikTokIcon />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-ink/22 transition-all duration-300 hover:border-clay-soft hover:bg-clay/14"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>

        <div className="flex-1 basis-[140px]">
          <div className="mb-[18px] text-[12.5px] font-bold uppercase tracking-[0.22em] text-ink/34">
            Festival
          </div>
          <div className="flex flex-col gap-3">
            {FESTIVAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="underline-link text-sm text-ink/62"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex-1 basis-[140px]">
          <div className="mb-[18px] text-[12.5px] font-bold uppercase tracking-[0.22em] text-ink/34">
            Activités
          </div>
          <div className="flex flex-col gap-3">
            {ACTIVITY_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="underline-link text-sm text-ink/62"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex-1 basis-[220px]">
          <div className="mb-[18px] text-[12.5px] font-bold uppercase tracking-[0.22em] text-ink/34">
            Contact
          </div>
          <div className="flex flex-col gap-2.5 text-sm leading-relaxed text-ink/62">
            <span>
              92 Avenue des Champs-Élysées
              <br />
              75008 Paris, France
            </span>
            <a className="underline-link" href="tel:+33623474197">
              +33 6 23 47 41 97
            </a>
            <a className="underline-link" href="mailto:contact@originteranga.com">
              contact@originteranga.com
            </a>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-7">
        <span className="text-[12.5px] text-ink/34">
          © 2026 Origin Teranga. Tous droits réservés.
        </span>
        <div className="flex gap-6">
          <a className="underline-link text-[12.5px] text-ink/34" href="#">
            Mentions légales
          </a>
          <a className="underline-link text-[12.5px] text-ink/34" href="#">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}

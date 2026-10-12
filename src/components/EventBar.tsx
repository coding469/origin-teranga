export default function EventBar() {
  return (
    <div className="sticky top-0 z-[60] flex h-10 items-center justify-center bg-clay px-4 text-center">
      <a
        href="/reserver"
        className="text-[11px] font-bold uppercase tracking-[0.08em] text-ink sm:text-[12.5px] sm:tracking-[0.12em]"
      >
        <span className="hidden sm:inline">
          Origin Teranga Expérience 2026 · 04—08 Nov · Dakar · S&apos;inscrire →
        </span>
        <span className="sm:hidden">04—08 Nov · S&apos;inscrire →</span>
      </a>
    </div>
  );
}

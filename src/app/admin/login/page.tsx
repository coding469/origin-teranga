import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { login } from "./actions";

export const metadata: Metadata = {
  title: "Connexion admin | Origin Teranga",
};

type SearchParams = Promise<{ error?: string }>;

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />
      <div className="flex min-h-[70vh] items-center justify-center bg-sand px-5 py-20 text-dark-ink sm:px-8">
        <div className="w-full max-w-[400px] rounded-[22px] border border-dark-ink/14 bg-sand-soft px-8 py-12">
          <span className="text-[12.5px] font-bold uppercase tracking-[0.22em] text-clay">
            Accès équipe
          </span>
          <h1 className="mt-3 mb-8 font-display text-[clamp(24px,3vw,32px)] font-medium">
            Connexion admin
          </h1>

          <form action={login} className="flex flex-col gap-6">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
              >
                Ton email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                placeholder="prenom@equipe.com"
                className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink placeholder:text-dark-ink/45 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[13px] font-bold uppercase tracking-[0.1em] text-dark-ink/64"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="h-14 w-full rounded-full border border-dark-ink/14 bg-transparent px-6 text-[15px] text-dark-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-clay"
              />
            </div>

            {error && (
              <p className="text-[14px] text-clay">Mot de passe incorrect.</p>
            )}

            <button
              type="submit"
              className="inline-flex h-14 w-full items-center justify-center rounded-full bg-clay text-sm font-bold text-ink transition-all duration-300 hover:bg-clay-soft"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

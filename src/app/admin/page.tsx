import type { Metadata } from "next";
import { cookies } from "next/headers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabaseAdmin } from "@/lib/supabase-admin";

export const metadata: Metadata = {
  title: "Admin · Réservations | Origin Teranga",
};

const ACTIVITY_LABELS: Record<string, string> = {
  atelier: "Ateliers artistiques",
  conference: "Conférences",
  masterclass: "Masterclass",
  initiation: "Initiations sportives",
};

const EVENT_DATES = [
  { value: "2026-11-04", label: "4 novembre" },
  { value: "2026-11-05", label: "5 novembre" },
  { value: "2026-11-06", label: "6 novembre" },
  { value: "2026-11-07", label: "7 novembre" },
  { value: "2026-11-08", label: "8 novembre" },
];

type ReservationRow = {
  id: string;
  participant_type: string;
  nom: string;
  prenom: string;
  whatsapp: string;
  email: string | null;
  status: string;
  payment_status: string;
  created_at: string;
  activity_slots: {
    activity_type: string;
    label: string;
    event_date: string;
    start_time: string;
  } | null;
};

type PillarInterestRow = {
  id: string;
  pillar: string;
  nom: string;
  email: string;
  message: string | null;
  created_at: string;
};

type SearchParams = Promise<{ activity_type?: string; event_date?: string }>;

export default async function AdminPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { activity_type, event_date } = await searchParams;
  const cookieStore = await cookies();
  const adminEmail = cookieStore.get("admin_email")?.value;

  const [{ data: reservations, error: reservationsError }, { data: interests, error: interestsError }] =
    await Promise.all([
      supabaseAdmin
        .from("reservations")
        .select(
          "id, participant_type, nom, prenom, whatsapp, email, status, payment_status, created_at, activity_slots(activity_type, label, event_date, start_time)"
        )
        .order("created_at", { ascending: false })
        .returns<ReservationRow[]>(),
      supabaseAdmin
        .from("pillar_interest")
        .select("id, pillar, nom, email, message, created_at")
        .order("created_at", { ascending: false })
        .returns<PillarInterestRow[]>(),
    ]);

  const filteredReservations = (reservations ?? []).filter((r) => {
    if (activity_type && r.activity_slots?.activity_type !== activity_type) return false;
    if (event_date && r.activity_slots?.event_date !== event_date) return false;
    return true;
  });

  return (
    <div className="w-full max-w-full overflow-x-clip">
      <Header />
      <div className="min-h-screen bg-sand px-5 py-12 text-dark-ink sm:px-8 lg:px-[72px]">
      <h1 className="font-display text-[clamp(26px,3vw,40px)] font-medium">
        Réservations
      </h1>
      {adminEmail && (
        <p className="mt-2 text-[13px] text-dark-ink/50">
          Connecté en tant que {adminEmail}
        </p>
      )}

      <form method="get" className="mt-6 mb-8 flex flex-wrap gap-3">
        <select
          name="activity_type"
          defaultValue={activity_type ?? ""}
          className="h-11 rounded-full border border-dark-ink/20 bg-transparent px-5 text-[14px]"
        >
          <option value="">Toutes les activités</option>
          {Object.entries(ACTIVITY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          name="event_date"
          defaultValue={event_date ?? ""}
          className="h-11 rounded-full border border-dark-ink/20 bg-transparent px-5 text-[14px]"
        >
          <option value="">Toutes les dates</option>
          {EVENT_DATES.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-11 rounded-full bg-clay px-6 text-[14px] font-bold text-ink"
        >
          Filtrer
        </button>
      </form>

      {reservationsError && (
        <p className="text-clay">Erreur : {reservationsError.message}</p>
      )}

      <div className="overflow-x-auto rounded-2xl border border-dark-ink/12 bg-sand-soft">
        <table className="w-full min-w-[900px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-dark-ink/12 text-[11.5px] uppercase tracking-[0.08em] text-dark-ink/50">
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Activité</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Heure</th>
              <th className="px-4 py-3">Participant</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Paiement</th>
              <th className="px-4 py-3">WhatsApp</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((r) => (
              <tr key={r.id} className="border-b border-dark-ink/8 last:border-none">
                <td className="px-4 py-3">
                  {r.prenom} {r.nom}
                </td>
                <td className="px-4 py-3">{r.activity_slots?.label ?? "—"}</td>
                <td className="px-4 py-3">{r.activity_slots?.event_date ?? "—"}</td>
                <td className="px-4 py-3">{r.activity_slots?.start_time ?? "—"}</td>
                <td className="px-4 py-3 capitalize">{r.participant_type}</td>
                <td className="px-4 py-3">
                  {r.status === "confirmed" ? "Confirmé" : "Liste d'attente"}
                </td>
                <td className="px-4 py-3">
                  {r.payment_status === "not_required"
                    ? "Gratuit"
                    : r.payment_status === "pending_on_site"
                      ? "À régler sur place"
                      : "Payé en ligne"}
                </td>
                <td className="px-4 py-3">{r.whatsapp}</td>
                <td className="px-4 py-3">{r.email ?? "—"}</td>
                <td className="px-4 py-3">
                  {new Date(r.created_at).toLocaleString("fr-FR")}
                </td>
              </tr>
            ))}
            {filteredReservations.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-center text-dark-ink/50">
                  Aucune réservation pour ce filtre.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="mt-14 font-display text-[clamp(22px,2.6vw,32px)] font-medium">
        Demandes d&apos;intérêt (pages univers)
      </h2>

      {interestsError && (
        <p className="mt-4 text-clay">Erreur : {interestsError.message}</p>
      )}

      <div className="mt-6 overflow-x-auto rounded-2xl border border-dark-ink/12 bg-sand-soft">
        <table className="w-full min-w-[700px] text-left text-[13.5px]">
          <thead>
            <tr className="border-b border-dark-ink/12 text-[11.5px] uppercase tracking-[0.08em] text-dark-ink/50">
              <th className="px-4 py-3">Nom</th>
              <th className="px-4 py-3">Univers</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {(interests ?? []).map((i) => (
              <tr key={i.id} className="border-b border-dark-ink/8 last:border-none">
                <td className="px-4 py-3">{i.nom}</td>
                <td className="px-4 py-3 capitalize">{i.pillar}</td>
                <td className="px-4 py-3">{i.email}</td>
                <td className="px-4 py-3">{i.message ?? "—"}</td>
                <td className="px-4 py-3">
                  {new Date(i.created_at).toLocaleString("fr-FR")}
                </td>
              </tr>
            ))}
            {(interests ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-dark-ink/50">
                  Aucune demande pour l&apos;instant.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
      <Footer />
    </div>
  );
}

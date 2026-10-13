"use server";

import { supabase } from "@/lib/supabase";

export type ActivitySlot = {
  id: string;
  activity_type: "atelier" | "conference" | "masterclass" | "initiation";
  label: string;
  event_date: string;
  start_time: string;
  capacity: number;
  remaining_seats: number;
  price_standard: number;
  price_etudiant: number;
  speaker_note: string | null;
};

export async function getSlotsForDate(eventDate: string): Promise<ActivitySlot[]> {
  const { data, error } = await supabase
    .from("activity_slots")
    .select("*")
    .eq("event_date", eventDate)
    .order("start_time", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export type BookSlotInput = {
  slotId: string;
  participantType: "standard" | "etudiant";
  nom: string;
  prenom: string;
  whatsapp: string;
  email?: string;
};

export type BookSlotResult = {
  status: "confirmed" | "waitlisted";
  waitlistPosition: number | null;
  paymentStatus: "not_required" | "pending_on_site";
};

export async function bookSlot(input: BookSlotInput): Promise<BookSlotResult> {
  const { data, error } = await supabase.rpc("book_slot", {
    p_slot_id: input.slotId,
    p_participant_type: input.participantType,
    p_nom: input.nom,
    p_prenom: input.prenom,
    p_whatsapp: input.whatsapp,
    p_email: input.email ?? null,
  });

  if (error) throw new Error(error.message);

  const row = data[0];
  return {
    status: row.status,
    waitlistPosition: row.waitlist_position,
    paymentStatus: row.payment_status,
  };
}

"use server";

import { supabase } from "@/lib/supabase";

export type Pillar =
  | "festival"
  | "experiences"
  | "passeport"
  | "oteranga"
  | "communaute"
  | "impact";

export type SubmitPillarInterestInput = {
  pillar: Pillar;
  nom: string;
  email: string;
  message?: string;
};

export async function submitPillarInterest(
  input: SubmitPillarInterestInput
): Promise<void> {
  const { error } = await supabase.from("pillar_interest").insert({
    pillar: input.pillar,
    nom: input.nom,
    email: input.email,
    message: input.message ?? null,
  });

  if (error) throw new Error(error.message);
}

import { CabinData } from "../features/cabins/CabinRow";
import { supabase } from "./supabase";

export const getCabins = async () => {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return cabins as CabinData[];
};

export const deleteCabin = async ({ id }: { id: number }) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};

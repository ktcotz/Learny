import { CabinData } from "../features/cabins/CabinRow";
import { AddCabin } from "../features/cabins/schema/AddCabinSchema";
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

export const createCabin = async (newCabin: AddCabin) => {
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replace("/", "");

  const imagePath = `${
    import.meta.env.VITE_SUPABASE_URL
  }/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

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

export const createCabin = async ({
  id,
  ...newCabin
}: AddCabin & { id?: number }) => {
  const hasImagePath = id
    ? newCabin?.image?.startsWith(import.meta.env.VITE_SUPABASE_URL)
    : null;

  const imageName = `${Math.random()}-${newCabin.image?.name}`.replace("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${
        import.meta.env.VITE_SUPABASE_URL
      }/storage/v1/object/public/cabin-images/${imageName}`;

  const query = !id
    ? supabase
        .from("cabins")
        .insert([{ ...newCabin, image: imagePath }])
        .select()
    : await supabase
        .from("cabins")
        .update({ ...newCabin, image: imagePath })
        .eq("id", id)
        .select();

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  if (!id) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data[0].id);
      throw new Error("Something was wrong and we must deleted this record!");
    }
  }

  return data;
};

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta!.env!.VITE_SUPABASE_URL;
const supabaseKey = import.meta!.env!.VITE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl as string,
  supabaseKey as string
);

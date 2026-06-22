import { supabase } from "../../../lib/supabaseClient";

export async function fetchSiteConfig() {
  const { data, error } = await supabase
    .from("site_config")
    .select("*")
    .single();
  console.log("Fetched site config:", data);
  if (error) throw error;
  return data;
}

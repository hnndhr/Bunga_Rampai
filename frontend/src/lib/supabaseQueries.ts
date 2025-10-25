// src/lib/supabaseQueries.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getSurveys(options?: {
  filterType?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}) {
  const { filterType, sortBy = "created_at", order = "desc" } = options || {};

  let query = supabase
    .from("survey_articles")      // nanti ganti ke tabel yang benar bila perlu
    .select("title, slug, infographic_link, survey_type, created_at");

  if (filterType && filterType !== "all") {
    query = query.eq("survey_type", filterType);
  }

  query = query.order(sortBy, { ascending: order === "asc" });

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching surveys:", error);
    return [];
  }

  return data;
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("survey_articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
}


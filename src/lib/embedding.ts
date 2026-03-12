import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { createClient } from "@/lib/supabase/server";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "gemini-embedding-2-preview",
  apiKey: process.env.GOOGLE_API_KEY,
});

export interface LocationEmbeddingInput {
  shooting_location_id: string;
  name: string;
  city: string;
  price: string;
  description: string;
  area: number;
  pax: number;
  rate: number;
  tags: string[];
  image_url?: string;
}

function buildContentString(loc: LocationEmbeddingInput): string {
  const parts = [
    `Nama: ${loc.name}.`,
    `Kota: ${loc.city}.`,
    `Deskripsi: ${loc.description}.`,
    loc.tags.length > 0 ? `Tag: ${loc.tags.join(", ")}.` : null,
    `Area: ${loc.area}m².`,
    `Kapasitas: ${loc.pax} orang.`,
    `Harga: ${loc.price}.`,
    `Rating: ${loc.rate}/5.`,
  ].filter(Boolean);
  return parts.join(" ");
}

export interface LocationSearchResult {
  shooting_location_id: string;
  content: {
    name: string;
    city: string;
    price: string;
    description: string;
    area: number;
    pax: number;
    rate: number;
    tags: string[];
    image_url: string | null;
  };
  similarity: number;
}

export async function searchSimilarLocations(
  query: string,
  matchCount = 5,
  matchThreshold = 0.4,
): Promise<LocationSearchResult[]> {
  try {
    const vector = await embeddings.embedQuery(query);
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("match_location_embeddings", {
      query_embedding: vector,
      match_threshold: matchThreshold,
      match_count: matchCount,
    });

    if (error) {
      console.error("Vector search error:", error.message);
      return [];
    }

    return (data as LocationSearchResult[]) ?? [];
  } catch (err) {
    console.error("searchSimilarLocations failed:", err);
    return [];
  }
}

export async function upsertLocationEmbedding(
  loc: LocationEmbeddingInput,
): Promise<void> {
  try {
    const contentString = buildContentString(loc);
    const vector = await embeddings.embedQuery(contentString);

    const contentJson = {
      name: loc.name,
      city: loc.city,
      price: loc.price,
      description: loc.description,
      area: loc.area,
      pax: loc.pax,
      rate: loc.rate,
      tags: loc.tags,
      image_url: loc.image_url ?? null,
    };

    const supabase = await createClient();
    const { error } = await supabase
      .from("location_embeddings")
      .upsert(
        {
          shooting_location_id: loc.shooting_location_id,
          content: contentJson,
          embedding: vector,
        },
        { onConflict: "shooting_location_id" },
      );

    if (error) {
      console.error("Upsert embedding error:", error.message);
    }
  } catch (err) {
    console.error("upsertLocationEmbedding failed:", err);
  }
}

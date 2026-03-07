import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET all tags
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: tags, error } = await supabase
      .from("tags")
      .select("*")
      .order("tag", { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ tags }, { status: 200 });
  } catch (error) {
    console.error("Get tags error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data tags" },
      { status: 500 },
    );
  }
}

// POST create new tag
export async function POST(request: Request) {
  try {
    const { tag } = await request.json();

    // Validation
    if (!tag || !tag.trim()) {
      return NextResponse.json(
        { error: "Tag tidak boleh kosong" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // Check if tag already exists
    const { data: existingTag } = await supabase
      .from("tags")
      .select("*")
      .eq("tag", tag.trim())
      .single();

    if (existingTag) {
      return NextResponse.json({ error: "Tag sudah ada" }, { status: 400 });
    }

    // Insert new tag
    const { data, error } = await supabase
      .from("tags")
      .insert({ tag: tag.trim() })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Tag berhasil ditambahkan", tag: data },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create tag error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan tag" },
      { status: 500 },
    );
  }
}

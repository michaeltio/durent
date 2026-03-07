import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET all locations
export async function GET() {
  try {
    const supabase = await createClient();

    const { data: locations, error } = await supabase
      .from("shooting_locations")
      .select(
        `
        *,
        shooting_location_tag (
          tags (
            tag_id,
            tag
          )
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Transform data to include tags array
    const locationsWithTags = locations?.map((loc) => ({
      ...loc,
      tags:
        loc.shooting_location_tag?.map(
          (lt: { tags: { tag_id: string; tag: string } }) => lt.tags.tag,
        ) || [],
    }));

    return NextResponse.json({ locations: locationsWithTags }, { status: 200 });
  } catch (error) {
    console.error("Get locations error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat mengambil data locations" },
      { status: 500 },
    );
  }
}

// POST create new location
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const city = formData.get("city") as string;
    const price = formData.get("price") as string;
    const description = formData.get("description") as string;
    const area = parseFloat(formData.get("area") as string) || 0;
    const pax = parseInt(formData.get("pax") as string) || 0;
    const rate = parseFloat(formData.get("rate") as string) || 0;
    const tags = JSON.parse((formData.get("tags") as string) || "[]");

    // Get all image files
    const imageFiles: File[] = [];
    let index = 0;
    while (formData.has(`image_${index}`)) {
      const file = formData.get(`image_${index}`) as File;
      if (file && file.size > 0) {
        imageFiles.push(file);
      }
      index++;
    }

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { error: "Nama lokasi tidak boleh kosong" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const imageUrls: string[] = [];

    // Upload multiple images to Supabase Storage
    for (const imageFile of imageFiles) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("shooting_locations")
        .upload(filePath, imageFile, {
          contentType: imageFile.type,
          upsert: false,
        });

      if (uploadError) {
        // Clean up already uploaded images on error
        for (const url of imageUrls) {
          const path = url.split("/").slice(-2).join("/");
          await supabase.storage.from("shooting_locations").remove([path]);
        }
        return NextResponse.json(
          { error: `Upload error: ${uploadError.message}` },
          { status: 400 },
        );
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("shooting_locations").getPublicUrl(filePath);

      imageUrls.push(publicUrl);
    }

    // Insert location
    const { data: newLocation, error: insertError } = await supabase
      .from("shooting_locations")
      .insert({
        shooting_location_name: name.trim(),
        shooting_location_city: city?.trim() || "",
        shooting_location_price: price?.trim() || "",
        shooting_location_description: description?.trim() || "",
        shooting_location_area: area,
        shooting_location_pax: pax,
        shooting_location_rate: rate,
        shooting_location_image_url: imageUrls,
      })
      .select()
      .single();

    if (insertError) {
      // Clean up uploaded images on database error
      for (const url of imageUrls) {
        const path = url.split("/").slice(-2).join("/");
        await supabase.storage.from("shooting_locations").remove([path]);
      }
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    // Insert location tags if any
    if (tags.length > 0 && newLocation) {
      // Get tag IDs from tag names
      const { data: tagRecords } = await supabase
        .from("tags")
        .select("tag_id, tag")
        .in("tag", tags);

      if (tagRecords && tagRecords.length > 0) {
        const locationTags = tagRecords.map(
          (tag: { tag_id: string; tag: string }) => ({
            shooting_location_id: newLocation.shooting_location_id,
            tag_id: tag.tag_id,
          }),
        );

        await supabase.from("shooting_location_tag").insert(locationTags);
      }
    }

    return NextResponse.json(
      { message: "Lokasi berhasil ditambahkan", location: newLocation },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create location error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menambahkan lokasi" },
      { status: 500 },
    );
  }
}

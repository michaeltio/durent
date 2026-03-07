import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!data.user) {
      return NextResponse.json(
        { error: "User tidak berhasil dibuat" },
        { status: 400 },
      );
    }

    // Generate profile image URL dengan 2 huruf awal dari email
    const initials = email.substring(0, 2).toUpperCase();
    const profileImageUrl = `https://placeholdpicsum.dev/200x200/FFAAAA/FF1212?text=${initials}`;

    // Create data di table profiles
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: data.user.id,
      role: "user",
      profile_image_url: profileImageUrl,
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // User sudah dibuat di auth, tapi profile gagal
      // Tetap return success karena user bisa login
      return NextResponse.json(
        {
          message: "Registrasi berhasil, tapi profile gagal dibuat",
          user: data.user,
          session: data.session,
          warning: profileError.message,
        },
        { status: 201 },
      );
    }

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: data.user,
        session: data.session,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat registrasi" },
      { status: 500 },
    );
  }
}

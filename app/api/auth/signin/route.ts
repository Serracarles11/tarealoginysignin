import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email y contraseña requeridos" },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    )

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      )
    }

    // creamos una cookie nuestra para proteger /protected
    const res = NextResponse.json({ ok: true })
    res.cookies.set("app_session", "logged", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      // si quieres 1 día:
      maxAge: 24 * 60 * 60,
    })
    return res
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message ?? "Error inesperado" },
      { status: 500 }
    )
  }
}

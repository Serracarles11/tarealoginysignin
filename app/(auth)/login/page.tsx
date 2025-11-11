"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirect") || "/protected"

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      alert(data.error || "Credenciales incorrectas")
      return
    }

    // ✅ aquí la redirección que querías
    router.push(redirectTo)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="border p-6 rounded space-y-4 w-full max-w-sm">
        <h1 className="text-xl font-bold">Iniciar sesión</h1>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="border w-full px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Contraseña</label>
          <input
            className="border w-full px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name }),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      alert(data.error || "Error")
      return
    }

    // después de registrarse -> al login
    router.push("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={onSubmit} className="border p-6 rounded space-y-4 w-full max-w-sm">
        <h1 className="text-xl font-bold">Registro</h1>

        <div>
          <label className="block text-sm mb-1">Nombre</label>
          <input
            className="border w-full px-3 py-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
          />
        </div>

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
          className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-60"
        >
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  )
}

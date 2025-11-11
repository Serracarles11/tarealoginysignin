export default function ProtectedPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Página protegida</h1>
      <p>Has iniciado sesión ✅</p>
      <form action="/api/auth/signout" method="post">
        <button className="mt-4 border px-4 py-2 rounded">Cerrar sesión</button>
      </form>
    </div>
  )
}

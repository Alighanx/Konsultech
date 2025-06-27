import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("EQUIPO_TECNICO");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error || "Error al registrar");
    else {
      setSuccess("Usuario registrado correctamente");
      setTimeout(() => router.push("/login"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="EQUIPO_TECNICO">Equipo Técnico</option>
          <option value="GERENTE">Gerente</option>
        </select>
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        {success && <div className="text-green-600 mb-2 text-sm">{success}</div>}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">Registrarse</button>
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta? <a href="/login" className="text-green-600 hover:underline">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}

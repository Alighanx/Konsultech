import { registerUser } from "@/lib/registerUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();
  if (!name || !email || !password || !role) {
    return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 });
  }
  try {
    const user = await registerUser({ name, email, password, role });
    return NextResponse.json({ user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

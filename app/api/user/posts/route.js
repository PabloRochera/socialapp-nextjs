import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres' // o tu cliente DB

export async function GET() {
  try {
    // Ejemplo de consulta
    const { rows } = await sql`SELECT * FROM sa_posts`
    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al obtener publicaciones' }, { status: 500 })
  }
}

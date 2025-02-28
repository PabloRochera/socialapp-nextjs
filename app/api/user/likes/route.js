import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    // REEMPLAZA "currentUserId" con el ID real del usuario autenticado, 
    // por ejemplo, extrayéndolo de la sesión o de un token.
    const currentUserId = "currentUserId";
    
    // Consulta para obtener las publicaciones que el usuario ha marcado como "like"
    const { rows } = await sql`
      SELECT p.*, u.username, u.picture
      FROM sa_likes l
      JOIN sa_posts p ON l.post_id = p.post_id
      JOIN sa_users u ON p.user_id = u.user_id
      WHERE l.user_id = ${currentUserId}
      ORDER BY p.post_id DESC
    `;
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener likes" }, { status: 500 });
  }
}

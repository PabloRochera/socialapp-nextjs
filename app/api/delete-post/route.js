import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { auth0 } from "@/app/lib/auth0";

export async function POST(request) {
  try {
    const { post_id } = await request.json();
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const user_id = session.user.user_id;
    // Verifica que la publicación exista y pertenezca al usuario
    const post = (await sql`SELECT user_id FROM sa_posts WHERE post_id = ${post_id}`).rows[0];
    if (!post) {
      return NextResponse.json({ error: "Publicación no encontrada" }, { status: 404 });
    }
    if (post.user_id !== user_id) {
      return NextResponse.json({ error: "No tienes permisos para eliminar esta publicación" }, { status: 403 });
    }
    // Elimina comentarios y likes asociados antes de borrar la publicación
    await sql`DELETE FROM sa_comments WHERE post_id = ${post_id}`;
    await sql`DELETE FROM sa_likes WHERE post_id = ${post_id}`;
    await sql`DELETE FROM sa_posts WHERE post_id = ${post_id}`;
    
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en delete-post:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

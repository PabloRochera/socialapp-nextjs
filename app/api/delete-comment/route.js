import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { auth0 } from "@/app/lib/auth0";

export async function POST(request) {
  try {
    const { comment_id } = await request.json();
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const user_id = session.user.user_id;
    // Verifica que el comentario exista y pertenezca al usuario
    const comment = (await sql`SELECT user_id, post_id FROM sa_comments WHERE comment_id = ${comment_id}`).rows[0];
    if (!comment) {
      return NextResponse.json({ error: "Comentario no encontrado" }, { status: 404 });
    }
    if (comment.user_id !== user_id) {
      return NextResponse.json({ error: "No tienes permisos para eliminar este comentario" }, { status: 403 });
    }
    await sql`DELETE FROM sa_comments WHERE comment_id = ${comment_id}`;
    revalidatePath(`/post/${comment.post_id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en delete-comment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

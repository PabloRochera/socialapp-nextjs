'use server'

import { put } from "@vercel/blob"
import { sql } from "@vercel/postgres"
import { revalidatePath } from "next/cache"
import { auth0 } from "./auth0"

/**
 * Obtiene todas las publicaciones de la base de datos.
 * Ajusta la consulta si necesitas hacer JOIN con sa_users, etc.
 */
export async function getPosts() {
  try {
    const { rows } = await sql`
      SELECT post_id, content, url, user_id
      FROM sa_posts
      ORDER BY post_id DESC
    `
    return rows
  } catch (error) {
    console.error("Error en getPosts:", error)
    return []
  }
}

/**
 * Crea una nueva publicación con imagen subida a Vercel Blob.
 * `prevState` es el estado previo (lo provee useActionState), 
 * aunque normalmente no lo necesitas si usas formData.
 */
export async function createPost(prevState, formData) {
  try {
    // Obtener el user_id de la sesión actual (usando auth0)
    const user_id = (await auth0.getSession()).user.user_id

    // Subir la imagen al Blob Storage de Vercel
    const { url } = await put(
      'media',              // Nombre de la "carpeta" o ruta en Blob
      formData.get("media"), 
      { access: 'public' }  // Indica que el archivo será público
    )

    // Obtener el contenido del formulario
    const content = formData.get('content')

    // Insertar la nueva publicación en la base de datos
    await sql`
      INSERT INTO sa_posts(content, url, user_id)
      VALUES (${content}, ${url}, ${user_id})
    `

    // Revalidar la ruta principal para que se refleje el nuevo post
    revalidatePath('/')

    return { success: true }
  } catch (error) {
    console.error("Error en createPost:", error)
    return { success: false, error: error.message }
  }
}

/**
 * Agrega un "like" a una publicación.
 */
export async function insertLike(post_id, user_id) {
  try {
    await sql`
      INSERT INTO sa_likes(post_id, user_id)
      VALUES (${post_id}, ${user_id})
    `
  } catch (error) {
    console.error("Error en insertLike:", error)
  }
}

/**
 * Elimina un "like" de una publicación.
 */
export async function removeLike(post_id, user_id) {
  try {
    await sql`
      DELETE FROM sa_likes
      WHERE post_id = ${post_id} AND user_id = ${user_id}
    `
  } catch (error) {
    console.error("Error en removeLike:", error)
  }
}

/**
 * Obtiene los comentarios de un post
 */
export async function getComments(post_id) {
  try {
    const { rows } = await sql`
      SELECT c.comment_id, c.content, c.created_at, u.username, u.picture
      FROM sa_comments c
      JOIN sa_users u ON c.user_id = u.user_id
      WHERE c.post_id = ${post_id}
      ORDER BY c.created_at ASC
    `;
    return rows;
  } catch (error) {
    console.error("Error en getComments:", error);
    return [];
  }
}

/**
 * Obtiene todos los comentarios de todos los posts
 */
export async function getAllComments() {
  try {
    const { rows } = await sql`
      SELECT c.comment_id, c.content, c.created_at, c.post_id, u.username, u.picture
      FROM sa_comments c
      JOIN sa_users u ON c.user_id = u.user_id
      ORDER BY c.created_at ASC
    `;
    return rows;
  } catch (error) {
    console.error("Error en getAllComments:", error);
    return [];
  }
}

/**
 * Inserta un comentario para un post.
 * Se espera que formData contenga "post_id" y "content".
 */
export async function insertComment(formData) {
  'use server'
  try {
    const post_id = formData.get("post_id");
    const content = formData.get("content");
    const { user } = await auth0.getSession();
    const user_id = user.user_id;
    
    await sql`
      INSERT INTO sa_comments(content, user_id, post_id)
      VALUES (${content}, ${user_id}, ${post_id})
    `;
    
    // Revalida la ruta del post para reflejar el nuevo comentario
    revalidatePath(`/post/${post_id}`);
    
    return { success: true };
  } catch (error) {
    console.error("Error en insertComment:", error);
    return { success: false, error: error.message };
  }
}

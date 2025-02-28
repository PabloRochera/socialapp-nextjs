import { sql } from "@vercel/postgres"

export default async () => {
  // Crea la extensión uuid-ossp si no existe
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`

  // Elimina las tablas si existen (incluyendo la nueva de comentarios)
  await sql`DROP TABLE IF EXISTS sa_comments, sa_likes, sa_posts, sa_users`

  // Crea la tabla de usuarios
  await sql`
    CREATE TABLE IF NOT EXISTS sa_users(
      user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
      username TEXT, 
      name TEXT, 
      picture TEXT, 
      email TEXT UNIQUE
    )
  `
    
  // Crea la tabla de posts
  await sql`
    CREATE TABLE IF NOT EXISTS sa_posts(
      post_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      content TEXT,
      url TEXT,
      user_id UUID REFERENCES sa_users(user_id)
    )
  `

  // Crea la tabla de likes
  await sql`
    CREATE TABLE sa_likes( 
      user_id UUID REFERENCES sa_users(user_id),
      post_id UUID REFERENCES sa_posts(post_id),
      PRIMARY KEY(user_id, post_id)
    )
  `

  // Crea la tabla de comentarios
  await sql`
    CREATE TABLE IF NOT EXISTS sa_comments(
      comment_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      content TEXT,
      user_id UUID REFERENCES sa_users(user_id),
      post_id UUID REFERENCES sa_posts(post_id),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `

  return <p>Database seed the guay</p>
}

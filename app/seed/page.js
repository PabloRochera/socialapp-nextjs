import { sql } from "@vercel/postgres"

export default async () => {

    await sql`DROP TABLE IF EXISTS sa_users, sa_posts, sa_likes`
    
    await sql`CREATE TABLE IF NOT EXISTS sa_users(
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, 
        username TEXT, 
        name TEXT, 
        picture TEXT, 
        email TEXT UNIQUE
    )`;
    
    await sql`CREATE TABLE IF NOT EXISTS sa_posts(
        post_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        content TEXT,
        url TEXT,
        user_id UUID REFERENCES sa_users(user_id)
    )`

    await sql`CREATE TABLE sa_likes( 
        user_id UUID REFERENCES sa_users(user_id),
        post_id UUID REFERENCES sa_posts(post_id),
        PRIMARY KEY(user_id, post_id)
    )`

    return <p>Database seed the guay</p>
}
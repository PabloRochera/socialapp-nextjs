import { auth0 } from "@/app/lib/auth0";
import { getLike, getPost } from "@/app/lib/data"
import Post from "@/app/ui/post"

export default async ({params}) => {
    const post_id = (await params).post_id
    const user_id = (await auth0.getSession()).user.user_id;

    const post = (await getPost(post_id))[0];
    const like = await getLike(user_id, post_id);

    console.log(post)

    return (<>
        <Post 
            user_id={user_id} 
            post_id={post_id} 
            content={post.content} 
            url={post.url} 
            isLikedInitial={like.length > 0} 
            username={post.username}
            num_likes={num_likes}/>
    </>)
}
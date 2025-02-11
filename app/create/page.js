import { createPost } from "../lib/actions"
import ImageSelector from "../ui/image-selector"

export default () => {
    return (
        <form action={createPost} className="flex flex-col gap-8">
            <ImageSelector />
            <input name="content" className="text-black" required/>
            <input className="rounded bg-teal-800 p-2" type="submit" value="Publicar" />
        </form>
    )
}
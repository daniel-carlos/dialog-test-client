import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { postSchema } from "../../formSchemas/formSchemas"
import { reqPost } from "../../api/useAPI"
import { useAuth } from "../../contexts/auth/authContext"
import { usePostContext } from "../../contexts/posts/postsContext"
import { Post } from "../../types/mainTypes"
import { TimelinePost } from "./timelinePost"
import "./TimelinePage.css"

export const TimelineComponent = () => {
    const postForm = useForm({
        resolver: yupResolver(postSchema)
    })
    const me = useAuth();
    const { posts, addPost } = usePostContext();

    const { register, handleSubmit, reset, getValues } = postForm;

    const onSubmit = () => {
        const postObject = {
            authorId: me.me?.id,
            content: getValues("content")
        }
        reqPost("posts", JSON.stringify(postObject))
        // addPost(postObject)
        reset();
    }

    return <div id="main-container">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div id="timeline-textarea-container" style={{ width: "100%" }}>
                <textarea className="shadow-down" {...register("content")} />
            </div>
            <button >
                <h3 className="h-no-margin">Postar</h3>
            </button>
        </form>
        <div id="timeline-container">
            {posts != null && posts.map((p, i) => {
                return <div key={i} className="timeline-post"><TimelinePost post={p}></TimelinePost></div>
            })}
        </div>
    </div>
}
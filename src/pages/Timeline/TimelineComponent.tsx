import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { postSchema } from "../../formSchemas/formSchemas"
import { reqPost, useGet } from "../../api/useAPI"
import { Post } from "../../types/mainTypes"
import { getToken, useMe } from "../../contexts/user/meContext"

interface PostFormAttributes { texto: string }

export const TimelineComponent = () => {
    const postForm = useForm({
        resolver: yupResolver(postSchema)
    })
    const me = useMe();

    const { register, handleSubmit, reset, getValues } = postForm;

    const [posts, error] = useGet("posts");

    const onSubmit = () => {
        reqPost("posts", JSON.stringify({
            authorId: me.me?.id,
            content: getValues("content")
        }))
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

        </div>
    </div>
}
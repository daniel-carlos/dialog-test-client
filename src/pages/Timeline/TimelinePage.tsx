import { useEffect } from "react"
import { MainContainerHeader } from "../../components/layout/MainContainerHeader"
import { TimelineComponent } from "./TimelineComponent"
import { reqGet, useGet } from "../../api/useAPI"
import { usePostContext } from "../../contexts/posts/postsContext"
import { Post } from "../../types/mainTypes"

export const TimelinePage = () => {
    const { setPosts } = usePostContext();

    useEffect(() => {
        const refreshPosts = async () => {
            const [data, err] = await reqGet<Post[]>("posts")
            if (data != null && !err) {
                setPosts(data);
            }
        }

        setInterval(() => {
            refreshPosts()
        }, 1000);
    }, [])

    return (
        <>
            <MainContainerHeader title="Timeline" />
            <TimelineComponent />
        </>
    )
}
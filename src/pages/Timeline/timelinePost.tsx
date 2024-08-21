import { format } from "date-fns"
import { ProfilePicture } from "../../components/common/ProfilePicture"
import { Post } from "../../types/mainTypes"
import { PostLikeContainer } from "./PostLikeCounter"

interface TimelinePostProps {
    post: Post
}



export const TimelinePost = ({ post }: TimelinePostProps) => {

    return <div className="timeline-post-element">
        <div className="avatar-container">
            <ProfilePicture user={post.author} />
        </div>
        <div className="content-container">
            <div className="content-container-header">
                <span>{post.author.name}</span>
                {" - "}
                <span>{format(post.createdAt, "dd/MM/yyyy")}</span>
            </div>
            <div>{post.content}</div>
        </div>
        <div className="likes-container">
            <PostLikeContainer post={post} />
        </div>
    </div>
}
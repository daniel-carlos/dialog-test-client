import { ProfilePicture } from "../../components/common/ProfilePicture"
import { Post } from "../../types/mainTypes"

interface TimelinePostProps {
    post: Post
}

export const TimelinePost = ({ post }: TimelinePostProps) => {

    return <div className="timeline-post-element">
        <div className="avatar-container">
            <ProfilePicture user={post.author} />
        </div>
        <div className="content-container">
            <div>
                <span>{post.author.name}</span>
                <span>{post.createdAt.toString()}</span>
            </div>
        </div>
        <div className="likes-container">{post.likes?.length}</div>
    </div>
}
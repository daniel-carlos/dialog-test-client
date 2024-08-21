import { CSSProperties, useEffect, useState } from "react";
import { Like, Post } from "../../types/mainTypes";
import heartIcon from "../../assets/heart-svgrepo-com.svg"
import { FaHeart } from "react-icons/fa";
import { reqPost, usePost } from "../../api/useAPI";
import { useAuth } from "../../contexts/auth/authContext";
import { usePostContext } from "../../contexts/posts/postsContext";

interface PostLikeContainerProps {
    post: Post
}

const contanierStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
}

const likesCountStyle: CSSProperties = {
    paddingLeft: "0.4em",
    paddingRight: "1.5em",
    paddingTop: "0px !important",
    paddingBottom: "0px !important",

    backgroundColor: "white",
    borderRadius: "5px 0 0 5px"
}

const heartIconSize = 40

const iconStyle: CSSProperties = {
    height: heartIconSize,
    marginLeft: "-0.5em",
    marginTop: "-1em",
    marginBottom: "-1em",
    fontSize: "225%",
    width: heartIconSize,
    color: "#bf2222"

}

export const PostLikeContainer = ({ post }: PostLikeContainerProps) => {
    const { me } = useAuth();
    const { addLike } = usePostContext();
    const [liked, setLiked] = useState<boolean>();

    useEffect(() => {
        setLiked(() => {
            return post.likes?.some(p => p.user.id === me?.id);
        })
    }, []);

    const onClick = async () => {
        const [likeResult, err] = await reqPost<Like>("likes", JSON.stringify({
            userId: me?.id,
            postId: post.id
        }))


        if (err) {
            console.log("LIKE", err.message);
        } else {
            console.log("LIKE", likeResult);
            addLike(post, likeResult!);
        }
    }

    return (
        <a type="button" style={contanierStyle} onClick={onClick}>
            <div style={likesCountStyle}>{post.likes?.length}</div>
            <div style={iconStyle} >
                <FaHeart width={"100%"} height={"100%"} />
            </div>
        </a>
    )
}
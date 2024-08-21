import { CSSProperties, useEffect, useState } from "react";
import { Like, Post } from "../../types/mainTypes";
import heartIcon from "../../assets/heart-svgrepo-com.svg"
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { reqDelete, reqPost, usePost } from "../../api/useAPI";
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
    const { addLike, removeLike } = usePostContext();
    const [liked, setLiked] = useState<boolean>();
    const [count, setCount] = useState<number>();

    const refreshLikeStatus = () => {
        setLiked(() => {
            return post.likes?.some(like => {
                console.log("====>", like.user?.id, me?.id);
                const isMe = like.user?.id === me?.id

                // console.log(like.user, me);

                return isMe;
            });
        });
        setCount(post.likes?.length);
    }

    useEffect(() => {
        refreshLikeStatus();
    }, [post, post.likes]);

    async function LikeThisPost(): Promise<void> {
        const [likeResult, err] = await reqPost<Like>("likes", JSON.stringify({
            userId: me?.id,
            postId: post.id
        }));
        if (err) {
            console.log("LIKE", err.message);
        } else {
            console.log("LIKE", likeResult);
            addLike(post, likeResult!);
        }
    }
    async function UnlikeThisPost(): Promise<void> {
        const [unlikeResult, err] = await reqDelete(`likes/${me?.id}/${post.id}`);
        if (err) {
            console.log("UNLIKE", err.message);
            removeLike(post, me?.id!)
        }
    }

    const onClick = async () => {
        if (liked) {
            await UnlikeThisPost()
        } else {
            await LikeThisPost();
        }
        // setLiked(!liked);
        refreshLikeStatus();
    }

    return (
        <a type="button" style={contanierStyle} onClick={onClick}>
            <div style={likesCountStyle}>{post.likes?.length}</div>
            <div style={iconStyle} >
                <FaHeart width={"100%"} height={"100%"} style={{ color: liked ? "red" : "grey" }} />
            </div>
        </a>
    )
}
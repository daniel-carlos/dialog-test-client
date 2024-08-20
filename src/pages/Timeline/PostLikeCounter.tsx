import { CSSProperties } from "react";
import { Like, Post } from "../../types/mainTypes";
import heartIcon from "../../assets/heart-svgrepo-com.svg"

interface PostLikeContainerProps {
    likes: Like[]
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
    marginLeft: "-1em",
    marginTop: "-1em",
    marginBottom: "-1em",
}

export const PostLikeContainer = ({ likes }: PostLikeContainerProps) => {

    return (
        <div style={contanierStyle}>
            <div style={likesCountStyle}>{likes.length}</div>
            <div style={iconStyle}>
                <img src={heartIcon} width={heartIconSize} height={heartIconSize} />
            </div>
        </div>
    )
}
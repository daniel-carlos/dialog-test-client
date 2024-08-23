import { ImgHTMLAttributes } from "react";
import { getAvatarURL } from "../../api/staticFilesAPI";
import { User } from "../../types/mainTypes";

interface ProfilePictureProps {
    user?: User,
    rest?: ImgHTMLAttributes<any>
}

export const ProfilePicture = ({ user, ...rest }: ProfilePictureProps) => {

    return (
        <img className="avatar" src={getAvatarURL(user!.id)} width={"100%"} height={"100%"} style={{ borderRadius: "50%" }} {...rest} />
    )
}
import { getAvatarURL } from "../../api/staticFilesAPI";
import { User } from "../../types/mainTypes";

interface ProfilePictureProps {
    user?: User
}

export const ProfilePicture = ({ user }: ProfilePictureProps) => {

    return (
        <img src={getAvatarURL(user!.id)} width={"100%"} height={"100%"} style={{ borderRadius: "50%" }} />
    )
}
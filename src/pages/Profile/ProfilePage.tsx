import { ProfilePicture } from "../../components/common/ProfilePicture"
import { useAuth } from "../../contexts/auth/authContext"
import "./ProfilePage.css"

export const ProfilePage = () => {
    const { me } = useAuth();

    return <div id="profile-page" className="full">
        <div id="profile-card" className="shadow">
            <div id="profile-picture-container">
                <ProfilePicture user={me!} />
            </div>
            <h1>{me?.name}</h1>
            <em>{me?.username}</em>
        </div>
    </div>
}
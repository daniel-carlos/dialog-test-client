import { ReactNode, useEffect } from "react"
import "./MainLayout.css"
import { useAuth } from "../../contexts/auth/authContext"
import { Link, useNavigate } from "react-router-dom"
import { ProfilePicture } from "../common/ProfilePicture"




interface DefaultLayoutProps {
    children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const {logout, me} = useAuth()

    const logoutClickHandler = () => {
        logout();
    }

    return <div id="main-layout" className="full">
        <header>
            <div id="main-navbar">
                <Link to="/feed" className="header-link"><h4>Feed</h4></Link>
                <Link to="/profile" className="header-link"><h4>Profile</h4></Link>
            </div>
            <Link to="/profile" id="profile-banner">
                <div id="profile-name-panel"><h4>{me?.name}</h4></div>
                <div id="profile-img-panel">
                    <ProfilePicture user={me!} />
                </div>
            </Link>
            <a onClick={logoutClickHandler}>Sair</a>
        </header>
        <main>
            <div id="main-layout-container">
                {children}
            </div>
        </main>
        {/* <footer>Footer</footer> */}
    </div>
}
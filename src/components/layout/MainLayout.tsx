import { ReactNode, useEffect } from "react"
import "./MainLayout.css"
import { useMe } from "../../contexts/user/meContext"
import { Link, useNavigate } from "react-router-dom"




interface DefaultLayoutProps {
    children: ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    const me = useMe()
    const navigate = useNavigate();

    const logout = () => {
        navigate("/login");
        me.logout();
    }

    return <div id="main-layout" className="full">
        <header>
            <div id="main-navbar">
                <Link to="/feed" className="header-link"><h4>Feed</h4></Link>
                <Link to="/profile" className="header-link"><h4>Profile</h4></Link>
            </div>
            <div id="profile-banner">
                <div id="profile-name-panel"><h4>{me.me?.name}</h4></div>
                <div id="profile-img-panel">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" width={"100%"} height={"100%"} style={{ borderRadius: "50%" }} />
                </div>
            </div>
        </header>
        <main>
            <div id="main-layout-container">
                {children}
            </div>
        </main>
        {/* <footer>Footer</footer> */}
    </div>
}
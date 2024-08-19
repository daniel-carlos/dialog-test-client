import { ReactNode } from "react"
import "./MainLayout.css"
import { useMe } from "../../contexts/user/meContext"
import { useNavigate } from "react-router-dom"

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
            <a href="/">
                <h3>{me.me?.name}</h3>
            </a>
            <div id="main-navbar">
                <a href="/feed">Feed</a>
                <a href="/profile">Profile</a>
                <a href="/profile">OPther</a>
            </div>
            <div>
                <div onClick={logout}>Sair</div>
            </div>
        </header>
        <main>
            {children}
        </main>
        <footer>Footer</footer>
    </div>
}
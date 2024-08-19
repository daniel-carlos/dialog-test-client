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
    useEffect(() => {

        console.log("==========XX================================");
        console.log(me.me);
        console.log(me.token);
        console.log("=====================");
    }, [])

    return <div id="main-layout" className="full">
        <header>
            <Link to="/">
                <h3>{me.me?.name}</h3>
            </Link>
            <div id="main-navbar">
                <Link to="/feed">Feed</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/profile">OPther</Link>
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
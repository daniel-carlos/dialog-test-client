import "./loginPage.css"
import imagebg from "../assets/pages/loginPageBG.jpg"
import { CSSProperties } from "react"

const rightPanelStyle: CSSProperties = {
    backgroundImage: `url(${imagebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

export const LoginPage = () => {

    const onSubmit = () => {

    }
    
    return (
        <div id="login-page" className="full" >
            <div className="login-container shadow">
                <div className="login-left-panel" style={rightPanelStyle}>
                    {/* <img src="src/assets/pages/loginPageBG.jpg" alt="" style={{width: "100%", height: "100%", objectFit: "cover"}}/> */}
                </div>
                <div className="login-right-panel">
                    <h1>Login</h1>
                    <p>Digite o usuário e senha:</p>
                    <form>
                        <input type="text" className="shadow-2" />
                        <input type="password" className="shadow-2" id="login-pw" />
                        <button type="button">
                            <span>Entrar</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
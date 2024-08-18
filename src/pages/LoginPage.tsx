import "./loginPage.css"
import imagebg from "../assets/pages/loginPageBG.jpg"
import { CSSProperties } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../formSchemas/formSchemas"

const rightPanelStyle: CSSProperties = {
    backgroundImage: `url(${imagebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

export const LoginPage = () => {

    const { handleSubmit, register, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema),
    });

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" className="shadow-2" {...register("username")} />
                        {errors["username"] && <div className="error-msg">{errors["username"].message}</div>}
                        <input type="password" className="shadow-2" id="login-pw" {...register("password")} />
                        {errors["password"] && <div className="error-msg">Diabeisso lembra nem tua senha?</div>}
                        <button type="submit">
                            <span>Entrar</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
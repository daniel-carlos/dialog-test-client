import "./loginPage.css"
import imagebg from "../assets/pages/loginPageBG.jpg"
import { CSSProperties } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../formSchemas/formSchemas"
import { reqGet, reqPost } from "../api/useAPI"
import { useMe } from "../contexts/user/meContext"
import { User } from "../types/mainTypes"
import { getAuthToken, setAuthToken } from "../api/cookie"

const rightPanelStyle: CSSProperties = {
    backgroundImage: `url(${imagebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

export const LoginPage = () => {
    const me = useMe();

    const { handleSubmit, register, formState: { errors }, getValues } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit = async () => {
        try {
            const token = await reqPost("auth/login", JSON.stringify({
                username: getValues("username"),
                password: getValues("password")
            }));
            console.log("Token:", token.token);
            setAuthToken(String(token.token));
            console.log("Cookie", getAuthToken());


            const user: User = await reqGet("auth/me");
            console.log("USER", user);

            me.setMe(user);
        } catch (error) {
            console.error("Erro ao obter token:", error);
            // Tratar o erro adequadamente
        }
    };

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
                        {me && me.me?.name}
                        <br />
                        {me && me.me?.username}
                    </form>
                </div>
            </div>



        </div>
    )
}
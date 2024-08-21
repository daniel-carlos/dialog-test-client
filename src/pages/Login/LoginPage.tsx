import "./loginPage.css"
import imagebg from "../../assets/pages/loginPageBG2.jpg"
import { CSSProperties } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../formSchemas/formSchemas"
import { reqGet, reqPost } from "../../api/useAPI"
import { useAuth } from "../../contexts/auth/authContext"
import { SimpleInput } from "../../components/form/simpleInput"
import { useNavigate } from "react-router-dom"
import { User } from "../../types/mainTypes"

const leftPanelStyle: CSSProperties = {
    backgroundImage: `url(${imagebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

export const LoginPage = () => {
    const me = useAuth();

    const form = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit, getValues } = form;

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            me.logout();

            const [loginResponse, loginError] = await reqPost<{ token: string }>("auth/login", JSON.stringify({
                username: getValues("username"),
                password: getValues("password")
            }));

            if (loginError) {
                return;
            }

            me.setToken(loginResponse!.token)

            const [userResponse, userError] = await reqGet<{ ok: boolean, user: User }>("auth/me");

            if (userResponse != null && userResponse.ok) {
                const { user } = userResponse;
                me.setMe(user);
                navigate("/feed");
            }
        } catch (error) {
            // Tratar o erro adequadamente
        }
    };

    return (
        <div id="login-page" className="full" >
            <div className="login-container shadow">
                <div className="login-left-panel" style={leftPanelStyle}>
                    {/* <img src="src/assets/pages/loginPageBG.jpg" alt="" style={{width: "100%", height: "100%", objectFit: "cover"}}/> */}
                </div>
                <div className="login-right-panel">
                    <h1>Login</h1>
                    <p>Digite o usuário e senha:</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <SimpleInput name="username" form={form} inputProps={{ type: "text" }} />
                        <SimpleInput name="password" form={form} inputProps={{ type: "password" }} />
                        <button type="submit">
                            <span>Entrar</span>
                        </button>
                        <a onClick={() => { }}>ou Cadastre-se</a>
                    </form>
                </div>
            </div>



        </div>
    )
}
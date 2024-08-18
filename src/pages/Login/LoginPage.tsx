import "./loginPage.css"
import imagebg from "../../assets/pages/loginPageBG2.jpg"
import { CSSProperties } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../formSchemas/formSchemas"
import { reqGet, reqPost } from "../../api/useAPI"
import { useMe } from "../../contexts/user/meContext"
import { SimpleInput } from "../../components/form/simpleInput"

const leftPanelStyle: CSSProperties = {
    backgroundImage: `url(${imagebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

export const LoginPage = () => {
    const me = useMe();

    const form = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit, register, formState: { errors }, getValues } = form;

    const onSubmit = async () => {
        try {
            me.logout();

            const loginResponse = await reqPost("auth/login", JSON.stringify({
                username: getValues("username"),
                password: getValues("password")
            }));

            me.setToken(loginResponse.token)

            const userResponse = await reqGet("auth/me");
            if (userResponse.ok) {
                const { user } = userResponse;
                console.log("USER", user);
                me.setMe(user);
            } else {
                console.log("Erro");
            }
        } catch (error) {
            console.error("Erro ao obter token:", error);
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
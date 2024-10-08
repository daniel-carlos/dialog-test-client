import "./loginPage.css"
import imagebg from "../../assets/pages/loginPageBG2.jpg"
import { CSSProperties, useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../formSchemas/formSchemas"
import { reqGet, reqPost } from "../../api/useAPI"
import { useAuth } from "../../contexts/auth/authContext"
import { SimpleInput } from "../../components/form/simpleInput"
import { Link, useNavigate } from "react-router-dom"
import { User } from "../../types/mainTypes"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"

const leftPanelStyle: CSSProperties = {
    backgroundImage: `url(${imagebg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
}

export const LoginPage = () => {
    const me = useAuth();

    const [inSignup, setInSignup] = useState<boolean>(false)

    const form = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit, getValues, setError, formState: { errors } } = form;

    const navigate = useNavigate();

    const onSubmit = async () => {
        try {
            me.logout();

            const [loginResponse, loginError] = await reqPost<{ token: string, error: Error | null }>("auth/login", JSON.stringify({
                username: getValues("username"),
                password: getValues("password")
            }));

            if (loginResponse?.error) {
                setError("root", { message: "Credenciais Inválidas" })
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
        <div style={{height: "100vh"}}>
            <div id="login-page" className="full" >
                <div className="login-container shadow">
                    <div className="login-left-panel" style={leftPanelStyle}>
                        {/* <img src="src/assets/pages/loginPageBG.jpg" alt="" style={{width: "100%", height: "100%", objectFit: "cover"}}/> */}
                    </div>
                    <div className="login-right-panel">
            
                        {!inSignup && <>
                            <LoginForm />
                            <a onClick={() => { setInSignup(true) }}>ou Cadastre-se</a>
                        </>}
                        {inSignup && <>
                            <SignupForm createCallback={() => {
                                setInSignup(false)
                            }} />
                            <div>
                                <span>{"Já tem uma conta? "}</span>
                                <span>
                                    <a onClick={() => { setInSignup(false) }}>Entre</a>
                                </span>
                            </div>
                        </>}
                    </div>
                </div>
            
            
            
            </div>
        </div>
    )
}
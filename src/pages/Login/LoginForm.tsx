import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../formSchemas/formSchemas";
import { useAuth } from "../../contexts/auth/authContext";
import { reqGet, reqPost } from "../../api/useAPI";
import { User } from "../../types/mainTypes";
import { useNavigate } from "react-router-dom";
import { SimpleInput } from "../../components/form/simpleInput";

interface LoginFormProps {

}

export const LoginForm = ({ }: LoginFormProps) => {
    const me = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(loginSchema),
    });

    const { handleSubmit, getValues, setError, formState: { errors } } = form;

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

    return <>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>Digite o usuário e senha:</div>
            {errors.root && <div className="error-msg">{errors.root.message}</div>}
            <SimpleInput name="username" form={form} inputProps={{ type: "text" }} isRequired />
            <SimpleInput name="password" form={form} inputProps={{ type: "password" }} isRequired />
            <button type="submit">
                <span>Entrar</span>
            </button>
        </form>
    </>
}
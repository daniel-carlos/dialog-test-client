import { yupResolver } from "@hookform/resolvers/yup";
import { reqGet, reqPost, sendFile, usePost } from "../../api/useAPI";
import { SimpleInput } from "../../components/form/simpleInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/authContext";
import { signupSchema } from "../../formSchemas/formSchemas";
import { User } from "../../types/mainTypes";
import { useState } from "react";

interface SignupFormProps {

}

export const SignupForm = ({ }: SignupFormProps) => {
    const me = useAuth();
    const navigate = useNavigate();

    const form = useForm({
        resolver: yupResolver(signupSchema),
    });

    const { handleSubmit, getValues, setValue, setError, formState: { errors } } = form;

    const onSubmit = async () => {
        try {
            const [createdUser, err] = await reqPost<User>("users", JSON.stringify({
                username: getValues("username"),
                password: getValues("password"),
                name: getValues("myname"),
            }))
            if (err) {
                return;
            }
            console.log("Novo Usuário", createdUser);

            if (avatarFile) {
                const formData = new FormData();
                formData.append('avatar', avatarFile);
                const fileUpload = await sendFile(`users/avatar-upload/${createdUser?.id}`, formData)
                console.log("File Upload", fileUpload);
            }
        } catch (error) {
            // Tratar o erro adequadamente
            console.log("Erro upload", error);

        }
    };

    const [previewUrl, setPreviewUrl] = useState<string>();
    const [avatarFile, setAvatarFile] = useState<File>();

    const onImageUpload = (file: File) => {
        console.log("FILE =>", file);

        const objectURL = URL.createObjectURL(file);
        console.log("Image", objectURL);
        setAvatarFile(file);
        setPreviewUrl(objectURL)
    }

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedImage(file);
            onImageUpload(file);
        }
    };

    const AvatarUploader = () => {
        return <div>
            <img src={previewUrl} alt="" style={{ width: "4em", height: "4em" }} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
    }

    return <>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <SimpleInput title="Nome" name="myname" form={form} inputProps={{ type: "text" }} isRequired />
            <SimpleInput title="Nome de Usuário" name="username" form={form} inputProps={{ type: "text" }} isRequired />
            <SimpleInput title="Senha" name="password" form={form} inputProps={{ type: "password" }} isRequired />
            <SimpleInput title="Confirmar Senha" name="confirmPassword" form={form} inputProps={{ type: "password" }} isRequired />
            <AvatarUploader />
            <button type="submit">
                <span>Cadastrar-se</span>
            </button>
        </form>
    </>
}
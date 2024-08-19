import * as Yup from 'yup';

export const loginSchema = Yup.object({
    username: Yup.string().required('O campo de username é obrigatório').matches(/^[a-zA-Z0-9_]+$/, 'O nome de usuário só pode conter letras, números e underline'),
    password: Yup.string().min(6)
})

export const postSchema = Yup.object().shape({
    content: Yup.string()
        .required('Este campo é obrigatório')
        .min(1, 'Este campo deve ter pelo menos 1 caractere')
});
import * as Yup from 'yup';

export const loginSchema = Yup.object({
    username: Yup.string().required('O campo de username é obrigatório').matches(/^[a-zA-Z0-9_]+$/, 'O nome de usuário só pode conter letras, números e underline'),
    password: Yup.string().min(6)
})

export const signupSchema = Yup.object({
    myname: Yup.string().required('O campo de Nome é obrigatório'),
    username: Yup.string().required('O campo de Nome de Usuário é obrigatório').matches(/^[a-zA-Z0-9_]+$/, 'O nome de usuário só pode conter letras, números e underline'),
    password: Yup.string().min(6),
    confirmPassword: Yup.string().min(6),
    // name: Yup.string().required().min(4),
    // avatarUrl: Yup.string().required().url()
})

export const postSchema = Yup.object().shape({
    content: Yup.string()
        .required('Este campo é obrigatório')
        .min(1, 'Este campo deve ter pelo menos 1 caractere')
});
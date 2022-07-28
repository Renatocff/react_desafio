import * as yup from 'yup';

export const signInFormSchema = yup.object().shape({
    usuario: yup.string().required('Usuário é obrigatório'),
    senha: yup.string().required('Senha obrigatória'),
});
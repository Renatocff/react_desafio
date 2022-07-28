import * as yup from 'yup';

export const createSimplePostFormSchema = yup.object().shape({
    text: yup.string().min(3, 'Texto inválido').required('Texto Obrigatório'),
    date: yup.string().required('data é obrigatória'),
});

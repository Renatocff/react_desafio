import { ApolloError, useMutation } from "@apollo/client";
import { Alert, AlertDescription, AlertIcon, Button, Flex, Stack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LOGIN_MUTATION } from "Graphql/Mutations";
import { Input } from "components/Form/Input";
import { signInFormSchema } from "validations/login";
import { SignInFormData } from "interfaces/Login";

export const Login = () => {

    const navigate = useNavigate();
    const [erroLogin, setErroLogin] = useState<boolean>(false);
    const [login, { loading }] = useMutation(LOGIN_MUTATION);

    const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>({
        resolver: yupResolver(signInFormSchema)
    });

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        login({ variables: { usuario: values.usuario, senha: values.senha } })
            .then((response) => {
                localStorage.setItem("token", response.data.login.token);
                localStorage.setItem("usuario", response.data.login.user.usuario);
                navigate('/');
            }).catch((erro: ApolloError) => {
                if (erro.message === "Senha inválida") {
                    setErroLogin(true);
                }
            });
    }

    return (
        <Flex w="100vw" h="100vh" align="center" justify="center">
            <Flex
                as="form"
                width="100%"
                maxWidth={360}
                bg="gray.800"
                p={8}
                borderRadius={8}
                flexDir="column"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing={4}>
                    <Input
                        type="text"
                        label="Usuario"
                        {...register(('usuario'), { required: 'Usuário é obrigatório' })}
                        error={errors.usuario}
                    />

                    <Input
                        type="password"
                        label="Senha"
                        {...register(('senha'), { required: 'Senha é obrigatória' })}
                        error={errors.senha}
                    />
                </Stack>
                <VStack>
                    <Button type="submit" mt="6" colorScheme="pink" size="lg" isLoading={loading}>Entrar</Button>
                    {erroLogin && <Alert status='error' bgColor="gray.800">
                        <AlertIcon />
                        <AlertDescription color="red">Usuário ou senha inválido.</AlertDescription>
                    </Alert>}
                </VStack>
            </Flex>
        </Flex>
    );
}
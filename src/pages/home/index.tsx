import { ApolloError, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { Box, Button, Icon, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";

import { LOAD_SIMPLEPOST } from "Graphql/Querys";
import TableComponent from "components/Table";
import ModalForm from 'components/ModalForm';
import ModalRemove from "components/ModalRemove";
import { ISimplePost } from "interfaces/SimplePost";
import { useNavigate } from "react-router-dom";
import { Header } from "components/Header/index";

export const Home = () => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [openModalRemove, setOpenModalRemove] = useState<boolean>(false);
    const [operation, setOperation] = useState<number>(0);
    const [simplePost, setSimplePost] = useState<ISimplePost>({ id: 0, text: '', date: '' });
    const [simplePosts, setSimplePosts] = useState<ISimplePost[]>([]);
    const [erroGraphql, setErroGraphql] = useState<ApolloError>();
    const { error, loading, refetch } = useQuery(LOAD_SIMPLEPOST);

    useEffect(() => {
        if (erroGraphql?.message === "Unauthorized") {
            alert("Você precisa estar logado para usar este recurso.");
            navigate('/login');
        }
    }, [erroGraphql]);

    useEffect(() => {
        if (!openModal || !openModalRemove) {
            refetch()
                .then((response) => setSimplePosts(response.data.simplePosts))
                .catch((erro) => setErroGraphql(erro));
        }
    }, [openModal, openModalRemove]);

    return (
        <>
            <Header />
            <Box>
                <Flex
                    w="100%"
                    my="6"
                    maxWidth={1480}
                    mx="auto"
                    px="6"
                >
                    <Box
                        flex="1"
                        borderRadius={8}
                        bg="gray.800"
                        p="8"
                    >
                        <Flex mb="8" justify="space-between" align="center">
                            <Heading size="lg" fontWeight="normal">
                                Registros
                            </Heading>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                                onClick={() => setOpenModal(prevState => !prevState)}
                            >
                                Criar novo
                            </Button>
                        </Flex>

                        {loading ? (
                            <Flex justify="center">
                                <Spinner />
                            </Flex>
                        ) : error ? (
                            <Flex justify="center">
                                <Text>Falha ao carregar os dados dos usuários...</Text>
                            </Flex>
                        ) : (
                            <>
                                <TableComponent
                                    simplePosts={simplePosts}
                                    setOpetarion={setOperation}
                                    setSimplePost={setSimplePost}
                                    setOpenModal={setOpenModal}
                                    setOpenModalRemove={setOpenModalRemove}
                                />
                            </>
                        )}
                    </Box>
                </Flex>
                <ModalForm
                    open={openModal}
                    setOpen={setOpenModal}
                    operation={operation}
                    setOperation={setOperation}
                    simplepost={simplePost}
                    setSimplePost={setSimplePost}
                />
                <ModalRemove
                    simplepost={simplePost}
                    open={openModalRemove}
                    setOpen={setOpenModalRemove}
                />
            </Box>
        </>
    );
}
import { Box, Button, HStack, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { RiPencilFill } from "react-icons/ri";
import moment from 'moment';
import { memo } from "react";
import { FaTrash } from "react-icons/fa";
import { ITable } from "interfaces/Table";

const TableComponent = ({ simplePosts, setOpetarion, setSimplePost, setOpenModal, setOpenModalRemove }: ITable) => {

    return (
        <Table colorScheme="whiteAlpha">
            <Thead>
                <Tr>
                    <Th width="10%">Id</Th>
                    <Th width="50%">Text</Th>
                    <Th width="15%">Data de cadastro</Th>
                    <Th width="15%">Atualização</Th>
                    <Th width="10%">Ações</Th>
                </Tr>
            </Thead>
            <Tbody>
                {simplePosts?.map((post: any) => {
                    return (
                        <Tr key={post.id}>
                            <Td align='center'>
                                <Box>
                                    <Text fontSize="smal" color="gray.300">{post.id}</Text>
                                </Box>
                            </Td>
                            <Td align='center'>{post.text}</Td>
                            <Td align='center'>{moment(post.date).add(1, 'days').format("ddd, DD MMMM")}</Td>
                            <Td align='center'>{moment(post.updatedAt).format("ddd, DD MMMM")}</Td>
                            <Td align='center'>
                                <HStack>
                                    <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="purple"
                                        leftIcon={<Icon as={RiPencilFill} fontSize="14" />}
                                        onClick={() => {
                                            setOpetarion(1);
                                            setSimplePost(post);
                                            setOpenModal(true);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="red"
                                        onClick={() => {
                                            setSimplePost(post);
                                            setOpenModalRemove(true);
                                        }}>
                                        <Icon as={FaTrash} fontSize="10" />
                                    </Button>
                                </HStack>
                            </Td>
                        </Tr>
                    );
                })}
            </Tbody>
        </Table>
    );
}

export default memo(TableComponent);
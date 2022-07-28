import { useEffect, useState } from "react";
import { HStack, ModalFooter } from "@chakra-ui/react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useMutation } from "@apollo/client";

import { REMOVE_SIMPLEPOST_MUTATION } from "Graphql/Mutations";
import { IModalRemove } from "interfaces/ModalRemove";

const ModalRemove = ({ simplepost, open, setOpen }: IModalRemove) => {
    const [id, setId] = useState<number>();

    const [removeSimplePost, { loading }] = useMutation(REMOVE_SIMPLEPOST_MUTATION, {
        variables: {
            id: Number(id)
        },
        onCompleted: () => {
            setOpen(false);
        }
    });

    useEffect(() => {
        setId(simplepost.id);
    }, [simplepost])

    return (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <ModalOverlay />
            <ModalContent w={500} height={200} bg="gray.800" border="1px solid #c2c2c2">
                <ModalHeader color="gray.200">{`Confirmação de operação`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Você está prestes a remover o registro {id}, confirma a exclusão?
                </ModalBody>
                <ModalFooter>
                    <HStack>
                        <Button
                            type="submit"
                            colorScheme="whiteAlpha"
                            onClick={() => setOpen(false)}
                            isLoading={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            colorScheme="red"
                            isLoading={loading}
                            onClick={() => removeSimplePost()}
                        >
                            Excluir
                        </Button>
                    </HStack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ModalRemove;
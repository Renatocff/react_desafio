import { Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import moment from "moment";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegSave } from 'react-icons/fa';

import { SIMPLEPOST_REGISTEr_MUTATION, UPDATE_SIMPLEPOST_MUTATION } from "Graphql/Mutations";
import { ISimplePost } from "interfaces/SimplePost";
import { IModalForm } from "interfaces/ModalForm";
import { Input } from "components/Form/Input";
import { createSimplePostFormSchema } from "validations/modalForm";

const ModalForm = ({ operation, open, setOpen, simplepost, setOperation, setSimplePost }: IModalForm) => {

    const [createSimplePost, { loading: loadingCreate }] = useMutation(SIMPLEPOST_REGISTEr_MUTATION);
    const [updateSimplePost, { loading: loadingUpdate }] = useMutation(UPDATE_SIMPLEPOST_MUTATION);

    const { setValue, register, handleSubmit, formState: { errors } } = useForm<ISimplePost>({
        resolver: yupResolver(createSimplePostFormSchema),
    });

    if (operation === 1) {
        setValue("text", `${simplepost?.text}`);
        setValue("date", `${moment(simplepost?.date).format("YYYY-MM-DD")}`);
    }

    const handleOperationSimplePost: SubmitHandler<ISimplePost> = async (values) => {
        if (operation === 0) {
            createSimplePost({ variables: { text: values.text, date: values.date } })
                .then(() => {
                    setOperation(0);
                    setOpen(false);
                    setSimplePost({ id: 0, text: '', date: '' });
                })
                .catch(() => {
                    setOperation(0);
                    setSimplePost({ id: 0, text: '', date: '' });
                    setOpen(false);
                });
        } else {
            updateSimplePost({ variables: { id: Number(simplepost?.id), text: values.text, date: values.date } })
                .then(() => {
                    setOperation(0);
                    setOpen(false);
                    setSimplePost({ id: 0, text: '', date: '' });
                })
                .catch(() => {
                    setOperation(0);
                    setSimplePost({ id: 0, text: '', date: '' });
                    setOpen(false);
                });
        }
    }

    return (
        <Modal isOpen={open} onClose={() => {
            setOperation(0);
            setSimplePost({ id: 0, text: '', date: '' });
            setOpen(false);
        }}>
            <ModalOverlay />
            <ModalContent w={500} height={400} bg="gray.800" border="1px solid #c2c2c2">
                <ModalHeader color="gray.200">{operation === 0 ? 'Incluir novo registro' : `Atualizar registro (${simplepost?.id})`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%"
                            as="form"
                            onSubmit={handleSubmit(handleOperationSimplePost)}
                        >
                            <Input
                                type="text"
                                label="Texto"
                                {...register(('text'))}
                                error={errors.text}
                            />

                            <Input
                                type="date"
                                label="Data"
                                {...register(('date'))}
                                error={errors.date}
                            />
                            <Button
                                type="submit"
                                colorScheme="green"
                                isLoading={operation === 0 ? loadingCreate : loadingUpdate}
                                rightIcon={<Icon as={FaRegSave} fontSize="20" />}
                            >
                                {operation === 0 ? 'Salvar' : 'Atualizar'}
                            </Button>
                        </SimpleGrid>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalForm;
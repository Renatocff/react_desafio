import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { ProfileProps } from "interfaces/Profile";

export function Profile({ showProfileData = true }: ProfileProps) {

    const usuarioName = localStorage.getItem("usuario");

    return (
        <Flex align="center">
            {
                showProfileData && (
                    <Box mr="4" textAlign="right">
                        <Text>{usuarioName}</Text>
                    </Box>
                )
            }

            <Avatar size="md" name={`${usuarioName}`} src="" />
        </Flex>
    );
}
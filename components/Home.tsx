import { Center ,NativeBaseProvider, Box, HStack, VStack, Text, extendTheme, Avatar, Badge, Fab, Icon } from 'native-base';
import React from 'react'
import { Link } from 'expo-router'
import { AntDesign } from "@expo/vector-icons";

export default function Home() {
  return (
    <NativeBaseProvider theme={theme}>
        <Box bg="primary.50" size="full" h="150">
            <HStack space={2}>
                <Avatar bg="green.500" source={{
                    uri: "https://res.cloudinary.com/df9vsxetm/image/upload/v1663678140/meteu%20essa/corinthians_xljoea.png"
                }} size="lg" marginTop="70" marginLeft="5">
                </Avatar>
                <VStack space={1} marginTop="70" marginLeft="2">
                    <Text alignSelf="center" color="white">Bem vindo de volta,</Text>
                    <Text bold alignSelf="center" color="white" fontSize="4xl">Usuário</Text>
                </VStack>
            </HStack>
        </Box>
        <HStack space={2} marginLeft="6" marginTop="5">
            <VStack space={3}>
                <Badge colorScheme="danger">Conta a pagar</Badge>
                <Badge colorScheme="danger">Conta a pagar</Badge>
                <Badge colorScheme="success">Conta a receber</Badge>
                <Badge colorScheme="success">Conta a receber</Badge>
            </VStack>
        </HStack>
          <Fab bg="primary.50" renderInPortal={false} shadow={2} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />
    </NativeBaseProvider>
  )
}

const theme = extendTheme({
    colors: {
      primary: {
        50: '#150068ff'
      }
    }
  })
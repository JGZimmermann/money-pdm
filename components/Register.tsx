import { NativeBaseProvider, Box, HStack, VStack, Text, Pressable, Image, Center, extendTheme, Input, Stack, Button } from 'native-base';
import React from 'react'
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from 'react-native';
import 'react-native-url-polyfill/auto'
import supabaseConfig from '../config/supabaseConfig';

const supabase = supabaseConfig;

export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if(password == confirmPassword){
      try {
        await supabase.auth.signUp({
          email: email,
          password: password
        })
        router.push("after-login");
      } catch (error: any) {
        Alert.alert("Erro", error.toString())
      }
    } else{
      Alert.alert("Senhas não são iguais")
    }
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Box alignItems="center" bg="primary.50" size="full">
        <Text fontSize="5xl" marginTop="100" color="white">Mon€y</Text>
        <Stack space={4} w="75%" maxW="300px" mx="auto" marginTop="50">
          <Input size="lg" placeholder="E-mail" value={email} color="white" onChangeText={setEmail}/>
          <Input size="lg" placeholder="Senha" value={password} color="white" onChangeText={setPassword}/>
          <Input size="lg" placeholder="Confirme sua senha" value={confirmPassword} color="white" onChangeText={setConfirmPassword}/>
          <VStack space={4} alignItems="center" marginTop="60">
            <Button bg="primary.50" variant="outline" onPress={handleRegister}>
                <Text color="white">Registre-se</Text>
            </Button>
          </VStack>
        </Stack>
      </Box>
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
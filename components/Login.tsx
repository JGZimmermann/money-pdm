import { NativeBaseProvider, Box, HStack, VStack, Text, Pressable, Image, Center, extendTheme, Input, Stack, Button, Collapse, CloseIcon, IconButton, Toast} from 'native-base';
import React, { useState } from 'react'
import { useRouter, Link } from "expo-router";
import { Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js'

export default function Login() {
  const supabaseUrl = 'URL do supabase'
  const supabaseKey = "Key do supabase"
  const supabase = createClient(supabaseUrl, supabaseKey)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      router.push("after-login")
    } catch (error: any) {
      Alert.alert("Erro", error.toString())
      console.log("Login error", error.toString())
    }
  };

  return (
    <NativeBaseProvider theme={theme}>
      <Box alignItems="center" bg="primary.50" size="full">
        <Text fontSize="5xl" marginTop="100" color="white">Mon€y</Text>
        <Stack space={4} w="75%" maxW="300px" mx="auto" marginTop="50">
          <Input size="lg" placeholder="Nome" color="white" value={email} onChangeText={setEmail}/>
          <Input size="lg" placeholder="Senha" color="white" value={password} onChangeText={setPassword}/>
          <VStack space={4} alignItems="center" marginTop="60">
            <Button bg="primary.50" variant="outline" onPress={handleLogin}>
              <Text color="white">Login</Text>
            </Button>
            <Link href="/register"><Text color="white">Registre-se</Text></Link>
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

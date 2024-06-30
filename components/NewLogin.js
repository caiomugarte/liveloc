import React from "react";
import { NativeBaseProvider, Box, VStack, HStack, Text, Button, Image, Input, Checkbox, Divider } from "native-base";
import { LinearGradient } from 'expo-linear-gradient';
import logo from "../assets/LogoLivelocBranca.jpeg";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NewLogin() {
  const handleLogin = () => {
    axios.post("http://localhost:8082/api/login", {
      username: usuario,
      senha: senha
    })
    .then(response => {
      if(response.status == 200){
        console.log('Logado com sucesso');
        const token = response.data.token;
        AsyncStorage.setItem('token', token)
        const userType = response.data.user.tipo;
        AsyncStorage.setItem('papelUsuario', userType);

        if(userType === 0) {
          navigation.navigate('HomeUsuario');
        }else {
          navigation.navigate('HomeFuncionario');
        }
      }else{
        console.log("Não foi possível logar seu usuário");
      }
    })
    console.log(usuario, senha);  
  }

  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('');

  return (
    <NativeBaseProvider>
      <Box flex={1}>
        <HStack space={0} flex={1}>
          <Box w={{ base: "100%", md: "63%" }} flex={1}>
            <LinearGradient
              colors={['#FF0000', '#8A0000', '#790000']}
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 4 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0, 0.85, 1]}
            >
              <Text fontSize="6xl" fontWeight="bold" color="white">Liveloc</Text>
              <Text fontSize="2xl" fontWeight="medium" color="white" textAlign="center">
                O App que te ajuda a localizar tudo que você precisa
              </Text>
            </LinearGradient>
          </Box>

          <VStack space={1} w={{ base: "100%", md: "37%" }} p={4} bg="white">
            <Image
              source={logo}
              alt="Illustration"
              style={{ scale: 5 }}
              w="200px"
              h="60px"
              alignSelf="center"
            />
            <Text fontSize="xl" fontWeight="bold" textAlign="center" mt={4}>
              Que bom ver você de novo
            </Text>
            <Text fontSize="md" fontWeight="bold" textAlign="center" mt={2}>
              Login
            </Text>
            <VStack space={4} mt={2}>
              <Input value={usuario} onChangeText={setUsuario} placeholder="Usuário" />
              <Input type="password" value={senha} onChangeText={setSenha} placeholder="Senha" />
              <HStack justifyContent="space-between" alignItems="center">
                <Checkbox value="rememberMe">Remember me</Checkbox>
                <Text color="blue.500">Forgot password?</Text>
              </HStack>
              <Button mt={4} colorScheme="red" onPress={handleLogin}>Sign in</Button>
              <Divider my={4} />
              <HStack justifyContent="center">
                <Text>Não possui uma conta? Crie uma agora</Text>
                <Text color="blue.500" ml={2}>Cadastrar</Text>
              </HStack>
            </VStack>
          </VStack>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}

import * as React from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  extendTheme,
} from "native-base";
import axios from "axios";

export default function Login({navigation}) {
  const handleLogin = () => {
    axios.post("http://localhost:8082/api/login", {
      name: usuario,
      password: senha
    })
    .then(response => {
      if(response.status == 200){
        console.log('Logado com sucesso');
        navigation.navigate('Home');
      }else{
        console.log("Não foi possível logar seu usuário");
      }
    })
    console.log(usuario, senha);  
  }

  const [usuario, setUsuario] = React.useState('');
  const [senha, setSenha] = React.useState('');

  return (
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Bem-Vindo
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Faça login para continuar
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Usuário</FormControl.Label>
              <Input value={usuario} onChangeText={setUsuario}/>
            </FormControl>
            <FormControl>
              <FormControl.Label>Senha</FormControl.Label>
              <Input type="password" value={senha} onChangeText={setSenha} />
            </FormControl>
            <Button mt="2" colorScheme='primary' onPress={handleLogin}>
              Sign in
            </Button>
          </VStack>
        </Box>
        <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
      </Center>
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  VStack,
} from "native-base";
import * as React from "react";

export default function Login({ navigation }) {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8082/api/login", {
        username: usuario,
        senha: senha,
      });

      if (response.status === 200) {
        console.log("Logado com sucesso");
        const token = response.data.token;
        const userType = response.data.user.userType; // Adjust this if the field is different
        const deviceId = response.data.user.deviceId;

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("papelUsuario", userType.toString());
        await AsyncStorage.setItem("deviceId", deviceId);

        console.log("Token, userType and deviceId stored in AsyncStorage");

        if (userType === 0) {
          navigation.navigate("HomeUsuario");
        } else {
          navigation.navigate("HomeFuncionario");
        }
      } else {
        console.log("Não foi possível logar seu usuário");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleSimulacao = () => {
    navigation.navigate("Home");
  };

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
            <Input value={usuario} onChangeText={setUsuario} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Senha</FormControl.Label>
            <Input type="password" value={senha} onChangeText={setSenha} />
          </FormControl>
          <Button mt="2" colorScheme="primary" onPress={handleLogin}>
            Sign in
          </Button>
          <Button mt="2" colorScheme="primary" onPress={handleSimulacao}>
            Simulação
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

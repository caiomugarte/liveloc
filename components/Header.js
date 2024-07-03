import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Button, HStack, Icon, Image, Pressable, Text } from "native-base";
import React, { useEffect, useState } from "react";
import logo from "../assets/LogoLivelocBranca.jpeg";

export default function Header({ navigation }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      const userType = await AsyncStorage.getItem("papelUsuario");
      if (token) {
        setIsLoggedIn(true);
        setUserType(userType);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    navigation.navigate("newLogin");
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("papelUsuario");
    setIsLoggedIn(false);
    setUserType(null);
    navigation.navigate("Home");
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const handleSimulacao = () => {
    navigation.navigate("Simulacao");
  };

  const handleLotes = () => {
    navigation.navigate("HomeFuncionario");
  };

  const handleProdutos = () => {
    navigation.navigate("produtos");
  };

  const handleViagem = () => {
    navigation.navigate("viagem");
  };

  const handleTeste = () => {
    navigation.navigate("teste");
  };

  return (
    <HStack
      justifyContent="space-between"
      alignItems="center"
      px={4}
      py={4}
      bg="white"
      w="100%"
    >
      <Box
        w="150px"
        h="40px"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          source={logo}
          alt="Logo"
          resizeMode="contain"
          style={{ transform: [{ scale: 5 }] }}
          w="100%"
          h="100%"
        />
      </Box>
      <HStack space={4} fontFamily="Lexend, sans-serif">
        <Pressable onPress={handleHome}>
          <Text fontWeight="bold" textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
            Home
          </Text>
        </Pressable>
        <Pressable onPress={handleSimulacao}>
          <Text fontWeight="bold" textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
            Simulação
          </Text>
        </Pressable>
        <Pressable onPress={handleTeste}>
          <Text fontWeight="bold" textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)">
            Teste
          </Text>
        </Pressable>
        {isLoggedIn && userType === "1" && (
          <>
            <Pressable onPress={handleLotes}>
              <Text
                fontWeight="bold"
                textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              >
                Lotes
              </Text>
            </Pressable>
            <Pressable onPress={handleProdutos}>
              <Text
                fontWeight="bold"
                textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              >
                Produtos
              </Text>
            </Pressable>
            <Pressable onPress={handleViagem}>
              <Text
                fontWeight="bold"
                textShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              >
                Viagem
              </Text>
            </Pressable>
          </>
        )}
      </HStack>
      <HStack space={2}>
        {!isLoggedIn ? (
          <Button
            onPress={handleLogin}
            colorScheme="red"
            size="sm"
            flexDirection="row"
            alignItems="center"
            p={2}
          >
            <HStack alignItems="center">
              <Icon as={MaterialIcons} name="login" size="sm" color="white" />
              <Text fontFamily="Lexend, sans-serif" ml={1} color="white">
                Login
              </Text>
            </HStack>
          </Button>
        ) : (
          <Button
            onPress={handleLogout}
            colorScheme="red"
            size="sm"
            flexDirection="row"
            alignItems="center"
            p={2}
          >
            <HStack alignItems="center">
              <Icon as={MaterialIcons} name="logout" size="sm" color="white" />
              <Text fontFamily="Lexend, sans-serif" ml={1} color="white">
                Logout
              </Text>
            </HStack>
          </Button>
        )}
      </HStack>
    </HStack>
  );
}

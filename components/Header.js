import { MaterialIcons } from "@expo/vector-icons";
import { Box, Button, HStack, Icon, Image, Pressable, Text } from "native-base";
import React from "react";
import logo from "../assets/LogoLivelocBranca.jpeg";

export default function Header({ navigation }) {
  const handleLogin = () => {
    navigation.navigate("newLogin");
  };

  const handleHome = () => {
    navigation.navigate("Home");
  };

  const handleSimulacao = () => {
    navigation.navigate("Simulacao");
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
      </HStack>
      <HStack space={2}>
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
      </HStack>
    </HStack>
  );
}

import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Input,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import banner from "../assets/BannerHomeLiveloc.jpg";
import Header from "./Header";
export default function NewHome({ navigation, route }) {
  const handleChange = (text) => setCodigoRastreio(text);
  const [codigoRastreio, setCodigoRastreio] = useState("");

  const handleRedirect = async () => {
    console.log(`PESQUISEI O CODIGO DE RASTREIO ${codigoRastreio}`);
    navigation.navigate("search", { codigoRastreio });
  };

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="white">
        <Header navigation={navigation} />
        <VStack
          alignItems="center"
          position="relative"
          minH="873px"
          w="100%"
          py={3}
          px={4}
        >
          <Image
            source={banner}
            alt="Banner"
            position="absolute"
            inset="0"
            h="100%"
            w="100%"
            resizeMode="cover"
            style={{ filter: "brightness(50%)" }}
          />
          <VStack alignItems="center" mt={100}>
            <Text
              fontSize="48px"
              fontWeight="bold"
              color="red.500"
              mt={10}
              textAlign="center"
            >
              <Text color="gray.300">Monitore a Entrega dos</Text>{" "}
              <Text color="red.500">Seus Produtos</Text>
            </Text>
            <Text fontSize="24px" color="gray.300" mt={8} textAlign="center">
              Rastreie Seus Produtos Facilmente a Qualquer Hora, em Qualquer
              Lugar
            </Text>
          </VStack>
          <HStack
            w="794px"
            maxW="100%"
            space={4}
            my={12}
            py={6}
            px={8}
            fontSize="md"
            color="gray.400"
            justifyContent="center"
          >
            <HStack
              alignItems="center"
              borderRadius={50}
              bg="white"
              p={5}
              w="100%"
            >
              <Icon
                as={MaterialIcons}
                name="search"
                size="sm"
                color="gray.500"
              />
              <Input
                placeholder="Procure pelo código de rastreio"
                variant="unstyled"
                size="lg"
                flex={1}
                height="12"
                ml={2}
                onChangeText={handleChange}
                onSubmitEditing={handleRedirect}
              />
              <Button
                onPress={handleRedirect}
                variant="ghost"
                size="sm"
                bg="red.500"
                borderRadius="full"
                p={2}
              >
                <Icon
                  as={MaterialIcons}
                  name="arrow-forward"
                  size="md"
                  color="white"
                />
              </Button>
            </HStack>
          </HStack>
        </VStack>
        <Box
          bg="white"
          color="gray.500"
          textAlign="center"
          py={4}
          fontSize="sm"
        >
          © Copyright 2024. Designed and Developed by Kavinda
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

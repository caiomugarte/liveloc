import axios from "axios";
import {
  Box,
  Center,
  HStack,
  Image,
  NativeBaseProvider,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Mapa from "./Mapa";

const navigationItems = [
  { label: "Home", isCurrent: true },
  { label: "Rentals", isCurrent: false },
  { label: "Categories", isCurrent: false },
  { label: "About Us", isCurrent: false },
  { label: "Contact", isCurrent: false },
  { label: "Blog", isCurrent: false },
];

const MainContent = ({ latitude, longitude }) => (
  <Box flex={1} bg="#ECECEC" py={4} px={4}>
    <VStack space={4} alignItems="center" flex={1}>
      <Box w="100%" maxW="1675px" flex={1}>
        <HStack space={4} alignItems="flex-start" flex={1}>
          {latitude != null && longitude != null && (
            <Box flex={3} height="100%">
              <Text fontSize="35px" fontWeight="bold">
                Pedido N° 123123213
              </Text>
              <Text fontSize="35px">Localização Atual</Text>
              <Box flex={1}>
                <Mapa latitude={latitude} longitude={longitude} />
              </Box>
            </Box>
          )}
          <VStack flex={2} space={4} mb={4}>
            <Box
              bg="#f6f6f6"
              borderRadius="27px"
              shadow={2}
              p={6}
              alignItems="center"
            >
              <Text
                fontSize="4xl"
                fontFamily="Plus Jakarta Sans"
                fontWeight="400"
                textAlign="center"
              >
                Tênis Air Jordan 1 Low:
              </Text>
              <Image
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/7130afe39d51db26199ef55bd9767f491cfc4f715208e4f771e152ab8ef66ee7?apiKey=7cc04bfcf1d94873aadf15ed8bb2db87&",
                }}
                alt="Information graphic"
                style={{ width: "100%", height: 300 }} // Ajuste o valor da altura conforme necessário
                resizeMode="contain"
              />
            </Box>
            <Box
              bg="#f6f6f6"
              borderRadius="27px"
              shadow={2}
              p={6}
              alignItems="center"
            >
              <Text
                fontSize="4xl"
                fontFamily="Plus Jakarta Sans"
                fontWeight="400"
                textAlign="center"
              >
                Endereço de Entrega:
              </Text>
              <HStack space={2} alignItems="center">
                <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3d3cb0b07297a456c7c2eee237eb60a83bd7f1643675e58c6a20124f6b115b85?apiKey=7cc04bfcf1d94873aadf15ed8bb2db87&",
                  }}
                  alt=""
                  size="md"
                  mt={2}
                />
                <Text
                  fontSize="3xl"
                  fontFamily="Plus Jakarta Sans"
                  fontWeight="400"
                >
                  Brasília, DF
                </Text>
              </HStack>
            </Box>
            <Box
              bg="#f6f6f6"
              borderRadius="27px"
              shadow={2}
              p={6}
              alignItems="center"
            >
              <Text
                fontSize="4xl"
                fontFamily="Plus Jakarta Sans"
                fontWeight="400"
                textAlign="center"
              >
                Última cidade em que passou:
              </Text>
              <HStack space={2} alignItems="center">
                <Image
                  source={{
                    uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/9370af00c739fc5e5ba6235baa520fa160c5268983d57cd4d5e5f4868475ed57?apiKey=7cc04bfcf1d94873aadf15ed8bb2db87&",
                  }}
                  alt=""
                  size="md"
                />
                <Text
                  fontSize="3xl"
                  fontFamily="Plus Jakarta Sans"
                  fontWeight="400"
                >
                  Brasília, DF
                </Text>
              </HStack>
            </Box>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  </Box>
);

const Footer = () => (
  <Center py={4}>
    <Text
      color="#696888"
      fontSize="xs"
      fontFamily="Plus Jakarta Sans"
      textAlign="center"
    >
      © Copyright 2024. Designed and Developed by Kavinda
    </Text>
  </Center>
);

export default function SearchPage({ navigation, route }) {
  const { codigoRastreio } = route.params;
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8082/api/posicaoOfProduto",
          {
            params: {
              codigoRastreio: codigoRastreio,
            },
          }
        );
        setLatitude(response.data.localizacao.latitude);
        setLongitude(response.data.localizacao.longitude);
        console.log(
          `SetLatitude: ${response.data.localizacao.latitude} and SetLongitude: ${response.data.localizacao.longitude}`
        );
        console.log(response.data);
      } catch (error) {
        console.log("Erro ao pesquisar código de rastreio", error);
      }
    };

    fetchData();
  }, [codigoRastreio]);

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="white">
        <Header navigation={navigation} />
        <Box flex={1} bg="#ECECEC">
          <MainContent latitude={latitude} longitude={longitude} />
        </Box>
        <Footer />
      </Box>
    </NativeBaseProvider>
  );
}

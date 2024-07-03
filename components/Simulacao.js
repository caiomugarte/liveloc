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

const coordinates = [
  { latitude: -25.430742, longitude: -49.270484 }, // Curitiba, PR
  { latitude: -25.539441, longitude: -49.190727 }, // São José dos Pinhais, PR
  { latitude: -25.861174, longitude: -48.93375 }, // Mandirituba, PR
  { latitude: -26.204214, longitude: -48.910389 }, // Tijucas do Sul, PR
  { latitude: -26.42456, longitude: -48.815569 }, // Garuva, SC
  { latitude: -26.633438, longitude: -48.700042 }, // Joinville, SC
  { latitude: -26.829681, longitude: -48.695919 }, // Araquari, SC
  { latitude: -26.903185, longitude: -48.929122 }, // Araquari, SC
  { latitude: -26.886038, longitude: -49.061046 }, // Araquari, SC
];

const getEndereco = async ({ latitude, longitude }) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};

const MainContent = ({
  latitude,
  longitude,
  enderecoEntrega,
  lastCity,
  latitudeEntrega,
  longitudeEntrega,
}) => (
  <>
    {latitude != null &&
      longitude != null &&
      enderecoEntrega != null &&
      lastCity != null && (
        <Box flex={1} bg="#ECECEC" py={4} px={4}>
          <VStack space={4} alignItems="center" flex={1}>
            <Box w="100%" maxW="1675px" flex={1}>
              <HStack space={4} alignItems="flex-start" flex={1}>
                <Box flex={3} height="100%">
                  <Text fontSize="35px" fontWeight="bold">
                    Pedido N° 123123213
                  </Text>
                  <Text fontSize="35px">Localização Atual</Text>
                  <Box flex={1}>
                    <Mapa
                      latitude={latitude}
                      longitude={longitude}
                      produtoLatitude={latitudeEntrega}
                      produtoLongitude={longitudeEntrega}
                    />
                  </Box>
                </Box>
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
                        {enderecoEntrega}
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
                        {lastCity}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </Box>
      )}
  </>
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

export default function Simulacao({ navigation, route }) {
  const [latitude, setLatitude] = useState(coordinates[0].latitude);
  const [longitude, setLongitude] = useState(coordinates[0].longitude);
  const [enderecoEntrega, setEnderecoEntrega] = useState(null);
  const [lastCity, setLastCity] = useState(null);
  const [latitudeEntrega, setLatitudeEntrega] = useState(null);
  const [longitudeEntrega, setLongitudeEntrega] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enderecoEntregaData = await getEndereco({
          latitude: -26.910663,
          longitude: -49.090062,
        });

        setLatitudeEntrega(-26.910663);
        setLongitudeEntrega(-49.090062);
        setEnderecoEntrega(
          `${enderecoEntregaData.address.road}, ${enderecoEntregaData.address.city}`
        );
        setLastCity(
          `${enderecoEntregaData.address.city}, ${
            enderecoEntregaData.address["ISO3166-2-lvl4"].split("-")[1]
          }`
        );
      } catch (error) {
        console.log("Erro ao pesquisar código de rastreio", error);
      }
    };

    fetchData();

    const interval = setInterval(async () => {
      setIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (nextIndex < coordinates.length) {
          setLatitude(coordinates[nextIndex].latitude);
          setLongitude(coordinates[nextIndex].longitude);

          getEndereco({
            latitude: coordinates[nextIndex].latitude,
            longitude: coordinates[nextIndex].longitude,
          }).then((enderecoData) => {
            setLastCity(
              `${enderecoData.address.city}, ${
                enderecoData.address["ISO3166-2-lvl4"].split("-")[1]
              }`
            );
          });

          return nextIndex;
        } else {
          clearInterval(interval);
          return prevIndex;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NativeBaseProvider>
      <Box flex={1} bg="white">
        <Header navigation={navigation} />
        <Box flex={1} bg="#ECECEC">
          <MainContent
            latitude={latitude}
            longitude={longitude}
            enderecoEntrega={enderecoEntrega}
            lastCity={lastCity}
            latitudeEntrega={latitudeEntrega}
            longitudeEntrega={longitudeEntrega}
          />
        </Box>
        <Footer />
      </Box>
    </NativeBaseProvider>
  );
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Button, Center, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Ajuste o caminho se necessário

export default function ComecarViagem({ navigation }) {
  const [watchId, setWatchId] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    const getDeviceId = async () => {
      const deviceId = await AsyncStorage.getItem("deviceId");
      setDeviceId(deviceId);
    };
    getDeviceId();
  }, []);

  const handleStartClick = () => {
    getLocation();
  };

  const handleStopClick = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const getLocation = () => {
    const id = navigator.geolocation.watchPosition(success, error);
    setWatchId(id);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    axios
      .post("http://localhost:8082/api/posicao", {
        latitude,
        longitude,
        deviceId,
      })
      .then((response) => {
        console.log("Posição salva com sucesso: ", response.data);
      })
      .catch((err) => {
        console.log("Ocorreu um erro: ", err);
      });
  };

  const error = (erro) => {
    console.log("ocorreu um erro");
    console.log(erro);
  };

  return (
    <>
      <Header navigation={navigation} />
      <Center flex={1} px={3}>
        <VStack space={4} alignItems="center">
          <Button onPress={handleStartClick} w="200px" mb={4}>
            Começar Viagem
          </Button>
          <Button onPress={handleStopClick} w="200px">
            Parar
          </Button>
        </VStack>
      </Center>
    </>
  );
}

import axios from "axios";
import {
  Box,
  Button,
  CheckIcon,
  HStack,
  Image,
  Select,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import Header from "./Header";

// Utility function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export default function MyComponent({ navigation }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [funcionarioDetails, setFuncionarioDetails] = useState(null);
  const [lotesAssociados, setLotesAssociados] = useState([]);
  const [lotesAssociar, setLotesAssociar] = useState([]);
  const [loadingLotes, setLoadingLotes] = useState({});

  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/usuarios");
        const usuarios = response.data.usuarios;
        const filteredUsuarios = usuarios.filter(
          (usuario) => usuario.tipo === 1
        );
        setFuncionarios(filteredUsuarios);
      } catch (error) {
        console.error("Error fetching funcionarios:", error);
      }
    };

    fetchFuncionario();
  }, []);

  useEffect(() => {
    if (selectedFuncionario) {
      setFuncionarioDetails(selectedFuncionario);
      fetchLotes(selectedFuncionario.deviceId);
    } else {
      setFuncionarioDetails(null);
      setLotesAssociados([]);
      setLotesAssociar([]);
    }
  }, [selectedFuncionario]);

  useEffect(() => {
    if (selectedFuncionario) {
      fetchLotes(selectedFuncionario.deviceId);
    }
  }, [selectedFuncionario]);

  const fetchLotes = async (deviceId) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/lotes`);
      const lotes = response.data.lotes || [];

      const lotesAssociados = lotes.filter(
        (lote) => lote.deviceId === deviceId
      );
      const lotesAAssociar = lotes.filter(
        (lote) => !lote.deviceId || lote.deviceId === ""
      );

      setLotesAssociados(lotesAssociados);
      setLotesAssociar(lotesAAssociar);
    } catch (error) {
      console.error("Error fetching lots:", error);
      setLotesAssociados([]);
      setLotesAssociar([]);
    }
  };

  const handleLoading = (loteId, isLoading) => {
    setLoadingLotes((prevLoading) => ({
      ...prevLoading,
      [loteId]: isLoading,
    }));
  };

  const vincularLote = async (loteId) => {
    handleLoading(loteId, true);
    try {
      await axios.post(`http://localhost:8082/api/lote/vincular`, {
        loteId,
        deviceId: selectedFuncionario.deviceId,
      });
      await fetchLotes(selectedFuncionario.deviceId); // Refresh the lots after linking
    } catch (error) {
      console.error("Error linking lot:", error);
    }
    handleLoading(loteId, false);
  };

  const desvincularLote = async (loteId) => {
    handleLoading(loteId, true);
    try {
      await axios.post(`http://localhost:8082/api/lote/desvincular`, {
        loteId,
      });
      await fetchLotes(selectedFuncionario.deviceId); // Refresh the lots after unlinking
    } catch (error) {
      console.error("Error unlinking lot:", error);
    }
    handleLoading(loteId, false);
  };

  return (
    <Box bg="white" pt="19px">
      <Box bg="#ececec" w="100%">
        <Header navigation={navigation} />
        <Box alignItems="center" px="20px">
          <Text
            fontSize="48px"
            fontFamily="Plus Jakarta Sans"
            mt="50px"
            mb="96px"
          >
            Gerenciamento de Lotes
          </Text>
          <HStack w="100%" maxW="1796px" space={5}>
            <Box w="18%" bg="#f6f6f6" borderRadius="27px" shadow={4} p={6}>
              <VStack space={4}>
                <Text
                  fontSize="24px"
                  fontFamily="Plus Jakarta Sans"
                  textAlign="center"
                >
                  Funcionário
                </Text>
                <Select
                  selectedValue={
                    selectedFuncionario ? selectedFuncionario._id : ""
                  }
                  minWidth="200"
                  accessibilityLabel="Choose Employee"
                  placeholder="Choose Employee"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: <CheckIcon size="5" />,
                  }}
                  mt={1}
                  onValueChange={(itemValue) =>
                    setSelectedFuncionario(
                      funcionarios.find((f) => f._id === itemValue)
                    )
                  }
                >
                  {funcionarios.map((funcionario) => (
                    <Select.Item
                      key={funcionario._id}
                      label={funcionario.nome}
                      value={funcionario._id}
                    />
                  ))}
                </Select>
                {funcionarioDetails && (
                  <>
                    <Image
                      source={{
                        uri: funcionarioDetails.imagemUrl,
                      }}
                      alt="Employee"
                      w="211px"
                      h="248px"
                      alignSelf="center"
                    />
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        bg="#f6f6f6"
                        p={2}
                        borderRadius="27px"
                        shadow={2}
                        flex={1}
                      >
                        Data de Nascimento
                      </Text>
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        flex={1}
                        textAlign="right"
                      >
                        {formatDate(funcionarioDetails.dataNascimento)}
                      </Text>
                    </HStack>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        bg="#f6f6f6"
                        p={2}
                        borderRadius="27px"
                        shadow={2}
                        flex={1}
                      >
                        Nota
                      </Text>
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        flex={1}
                        textAlign="right"
                      >
                        {funcionarioDetails.nota}
                      </Text>
                    </HStack>
                    <HStack justifyContent="space-between" alignItems="center">
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        bg="#f6f6f6"
                        p={2}
                        borderRadius="27px"
                        shadow={2}
                        flex={1}
                      >
                        N° de Viagens
                      </Text>
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        flex={1}
                        textAlign="right"
                      >
                        {funcionarioDetails.numeroViagens}
                      </Text>
                    </HStack>
                  </>
                )}
              </VStack>
            </Box>
            <Box w="41%" bg="#f6f6f6" borderRadius="27px" shadow={4} p={6}>
              <VStack space={4}>
                <Text
                  fontSize="24px"
                  fontFamily="Plus Jakarta Sans"
                  textAlign="center"
                >
                  Lotes Associados
                </Text>
                {lotesAssociados.length > 0 ? (
                  lotesAssociados.map((lote) => (
                    <HStack
                      key={lote._id}
                      bg="#f6f6f6"
                      borderRadius="27px"
                      shadow={2}
                      p={4}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        fontSize="18px"
                        fontWeight="bold"
                        color="black"
                        textAlign="left"
                        flex={1}
                      >
                        {lote.numeroLote}
                      </Text>
                      {loadingLotes[lote._id] ? (
                        <Spinner color="black" />
                      ) : (
                        <Button
                          bg="black"
                          _text={{ color: "white" }}
                          onPress={() => desvincularLote(lote._id)}
                        >
                          Desvincular
                        </Button>
                      )}
                    </HStack>
                  ))
                ) : (
                  <Text>Nenhum lote associado.</Text>
                )}
              </VStack>
            </Box>
            <Box w="41%" bg="#f6f6f6" borderRadius="27px" shadow={4} p={6}>
              <VStack space={4}>
                <Text
                  fontSize="24px"
                  fontFamily="Plus Jakarta Sans"
                  textAlign="center"
                >
                  Lotes a Associar
                </Text>
                {lotesAssociar.length > 0 ? (
                  lotesAssociar.map((lote) => (
                    <HStack
                      key={lote._id}
                      bg="#f6f6f6"
                      borderRadius="27px"
                      shadow={2}
                      p={4}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        fontFamily="Plus Jakarta Sans"
                        fontSize="18px"
                        fontWeight="bold"
                        color="black"
                        textAlign="left"
                        flex={1}
                      >
                        {lote.numeroLote}
                      </Text>
                      {loadingLotes[lote._id] ? (
                        <Spinner color="red.500" />
                      ) : (
                        <Button
                          bg="red.500"
                          _text={{ color: "white" }}
                          onPress={() => vincularLote(lote._id)}
                        >
                          Vincular
                        </Button>
                      )}
                    </HStack>
                  ))
                ) : (
                  <Text>Nenhum lote para associar.</Text>
                )}
              </VStack>
            </Box>
          </HStack>
          <Text
            fontFamily="Plus Jakarta Sans"
            fontSize="12px"
            color="#696888"
            mt="25px"
            mb="27px"
          >
            © Copyright 2024. Designed and Developed by Kavinda
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

import {
  Center,
  Box,
  View,
  Button,
  Text,
  Select,
  CheckIcon,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native-web";
import QRCode from "react-native-qrcode-svg";

export default function ListaLotes() {
  const [lotes, setLotes] = useState([]);
  const [showModalArray, setShowModalArray] = useState([]);
  const [selectedFuncionario, setSelectedFuncionario] = useState(null);
  const [funcionarios, setFuncionarios] = useState([]);
  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/lotes");
        const data = await response.json();
        setLotes(data.lotes);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFuncionarios = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/usuarios");
        const data = await response.json();
        let funcionarios = [];
        for (let usuario of data.usuarios){
          if(usuario.tipo === 1){
            funcionarios.push(usuario);
          }
        }
        setFuncionarios(funcionarios);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLotes();
    fetchFuncionarios();
  }, []);

  const handleSelectChange = (itemValue) => {
    console.log("SELECIONEI O USUÁRIO " + funcionarios[itemValue].nome);
    setSelectedFuncionario(parseInt(itemValue));
  }

  return (
    <View style={styles.container}>
      <Box maxW="300">
        <Select
          selectedValue={selectedFuncionario}
          minWidth="200"
          accessibilityLabel="Selecione um Funcionário"
          placeholder="Selecione um Funcionário"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => handleSelectChange(itemValue)}
        >
          {funcionarios.map((funcionario, index) => (
            <Select.Item key={index} label={funcionario.nome} value={index}></Select.Item>
          ))}
        </Select>
      </Box>
      {lotes.map((lote, index) => (
        <View key={lote._id}>
          <Center>
            <Box>
              <Text style={styles.item}>{lote.numeroLote}</Text>
              <Button>Associar Funcionário</Button>
            </Box>
          </Center>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});

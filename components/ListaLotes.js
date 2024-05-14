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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState({});

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
        setFuncionarios(data.usuarios.filter(usuario => usuario.tipo === 1));
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

  const associateFuncionarioWithLote = async (loteId) => {
    setLoading(true);
    try {
      // Make API call to associate the selected funcionario with the lote
      // Replace 'your_backend_endpoint' with the actual endpoint
      const response = await fetch(`http://localhost:8082/api/associarFuncionario`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ funcionarioId: funcionarios[selectedFuncionario]._id , loteId: loteId})
      });
      if (response.ok) {
        setSuccess(prevState => ({ ...prevState, [loteId]: true }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const renderButton = (loteId) => {
    if (success[loteId]) {
      return (
        <Button disabled variant="success">Funcionário vinculado</Button>
      );
    } else if (loading) {
      return (
        <Button isLoading>Loading</Button>
      );
    } else {
      return (
        <Button onPress={() => associateFuncionarioWithLote(loteId)}>Associar Funcionário</Button>
      );
    }
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
            <Box style={styles.loteBox}>
              <Text style={styles.item}>{lote.numeroLote}</Text>
              {renderButton(lote._id)}
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
  loteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

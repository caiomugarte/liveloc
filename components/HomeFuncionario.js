import React from 'react';
import { Heading, Box, NativeBaseProvider, Button, Icon, Center } from 'native-base';
import '../App.css'; // Import your CSS file for styling
import FooterFuncionario from './FooterFuncionario';
import ListaLotes from './ListaLotes'
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeFuncionario({navigation}) {

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  }

  return (
    <Center>
      <Button onPress={handleLogout} >Logout</Button>
      <ListaLotes></ListaLotes>
    </Center>
  );
}

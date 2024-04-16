import React from 'react';
import { Heading, Box, NativeBaseProvider, Button, Icon, Center } from 'native-base';
import '../App.css'; // Import your CSS file for styling
import FooterFuncionario from './FooterFuncionario';
import ListaLotes from './ListaLotes'
export default function HomeFuncionario({navigation}) {
  return (
    <Center>
      <ListaLotes></ListaLotes>
    </Center>
  );
}

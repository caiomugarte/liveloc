import React, { useState, useEffect } from 'react';
import { Center, Box, Input, Button, IconButton, SearchIcon, Heading, Spinner, Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeUsuario({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [userObject, setUserObject] = useState(null);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  }

  useEffect(() => {
    const { userObject } = route.params;
    if (userObject) {
      setUserObject(userObject);
      setLoading(false);
    }
  }, [route.params]);

  if (loading) {
    // If loading, display a loading indicator
    return (
      <Center>
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }

  if (!userObject) {
    // If userObject is still not available, display an error message
    return (
      <Center>
        <Heading>No user information available.</Heading>
      </Center>
    );
  }

  // If userObject is available, render user information
  return (
    <Center w="100%" height="50%">
      <Box  w='50%' alignItems={'center'}>
        <Heading>Bem-Vindo, {userObject.username}</Heading>
        <Text>Encontre seu produto</Text>
      </Box>
      <Box alignItems="center">
        <Input
          w="100%"
          variant={'rounded'}
          py="0"
          InputRightElement={
            <IconButton variant={'solid'} rounded={"3xl"} icon={<SearchIcon />} />
          }
          placeholder="Código de Rastreio"
        />
      </Box>
      <Button title="Logout" onPress={() => handleLogout(navigation)} >Logout</Button>
    </Center>
  );
}

import React, { useState, useEffect } from 'react';
import { Center, Box, Input, Button, IconButton, SearchIcon, Heading, Spinner, Text, View } from "native-base";
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

export default function HomeUsuario({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [userObject, setUserObject] = useState(null);
  const [codigoRastreio, setCodigoRastreio] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  }

  const handleChange = text => setCodigoRastreio(text);

  const handleSearch = async() => {
    console.log(`PESQUISEI O CODIGO DE RASTREIO ${codigoRastreio}`)
    try {
      const response = await axios.get("http://localhost:8082/api/posicaoOfProduto", {
          params: {
          codigoRastreio: codigoRastreio
        }
      });
      
      console.log(response.data);
      setLatitude(response.data.localizacao.latitude);
      setLongitude(response.data.localizacao.longitude);

      const newMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&layer=mapnik&marker=${latitude}%2C${longitude}`;

    } catch (error) {
      console.log("Erro ao pesquisar codigo de rastreio", error);
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
    <Center>
      <Box  w='100%' alignItems={'center'}>
        <Heading>Bem-Vindo, {userObject.username}</Heading>
        <Text>Encontre seu produto</Text>
      </Box>
      <Box alignItems="center">
        <Input
          w="100%"
          variant={'rounded'}
          py="0"
          InputRightElement={
            <IconButton variant={'solid'} rounded={"3xl"} icon={<SearchIcon />} onPress={handleSearch}/>
          }
          onChangeText={handleChange}
          placeholder="Código de Rastreio"
          onSubmitEditing={handleSearch}
        />
      </Box>
      <Button title="Logout" onPress={() => handleLogout(navigation)} >Logout</Button>
    </Center>
      <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossOrigin=""
/>
      {latitude != null && longitude != null && (
        <MapContainer center={[latitude, longitude]} zoom={12}scrollWheelZoom={false}>
        <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <Circle center={[latitude, longitude]} radius={500} /> #esse radius é em metros.
      </MapContainer>
      )}
    </Center>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: 300, // Set width
    height: 300, // Set height
    borderWidth: 1, // Add borders if needed
    borderColor: 'black', // Border color
  },
});


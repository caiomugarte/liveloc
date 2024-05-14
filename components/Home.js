import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Button, StyleSheet, View } from 'react-native';
import '../App.css';


export default function Home({navigation}) {
  const [mapUrl, setMapUrl] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [intervalId, setIntervalId] = useState(false);

  const handleButonClick = () => {
    getLocation();

    const id = setInterval(() => {
      getLocation();
    }, 5000)
    setIntervalId(id);
  }

  const handleStopClick = () => {
    clearInterval(intervalId);
    setInterval(null);
  }

  const getLocation = () => {
    console.log("cliquei")
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const success = (position) => {
    const latitude = position.coords.latitude + getRandomNumber(-0.005, 0.005);
    const longitude = position.coords.longitude + getRandomNumber(-0.005, 0.005);

    // Dynamically generate the map URL with latitude and longitude as markers
    const newMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude}%2C${latitude}%2C${longitude}%2C${latitude}&layer=mapnik&marker=${latitude}%2C${longitude}`;

    // Set the new map URL
    setMapUrl(newMapUrl);
    setLatitude(latitude);
    setLongitude(longitude);

    axios.post('http://localhost:8082/api/posicao', {
      latitude, 
      longitude
    }).then(response => {
      console.log("Posição salva com sucesso: ", response.data)
    })
    .catch(err => {
      console.log("Ocorreu um erro: ", err);
    })
  };

  const error = (erro) => {
    console.log("ocorreu um erro")
    console.log(erro)
  }
  const position = [51.505, -0.09]


  return (
    <View style={styles.container}>
      <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
      <Button onPress={handleButonClick} title="Get my location" />
      <Button onPress={handleStopClick} title='STOP'></Button>
      {latitude && (
        <h1>Sua latitude é {latitude}</h1>
      )}
      {longitude && (
        <h1>Sua longitude é {longitude}</h1>
      )}
      {latitude != null && longitude != null && (
        <MapContainer center={[latitude, longitude]} zoom={12}scrollWheelZoom={false}>
        <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Circle center={[latitude, longitude]} radius={500} /> #esse radius é em metros.
      </MapContainer>
      )}
      <StatusBar style="auto" />  
      <Button title="Logout" onPress={handleLogout} />
    </View>
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

const getRandomNumber = (min, max) => {
  return Math.random() * (max-min) + min;
}

const handleLogout = async () => {
  try {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  } catch (error) {
    console.log('Erro ao deslogar:', error);
  }
}

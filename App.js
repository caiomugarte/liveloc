import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';

export default function App() {
  const [mapUrl, setMapUrl] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    console.log("cliquei")
    navigator.geolocation.getCurrentPosition(success, error);

  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("deu certo")

    // Dynamically generate the map URL with latitude and longitude as markers
    const newMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.1}%2C${latitude - 0.1}%2C${longitude + 0.1}%2C${latitude + 0.1}&layer=mapnik&marker=${latitude}%2C${longitude}`;

    // Set the new map URL
    setMapUrl(newMapUrl);
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const error = (erro) => {
    console.log("ocorreu um erro")
    console.log(erro)
  }

  return (
    <View style={styles.container}>
      <Button onPress={getLocation} title="Get my location" />
      {mapUrl && (
        <iframe
          src={mapUrl}
          style={styles.map}
        />
      )}
      {latitude && (
        <h1>Sua latitude é {latitude}</h1>
      )}
      {longitude && (
        <h1>Sua longitude é {longitude}</h1>
      )}
      <StatusBar style="auto" />  
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

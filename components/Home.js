import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import "../App.css";

export default function Home({ navigation }) {
  const [mapUrl, setMapUrl] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [watchId, setWatchId] = useState(null);

  const handleButtonClick = () => {
    getLocation();
  };

  const handleStopClick = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  const getLocation = () => {
    console.log("cliquei");
    const id = navigator.geolocation.watchPosition(success, error);
    setWatchId(id);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLatitude(latitude);
    setLongitude(longitude);

    axios
      .post("http://localhost:8082/api/posicao", {
        latitude,
        longitude,
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

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (error) {
      console.log("Erro ao deslogar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""
      />
      <Button onPress={handleButtonClick} title="Get my location" />
      <Button onPress={handleStopClick} title="STOP"></Button>
      {latitude != null && longitude != null && (
        <MapContainer
          center={[latitude, longitude]}
          zoom={12}
          style={styles.map}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <Circle center={[latitude, longitude]} radius={500} />
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

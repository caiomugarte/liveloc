import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { Circle, MapContainer, TileLayer, useMap } from "react-leaflet";
import { StyleSheet, View } from "react-native";

// Configuração do ícone do marker
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({ latitude, longitude }) {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude], 12); // Centraliza e ajusta o zoom do mapa
  }, [latitude, longitude, map]);
  return null;
}

export default function Mapa({ latitude, longitude }) {
  return (
    <View style={styles.container}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossOrigin=""
      />
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
        <Circle center={[latitude, longitude]} radius={5000} />
        <MapUpdater latitude={latitude} longitude={longitude} />
      </MapContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 27,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { StyleSheet, View } from "react-native";

// Configuração dos ícones dos marcadores
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6.0/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({
  latitude,
  longitude,
  produtoLatitude,
  produtoLongitude,
}) {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    console.log("MapUpdater - Latitude:", latitude, "Longitude:", longitude);
    map.setView([latitude, longitude], 12); // Centraliza e ajusta o zoom do mapa

    const distance = calculateDistance(
      latitude,
      longitude,
      produtoLatitude,
      produtoLongitude
    );
    console.log("Distância calculada:", distance, "km");

    if (distance <= 5) {
      console.log("Distância <= 5 km, adicionando rota");
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),
          L.latLng(produtoLatitude, produtoLongitude),
        ],
        createMarker: (i, waypoint, n) => {
          const marker = L.marker(waypoint.latLng, {
            icon: markerIcon,
          }).bindTooltip(i === 0 ? "Entregador" : "Local de Entrega", {
            permanent: true,
            direction: "top",
            offset: [0, -25],
          });
          return marker;
        },
        lineOptions: {
          styles: [{ color: "#d92830", weight: 4 }],
        },
        fitSelectedRoutes: true,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        routeWhileDragging: true,
        showAlternatives: false,
      }).addTo(map);

      // Ajustar o zoom para mostrar toda a rota com menos padding e maxZoom ajustado
      const bounds = L.latLngBounds([
        [latitude, longitude],
        [produtoLatitude, produtoLongitude],
      ]);
      map.fitBounds(bounds, { padding: [20, 20], maxZoom: 14 });

      // Remove o container do controle de roteamento
      const controlContainer = document.querySelector(
        ".leaflet-routing-container"
      );
      if (controlContainer) {
        controlContainer.style.display = "none";
      }

      return () => {
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      };
    } else {
      console.log("Distância > 5 km, adicionando círculo");
      const circle = L.circle([latitude, longitude], { radius: 5000 }).addTo(
        map
      );

      return () => {
        map.removeLayer(circle);
      };
    }
  }, [latitude, longitude, produtoLatitude, produtoLongitude, map]);

  return null;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export default function Mapa({
  latitude,
  longitude,
  produtoLatitude,
  produtoLongitude,
}) {
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
        <MapUpdater
          latitude={latitude}
          longitude={longitude}
          produtoLatitude={produtoLatitude}
          produtoLongitude={produtoLongitude}
        />
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

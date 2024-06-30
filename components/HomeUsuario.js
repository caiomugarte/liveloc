import React, { useState, useEffect } from 'react';
import { Center, Box, Input, Button, IconButton, SearchIcon, Heading, Spinner, Text } from "native-base";
import { StyleSheet } from 'react-native';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-control-geocoder';

const MapComponent = ({ latitude, longitude, localEntrega }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude !== null && longitude !== null && localEntrega !== null) {
      /* const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),
          L.latLng(localEntrega[0], localEntrega[1])
        ],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        createMarker: () => null, // Return null to prevent creating markers
        show: false, // Hide the routing panel
        collapsible: false
        
      }).addTo(map); */

      const bounds = L.latLngBounds([
        [latitude, longitude],
        [localEntrega[0], localEntrega[1]]
      ]);
      map.fitBounds(bounds);

      /* return () => {
        map.removeControl(routingControl);
      }; */
    }
  }, [latitude, longitude, localEntrega, map]);

  return (
    <>
      <Marker position={localEntrega}>
        <Popup>
          Local de entrega.
        </Popup>
      </Marker>
      <Circle center={[latitude, longitude]} radius={50000} /> {/* Esse radius é em metros. */}
    </>
  );
};

export default function HomeUsuario({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [userObject, setUserObject] = useState(null);
  const [codigoRastreio, setCodigoRastreio] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [localEntrega, setLocalEntrega] = useState(null);

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
      setLocalEntrega([response.data.produto.localEntrega.latitude, response.data.produto.localEntrega.longitude]);

    } catch (error) {
      console.log("Erro ao pesquisar codigo de rastreio", error);
    }
  };

  useEffect(() => {
    const { userObject } = route.params;
    if (userObject) {
      setUserObject(userObject);
      setLoading(false);
    }
  }, [route.params]);

  if (loading) {
    return (
      <Center>
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }

  if (!userObject) {
    return (
      <Center>
        <Heading>No user information available.</Heading>
      </Center>
    );
  }

  const inputRastreioComponent = <Center marginBottom={400}>
    <Box w='100%' alignItems={'center'}>
      <Text>Digite o código do seu produto</Text>
    </Box>
    <Box alignItems="center">
      <Input
        w="100%"
        variant={'rounded'}
        py="0"
        InputRightElement={<IconButton variant={'solid'} rounded={"3xl"} icon={<SearchIcon />} onPress={handleSearch} />}
        onChangeText={handleChange}
        placeholder="Código de Rastreio"
        onSubmitEditing={handleSearch} />
    </Box>
  </Center>;


  return (
    <Center>
    {inputRastreioComponent}
      <Center width={"50%"} height={1000}>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
          integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
          crossOrigin=""
          />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet-routing-machine/dist/leaflet-routing-machine.css"
          />
        {latitude != null && longitude != null && localEntrega != null && (
          <MapContainer>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
              <MapComponent latitude={latitude} longitude={longitude} localEntrega={localEntrega} />
          </MapContainer>
        )}
        </Center>
        <Center>
          <Heading>TESTE</Heading>
        </Center>
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
    width: 2000, // Set width
    height: 20, // Set height
    borderWidth: 1, // Add borders if needed
    borderColor: 'black', // Border color
  },
});

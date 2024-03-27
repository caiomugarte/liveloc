import React from 'react';
import './App.css';
import { NativeRouter, Route, Link, Routes } from "react-router-native";
import Home from './components/Home';
import Lote from './components/Lote';
import { View } from 'react-native-web';
import { Text } from 'react-native-web';


export default function App() {

  return (
    <NativeRouter>
    <View>
      <View>
        <Link to="/">
          <Text>Home</Text>
        </Link>
        <Link to="/lote">
          <Text>Lote</Text>
        </Link>
      </View>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/lote" element={<Lote/>} />
        <Route path="/" element={<Lote/>} />
      </Routes>
    </View>
  </NativeRouter>
  );
}
import React, { useEffect } from 'react';
import './App.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Lote from './components/Lote';
import Login from './components/Login';
import { NativeBaseProvider, extendTheme } from 'native-base';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from 'react';
import HomeUsuario from './components/HomeUsuario';
import {jwtDecode} from 'jwt-decode'
import HomeFuncionario from './components/HomeFuncionario';


const Stack = createNativeStackNavigator();
export default function App() {
  const [rotaInicial, setRotaInicial] = useState(null);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if(!token) {
          setRotaInicial('Login');
          return;
        }

        const decodedToken = jwtDecode(token);
        setUserObject(decodedToken);
        const currentTime = Math.floor(Date.now()/1000);


        if(decodedToken.exp < currentTime){
          setRotaInicial('Login');
        }else{
          await redirectUser();
        }

      } catch (error) {
        console.log("Ocorreu um erro ao pegar o token; ", error);
        setRotaInicial('Login');
      }

      async function redirectUser() {
        const papelUsuario = await AsyncStorage.getItem('papelUsuario');
        if (papelUsuario == 0) {
          setRotaInicial('HomeUsuario');
        } else if (papelUsuario == 1) {
          setRotaInicial('HomeFuncionario');
        } else {
          setRotaInicial('Login');
        }
      }
    }

    checkToken();
  }, []);

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: '#ffe6e6', // Tonalidade mais clara
        100: '#ffcccc',
        200: '#ffb3b3',
        300: '#ff9999',
        400: '#ff8080',
        500: '#ff6666', // Tonalidade principal
        600: '#ff4d4d',
        700: '#ff3333',
        800: '#ff1a1a',
        900: '#ff0000', // Tonalidade mais escura
      },
      // Redefining only one shade, rest of the color will remain same.
    },
     config: {
       // Changing initialColorMode to 'dark'
       initialColorMode: 'light',
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      {rotaInicial !== null && (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={rotaInicial}>
          <Stack.Screen name='Login' component={Login} options={{title:"Login", headerShown: false}}/>
          <Stack.Screen name='Home' component={Home} options={{title:"Welcome"}}/>
          <Stack.Screen name='HomeUsuario' component={HomeUsuario} initialParams={{userObject: userObject}} options={{title:"Bem-Vindo", headerShown: false}}/>
          <Stack.Screen name='HomeFuncionario' component={HomeFuncionario} initialParams={{userObject: userObject}} options={{title:"Bem-Vindo", headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      )}
  </NativeBaseProvider>
  );
}
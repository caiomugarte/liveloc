import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { jwtDecode } from "jwt-decode";
import { NativeBaseProvider, extendTheme } from "native-base";
import React, { useEffect, useState } from "react";
import "./App.css";
import HomeFuncionario from "./components/HomeFuncionario";
import HomeUsuario from "./components/HomeUsuario";
import Login from "./components/Login";
import LoteTagueado from "./components/LoteTagueado";
import NewHome from "./components/NewHome";
import NewLogin from "./components/NewLogin";
import SearchPage from "./components/SearchPage";

const Stack = createNativeStackNavigator();
const TIPO_GESTOR_LOGISTICA = 1;
export default function App() {
  const [rotaInicial, setRotaInicial] = useState(null);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const fromQRCode =
          new URLSearchParams(window.location.search).get("fromQRCode") ===
          "true";

        if (fromQRCode) {
          return;
        }

        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setRotaInicial("Home");
          return;
        }

        const decodedToken = jwtDecode(token);
        setUserObject(decodedToken);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
          setRotaInicial("Home");
        } else {
          await redirectUser();
        }
      } catch (error) {
        console.log("Ocorreu um erro ao pegar o token; ", error);
        setRotaInicial("Home");
      }

      async function redirectUser() {
        const papelUsuario = await AsyncStorage.getItem("papelUsuario");
        if (papelUsuario == TIPO_GESTOR_LOGISTICA) {
          setRotaInicial("HomeFuncionario");
        } else {
          setRotaInicial("Home");
        }
      }
    };

    checkToken();
  }, []);

  const theme = extendTheme({
    colors: {
      // Add new color
      primary: {
        50: "#ffe6e6", // Tonalidade mais clara
        100: "#ffcccc",
        200: "#ffb3b3",
        300: "#ff9999",
        400: "#ff8080",
        500: "#ff6666", // Tonalidade principal
        600: "#ff4d4d",
        700: "#ff3333",
        800: "#ff1a1a",
        900: "#ff0000", // Tonalidade mais escura
      },
      // Redefining only one shade, rest of the color will remain same.
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: "light",
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      {rotaInicial !== null && (
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName={rotaInicial}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={NewHome}
              options={{ title: "Welcome", headerShown: false }}
            />
            <Stack.Screen
              name="HomeUsuario"
              component={HomeUsuario}
              initialParams={{ userObject: userObject }}
              options={{ title: "Bem-Vindo", headerShown: false }}
            />
            <Stack.Screen
              name="HomeFuncionario"
              component={HomeFuncionario}
              initialParams={{ userObject: userObject }}
              options={{ title: "Bem-Vindo", headerShown: false }}
            />
            <Stack.Screen
              name="LoteTagueado"
              component={LoteTagueado}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="newLogin"
              component={NewLogin}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="search"
              component={SearchPage}
              options={{ headerShown: false }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </NativeBaseProvider>
  );
}

const linking = {
  config: {
    screens: {
      Home: "home",
      LoteTagueado: "lote-tagueado",
      Login: "login",
    },
  },
};

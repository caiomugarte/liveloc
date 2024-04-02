import React from 'react';
import './App.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './components/Home';
import Lote from './components/Lote';
import Login from './components/Login';
import { NativeBaseProvider, extendTheme } from 'native-base';

const Stack = createNativeStackNavigator();

export default function App() {

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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={Login} options={{title:"Login"}}/>
          <Stack.Screen name='Home' component={Home} options={{title:"Welcome"}}/>
        </Stack.Navigator>
      </NavigationContainer>
      {/* <NativeRouter>
      <View>
        <View>
          <Link to="/">
            <Text>Home</Text>
          </Link>
          <Link to="/lote">
            <Text>Lote</Text>
          </Link>
          <Link to="/login">
            <Text>Login</Text>
          </Link>
        </View>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/lote" element={<Lote/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </View>
    </NativeRouter> */}
  </NativeBaseProvider>
  );
}
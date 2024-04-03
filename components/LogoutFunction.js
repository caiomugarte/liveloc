import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  }
import React from "react";
import { Box, HStack, Pressable, Center, Icon, Text, useColorModeValue } from "native-base";
import { faHome, faQrcode } from "@fortawesome/free-solid-svg-icons"; // Import the Font Awesome icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default function FooterFuncionario({navigation}) {
  const [selected, setSelected] = React.useState(0);
  const iconColor = useColorModeValue("gray.400", "primary.600");
  const backgroundColor = useColorModeValue("white", "primary.600");

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.log('Erro ao deslogar:', error);
    }
  }
  

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      width="100%"
      bg="transparent"
      safeAreaBottom
      zIndex={999}
    >
      <Box bg="white" borderRadius={200} shadow={6} margin={10}>
        <HStack bg="white" alignItems="center" borderRadius={200}>
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => setSelected(0)}
            
          >
            <Center>
              <FontAwesomeIcon
                icon={faHome}
                size="2x"
              />
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(1)}
          >
            <Center>
                <Box 
                bg={selected === 1 ? backgroundColor : "transparent"}
                borderRadius="full"
                px={2}
                py={2}>
                    <FontAwesomeIcon
                        color={iconColor}
                        icon={faQrcode}
                        size="2x"
                    />
                </Box>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={handleLogout}
          >
            <Center>
                <Box 
                bg={selected === 1 ? backgroundColor : "transparent"}
                borderRadius="full"
                px={2}
                py={2}
                >
                  <Text>
                    LOGOUT
                  </Text>
                </Box>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </Box>
  );
}

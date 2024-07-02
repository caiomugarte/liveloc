import axios from "axios";
import {
  Box,
  Center,
  CheckIcon,
  HStack,
  Image,
  NativeBaseProvider,
  Pressable,
  ScrollView,
  Select,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import Header from "./Header";

const getEndereco = async ({ latitude, longitude }) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.address;
  } catch (error) {
    console.error(error);
  }
};

const ProductSection = () => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/produtos");
        const data = response.data.produtos;

        // Fetch address for each product
        const updatedProducts = await Promise.all(
          data.map(async (product) => {
            if (
              product.localEntrega &&
              product.localEntrega.latitude &&
              product.localEntrega.longitude
            ) {
              const address = await getEndereco(product.localEntrega);
              return {
                ...product,
                localEntrega: `${address.city}`,
              };
            }
            return product;
          })
        );

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (productId) => {
    setSelectedProduct(productId);
    const selectedProductDetails = products.find(
      (product) => product._id === productId
    );
    setProductDetails(selectedProductDetails);
  };

  return (
    <Box
      bg="rgba(246, 246, 246, 1)"
      borderRadius="27px"
      shadow={4}
      p={6}
      flex={1}
    >
      <VStack space={4} w="100%" maxW="100%">
        <Text fontSize="24px" fontFamily="Plus Jakarta Sans" textAlign="center">
          Produto
        </Text>
        <VStack space={2} w="100%">
          <Text fontFamily="Montserrat" color="#666" textAlign="center">
            Selecionar Produto
          </Text>
          <Select
            selectedValue={selectedProduct}
            minWidth="200"
            placeholder="Escolha um produto"
            onValueChange={handleProductChange}
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            w="100%"
          >
            {products.map((product) => (
              <Select.Item
                key={product._id}
                label={product.nome}
                value={product._id}
              />
            ))}
          </Select>
        </VStack>
        {productDetails && (
          <>
            <Image
              source={{
                uri:
                  productDetails.imagemUrl || "https://via.placeholder.com/300",
              }}
              alt="Product Image"
              w="100%"
              h="300px"
              resizeMode="contain"
              mt={4}
            />
            <HStack space={4} mt={4} w="100%">
              <VStack space={2} flex={1}>
                {[
                  "Código de Rastreio",
                  "Local de Entrega",
                  "Nome do Comprador",
                ].map((label) => (
                  <Box
                    key={label}
                    bg="#f6f6f6"
                    borderRadius="27px"
                    shadow={4}
                    p={4}
                  >
                    <Text fontFamily="Plus Jakarta Sans">{label}</Text>
                  </Box>
                ))}
              </VStack>
              <VStack space={2} flex={1}>
                {[
                  productDetails.codigoRastreio,
                  productDetails.localEntrega,
                  productDetails.nomeComprador,
                ].map((value) => (
                  <Box key={value} p={4}>
                    <Text fontFamily="Plus Jakarta Sans">{value}</Text>
                  </Box>
                ))}
              </VStack>
            </HStack>
          </>
        )}
      </VStack>
    </Box>
  );
};

const LotSection = () => (
  <Box
    bg="rgba(246, 246, 246, 1)"
    borderRadius="27px"
    shadow={4}
    p={6}
    flex={1}
  >
    <VStack space={6}>
      <Text fontSize="24px" fontFamily="Plus Jakarta Sans" textAlign="center">
        Lote Associado
      </Text>
      {["80890", "80890"].map((number, index) => (
        <HStack
          key={index}
          bg="#f6f6f6"
          borderRadius="27px"
          shadow={4}
          p={4}
          justifyContent="space-between"
        >
          <Text fontFamily="Plus Jakarta Sans" color="#000">
            {number}
          </Text>
          <Pressable bg="#f00" borderRadius="27px" px={5} py={2}>
            <Text color="white" fontFamily="Plus Jakarta Sans">
              Vincular
            </Text>
          </Pressable>
        </HStack>
      ))}
    </VStack>
  </Box>
);

const Produtos = () => {
  return (
    <NativeBaseProvider>
      <ScrollView bg="white">
        <VStack space={8} alignItems="center" w="100%" bg="#ececec" px={5}>
          <Header />
          <Text
            fontSize="48px"
            fontFamily="Plus Jakarta Sans"
            textAlign="center"
            mt={12}
          >
            Gerenciamento de Lotes
          </Text>
          <HStack space={5} w="100%" maxW="1796px">
            <ProductSection />
            <LotSection />
          </HStack>
          <Center w="100%" bg="white" py={6}>
            <Text
              color="#696888"
              fontSize="12px"
              fontFamily="Plus Jakarta Sans"
            >
              © Copyright 2024. Designed and Developed by Kavinda
            </Text>
          </Center>
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Produtos;

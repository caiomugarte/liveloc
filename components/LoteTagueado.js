import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function LoteTagueado() {
  const route = useRoute();
  const loteRaw = route.params.lote;

  const lote = JSON.parse(loteRaw);

  return (
    <View>
      <Text>ID do Lote: {lote._id}</Text>
      <Text>Numero do Lote: {lote.numeroLote}</Text>
    </View>
  );
}

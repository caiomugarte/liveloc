import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ListaLotes() {
  const [lotes, setLotes] = useState([]);

  useEffect(() => {
    const fetchLotes = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/lotes");
        const data = await response.json();
        setLotes(data.lotes);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLotes();
  }, [])

  return (
    <View style={styles.container}>
      {lotes.map((lote) => (
        <View key={lote.id}>
          <Text style={styles.item}>{lote.numeroLote}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  },
});

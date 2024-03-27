import { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg'
export default function Lote() {
    const [loteId, setLoteId] = useState(null);

    useEffect(() => {
        generateLoteId();
    },[])

    const generateLoteId = () => {
        const newLoteId = 'TESTE123'; //Tá fixo
        setLoteId(newLoteId);
    }
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {loteId && (
            <View>
                <Text>Lote Id: {loteId}</Text>
                <QRCode value={loteId} size={200} />
            </View>
        )}
    </View>
    )
}
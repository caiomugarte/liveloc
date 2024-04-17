import { useEffect } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg'
export default function Lote({ loteId }) {
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
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Item {
  id: string;
  nome: string;
  valor: string;
}

export default function App() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [lista, setLista] = useState<Item[]>([]);

  const handleAddItem = () => {
    setLista([...lista, { id: Math.random().toString(), nome, valor }]);
    setNome('');
    setValor('');
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Nome:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            value={nome}
            onChangeText={setNome}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Valor:</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 5 }}
            keyboardType="numeric"
            value={valor}
            onChangeText={setValor}
          />
        </View>
      </View>
      <Button color='#150068ff' title="Adicionar" onPress={handleAddItem}  />
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', marginVertical: 5 }}>
              <Text style={{ flex: 1 }}>{item.nome}</Text>
              <Text style={{ flex: 1, textAlign: 'right' }}>{item.valor}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    marginTop: 40,
    backgroundColor: '#150068ff',
  },
});
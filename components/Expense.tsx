import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ychetyiyxofopaqbkxzw.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljaGV0eWl5eG9mb3BhcWJreHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU1Njc1OTMsImV4cCI6MjAwMTE0MzU5M30.15iyRyumiZowEdnQ12RfF51Ti21RoL4pT2hr-a02F0w"
const supabase = createClient(supabaseUrl, supabaseKey);

interface Item {
  nome: string;
  valor: string;
}

export default function App() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [lista, setLista] = useState<Item[]>([]);

  const handleAddItem = async () => {
    try {
      const { data, error } = await supabase.from('despesa').insert([{ nome, valor }]);

      if (error) {
        console.error('Error adding item:', error);
        Alert.alert("Erro ao cadastrar a despesa", error.toString())
      } else {
        if (data) {
          const newItem = { nome, valor };
          setLista([...lista, newItem]);
          setNome('');
          setValor('');
        }
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
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
      <Button color="#150068ff" title="Adicionar" onPress={handleAddItem} />
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={lista}
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

const styles = StyleSheet.create({
  button: {
    marginTop: 40,
    backgroundColor: '#150068ff',
  },
});

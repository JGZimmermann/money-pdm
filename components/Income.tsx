import React, { useState } from 'react';
import { View, TextInput, Button, FlatList} from 'react-native';
import { Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import 'react-native-url-polyfill/auto'
import { useFocusEffect} from 'expo-router';
import supabaseConfig from '../config/supabaseConfig';
import { VictoryPie } from 'victory-native';
import { Badge, HStack, Icon, NativeBaseProvider, ScrollView, VStack, theme, Box, Text} from 'native-base';

const supabase = supabaseConfig;

interface Item {
  nome: string;
  valor: string;
}

export default function App() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [lista, setLista] = useState<Item[]>([]);
  const [financas, setFinancas] = useState<any>([]);
  const [totalfinancas, setTotalFinancas] = useState<any>([]);

  useFocusEffect(() => {
    fetchFinancas();
    fetchTotalFinancas();
  });

  const fetchFinancas = async () => {
    try {
      const { data, error } = await supabase.from('financa').select();

      if (error) {
        console.error('Error fetching finances:', error);
      } else {
        setFinancas(data);
      }
    } catch (error) {
      console.error('Error fetching finances:', error);
    }
  };

  const fetchTotalFinancas = async () => {
    try {
      let total = 0;
      financas.forEach(function (financa: { valor: number; }) {
        total = total + financa.valor;
      }); 
      setTotalFinancas(total);
    } catch (error) {
      console.error('Error fetching total expenses:', error);
    }
  };

  const handleUpdateItemFinanca = async (id: number) => {
    Alert.prompt(
      'Atualizar Item',
      'Informe os novos valores:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Atualizar',
          onPress: async (text: string | undefined) => {
            const [nome, valor] = text.split(',');

            try {
              const { data, error } = await supabase
                .from('financa')
                .update({ nome, valor })
                .eq('id', id);

              if (error) {
                console.error('Error updating item:', error);
              } else {
                console.log('Item updated successfully:', id);
                fetchFinancas();
              }
            } catch (error) {
              console.error('Error updating item:', error);
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const handleDeleteItemFinanca = async (id: number) => {
    Alert.alert(
      'Excluir Item',
      'Tem certeza que deseja excluir o item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir', style: "destructive",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from('financa')
                .delete()
                .eq('id', id);
  
              if (error) {
                console.error('Error deleting item:', error);
              } else {
                console.log('Item deleted successfully:', id);
                fetchFinancas();
              }
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          },
        },
      ],
    );
  };

  const handleAddItem = async () => {
    try {
      const { data, error } = await supabase.from('financa').insert([{ nome, valor }]);

      if (error) {
        console.error('Error adding item:', error);
        Alert.alert("Erro ao cadastrar a receita", error.toString())
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

  const handleBadgePress = (id: number, nome: string, valor: string) => {
    Alert.alert(
      `Nome: ${nome}`,
      `Valor: ${valor}`,
    );
  };

  return (
    <NativeBaseProvider theme={theme}>
      <ScrollView>
        <VictoryPie
            data={financas}
            x="nome"
            y="valor"
            colorScale="qualitative"
            padding={100}
        />
        <Box alignItems="center" marginBottom={5}>
          <Text fontSize="3xl" color="#3cb431"> Total: {totalfinancas} </Text>
        </Box>
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
        <HStack space={2} marginLeft="6" marginTop="5" marginBottom="10">
          <VStack space={3}>
            {financas.map((financa: { id: number; nome: string; valor: string; }) => (
              <HStack key={financa.id}>
                <Badge colorScheme="success">
                  <Text onPress={() => handleBadgePress(financa.id, financa.nome, financa.valor)}>
                    {financa.nome}
                  </Text>
                </Badge>
                <HStack marginRight="3" marginLeft="5">
                  <Text onPress={() => handleUpdateItemFinanca(financa.id)}>Editar</Text>
                  <Icon
                    as={<AntDesign name="edit" />}
                    size="sm"
                  />
                </HStack>
                <HStack>
                  <Text onPress={() => handleDeleteItemFinanca(financa.id)}>Excluir</Text>
                  <Icon
                    as={<AntDesign name="delete" />}
                    size="sm"
                    onPress={() => handleDeleteItemFinanca(financa.id)}
                    color="red.500"
                />
                </HStack>
              </HStack>
            ))}
          </VStack>
        </HStack>
      </ScrollView>
    </NativeBaseProvider>
  );}
import React, { useEffect, useState } from 'react';
import { Center, NativeBaseProvider, Box, HStack, VStack, Text, extendTheme, Avatar, Badge, Fab, Icon } from 'native-base';
import 'react-native-url-polyfill/auto'
import { Alert } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { VictoryPie } from 'victory-native';
import { useFocusEffect, useRouter } from 'expo-router';
import supabaseConfig from '../config/supabaseConfig';

const supabase = supabaseConfig;

export default function Home() {
  const [financas, setFinancas] = useState<any>([]);
  const [despesas, setDespesas] = useState<any>([]);

  useFocusEffect(() => {
    fetchFinancas();
    fetchDespesas();
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

  const fetchDespesas = async () => {
    try {
      const { data, error } = await supabase.from('despesa').select();

      if (error) {
        console.error('Error fetching expenses:', error);
      } else {
        setDespesas(data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const handleUpdateItemFinanca = async (id: any) => {
    Alert.prompt(
      'Atualizar Item',
      'Informe os novos valores:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Atualizar',
          onPress: async (text: any) => {
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

  const handleUpdateItemDespesa = async (id: any) => {
    Alert.prompt(
      'Atualizar Item',
      'Informe os novos valores:',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Atualizar',
          onPress: async (text: any) => {
            const [nome, valor] = text.split(',');

            try {
              const { data, error } = await supabase
                .from('despesa')
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
              const { data, error } = await supabase
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
  
  const handleDeleteItemDespesa = async (id: any) => {
    Alert.alert(
      'Excluir Item',
      'Tem certeza que deseja excluir o item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir', style: "destructive",
          onPress: async () => {
            try {
              const { data, error } = await supabase
                .from('despesa')
                .delete()
                .eq('id', id);
  
              if (error) {
                console.error('Error deleting item:', error);
              } else {
                console.log('Item deleted successfully:', id);
                fetchDespesas();
              }
            } catch (error) {
              console.error('Error deleting item:', error);
            }
          },
        },
      ],
    );
  };
  

  const handleBadgePress = (id: number, nome: string, valor: string) => {
    Alert.alert(
      `Nome: ${nome}`,
      `Valor: ${valor}`,
    );
  };
  

  return (
    <NativeBaseProvider theme={theme}>
      <Box bg="primary.50" size="full" h="150">
        <HStack space={2}>
          <Avatar bg="green.500" source={{ uri: "https://res.cloudinary.com/df9vsxetm/image/upload/v1663678140/meteu%20essa/corinthians_xljoea.png" }} size="lg" marginTop="70" marginLeft="5" />
          <VStack space={1} marginTop="70" marginLeft="2">
            <Text alignSelf="center" color="white">Bem vindo de volta,</Text>
            <Text bold alignSelf="center" color="white" fontSize="4xl">Usuário</Text>
          </VStack>
        </HStack>
      </Box>

      <VictoryPie
        data={financas.concat(despesas)}
        x="nome"
        y="valor"
        colorScale="qualitative"
        padding={100}
      />

      <HStack space={2} marginLeft="6" marginTop="5">
        <VStack space={3}>
          {financas.map((financa: { id: React.Key | null | undefined; nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; valor: string; }) => (
            <HStack key={financa.id}>
              <Badge colorScheme="success">
                <Text onPress={() => handleBadgePress(financa.id, financa.nome, financa.valor)}>
                  {financa.nome}
                </Text>
              </Badge>
              <Icon
                as={<AntDesign name="edit" />}
                size="sm"
                onPress={() => handleUpdateItemFinanca(financa.id)}
              />
              <Icon
                as={<AntDesign name="delete" />}
                size="sm"
                onPress={() => handleDeleteItemFinanca(financa.id)}
                color="red.500"
              />
            </HStack>
          ))}
          {despesas.map((despesa: { id: React.Key | null | undefined; nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; valor: string; }) => (
            <HStack key={despesa.id}>
              <Badge colorScheme="danger">
                <Text onPress={() => handleBadgePress(despesa.id, despesa.nome, despesa.valor)}>
                  {despesa.nome}
                </Text>
              </Badge>
              <Icon
                as={<AntDesign name="edit" />}
                size="sm"
                onPress={() => handleUpdateItemDespesa(despesa.id)}
              />
              <Icon
                as={<AntDesign name="delete" />}
                size="sm"
                onPress={() => handleDeleteItemDespesa(despesa.id)}
                color="red.500"
              />
            </HStack>
          ))}
        </VStack>
      </HStack>
    </NativeBaseProvider>
  );
}

const theme = extendTheme({
  colors: {
    primary: {
      50: '#150068ff'
    }
  }
});
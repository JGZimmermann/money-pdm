import { View, Text } from "react-native";
import React from 'react'
import {Stack} from 'expo-router'
import firebaseConfig from "../simple-firestore-hooks/config/firebaseConfig.example";
import useFirebase from "../simple-firestore-hooks/hooks/useFirebase";

export default function _layout() {
  const firebaseApp = useFirebase(firebaseConfig);

  if (firebaseApp == null) return <View><Text>Loading...</Text></View>;
  return (
    <Stack screenOptions={
      {
        headerShown: false
      }
    } /> 
  )
}
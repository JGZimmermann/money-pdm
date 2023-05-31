import firebaseConfig from "./simple-firestore-hooks/config/firebaseConfig.example";
import useFirebase from "./simple-firestore-hooks/hooks/useFirebase";
import { View } from 'react-native'
import Router from "./src/Router";

export default function App() {
  const firebaseApp = useFirebase(firebaseConfig);
  console.log("Deu certo!")

  if (firebaseApp == null) return <View>Loading...</View>;
  return <Router />;
} ;


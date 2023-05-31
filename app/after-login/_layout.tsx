import { Tabs } from "expo-router";
import firebaseConfig from "../../simple-firestore-hooks/config/firebaseConfig.example";
import useFirebase from "../../simple-firestore-hooks/hooks/useFirebase";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "react-native";

type ScreenProps = {
  [key: string]: {
    icon: string;
    label: string;
  };
};

const Screens: ScreenProps = {
  index: {
    label: "Home",
    icon: "home",
  },
  "income/index": {
    label: "Receita",
    icon: "cash-outline",
  },
};

export default function DefaultLayout() {
  const firebaseApp = useFirebase(firebaseConfig);

  if (firebaseApp == null) return <View><Text>Loading...</Text></View>;
  return (
    <Tabs
      screenOptions=
      {({ route }) => {
        return {
          tabBarIcon: ({ focused, size }) => {
            return (
              <Ionicons
                name={Screens[route.name]?.icon as any}
                size={size}
                color={focused ? "#4b4b4b" : "#7c7d7c"}
              />
            );
          },
          tabBarLabelStyle: {
            fontSize: 12,
            color: "#7c7d7c",
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 60,
          },
          tabBarLabel: Screens[route.name]?.label,
        };
      }}
    ></Tabs>
  );
}
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

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
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  BalsamiqSans_400Regular,
  BalsamiqSans_700Bold,
  useFonts,
} from "@expo-google-fonts/balsamiq-sans";


import { Routes } from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.indicator}>
        <ActivityIndicator color="#955999" size={20} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <Routes />
    </>
  );
}

const styles = StyleSheet.create({
  indicator: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
});

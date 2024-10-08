import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  BalsamiqSans_400Regular,
  BalsamiqSans_700Bold,
  useFonts,
} from "@expo-google-fonts/balsamiq-sans";
import {
  SafeAreaView,

} from 'react-native-safe-area-context';


import { Routes } from "./src/routes";
import { ExpensesCtxProvider } from '@contexts/expensesContext';
import { AuthContextProvider } from "@contexts/authContext";



export default function App() {
  const [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView>

      <View style={styles.indicator}>
        <ActivityIndicator color="#955999" size={20} />
      </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <ExpensesCtxProvider>
          <Routes />
        </ExpensesCtxProvider>
      </AuthContextProvider>
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

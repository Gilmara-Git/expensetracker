
import { StatusBar} from 'expo-status-bar';
import { StyleSheet, View , ActivityIndicator} from 'react-native';
import { BalsamiqSans_400Regular,BalsamiqSans_700Bold, useFonts } from '@expo-google-fonts/balsamiq-sans'
import themes  from './src/theme/themes';
import { AllExpenses } from './src/screens/AllExpenses';



export default function App() {

  const [fontsLoaded] = useFonts({
    BalsamiqSans_400Regular,
    BalsamiqSans_700Bold
  })

  
  if(!fontsLoaded){
    return (
    <View style={styles.indicator}>
      <ActivityIndicator color='#955999' size={20}/>
    </View>)
  }
  
  return (
  
    <View style={styles.container}>
      <StatusBar style="auto" />
      <AllExpenses/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',  
  },
  welcome:{
    fontFamily: themes.fonts.balsamiq_400
  },
  indicator:{
    justifyContent: 'center',
    alignContent: 'center',
    flex:1
  }
});

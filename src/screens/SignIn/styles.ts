import { StyleSheet } from "react-native";
import themes from '../../theme/themes';

export const styles = StyleSheet.create({
  background:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  controllerContainer:{
    width: '100%', 
    paddingHorizontal: 80, 
    marginTop: -106
  },
 
  button:{
    marginTop: 20
  }

});

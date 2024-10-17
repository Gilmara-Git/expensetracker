import { StyleSheet } from "react-native";
import themes from "../../theme/themes";

export const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  photo: {
    flex: 1,
    margin: 30,
    borderRadius: 8,
    overflow: "hidden",
  
  },
    map: {
    flex: 2,
    margin: 30,
    marginTop: -20,
    borderRadius: 8,
    overflow: "hidden",
 
  },
  wrappingContainer: {
    backgroundColor: themes.colors.light_purple,
    flex: 1,
  },
  innerWrapper:{
    justifyContent: "center", 
    alignItems: "center", 
    flex:1}
});

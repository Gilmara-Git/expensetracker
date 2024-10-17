import { StyleSheet } from "react-native";
import themes from "../../theme/themes";
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

  },
  // overflow and borderRadius applied on wrappingContainer, so borderRadius and Shadow work on both platform
  photo: {
    flex: 1,
    margin: 30,
    elevation: 4,
    shadowColor: themes.colors.jetBlack,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .3,
    shadowRadius: 2,
   
  },
  // overflow and borderRadius applied on wrappingContainer, so borderRadius and Shadow work on both platform
    map: {
    flex: 1,
    margin: 30,
    marginTop: -20,
    elevation: 4,
    shadowColor: themes.colors.jetBlack,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: .3,
    shadowRadius: 2,
 
  },
  wrappingContainer: {
    backgroundColor: themes.colors.light_white,
    flex: 1,
    overflow: 'hidden',
    borderRadius: 8,

  },
  innerWrapper:{
    justifyContent: "center", 
    alignItems: "center", 
    flex:1,
   
  
  }
    , 
    imagePreview:{
      width: '100%',
      height: '100%',


    }, 
    imageTaken:{
      width: '100%',
      height: '100%',
      borderRadius: 8
    },
    trashButton: { 
      position: 'absolute', 
      bottom:10, 
      right: 10 
    },
    photoIconContainer:{
      alignItems: 'center',
    },
    iconTitle: {
      fontFamily: themes.fonts.balsamiq_400, 
      fontSize: 12 , 
      color: themes.colors.purple_1}
      
});

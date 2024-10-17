import { StyleSheet } from 'react-native';
import themes from '../../theme/themes';


export const styles = StyleSheet.create({
    container: {
      padding: 40,
       
    },
    group:{
      flexDirection: 'column',
      // gap:55,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 10,
    

    },
    buttonContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      gap: 20,
      height: 40,
      maxHeight: 40,

    }, catContainer:{
      paddingHorizontal: 10
    }, 
    catInnerContainer:{
      marginTop: 3.4,
      height: 1, 
      backgroundColor: themes.colors.warn, 
      alignItems: 'center', 
      borderRadius:20
    },
    catText:{
      textAlign: 'center', color: themes.colors.warn
    },
    datePickerIOS:{
      marginTop: -10,
      height: 120,
      
    },
    iosButtonContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -2,
      marginBottom: 20,
      gap: 20
    },
    link:{
      marginTop: -22
    },
    receiptMap:{ 
      textAlign: 'center', 
      color: themes.colors.yellow_1,
      fontFamily: themes.fonts.balsamiq_400,
      fontSize: 16

    }
   
   
    
})
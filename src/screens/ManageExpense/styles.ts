import { StyleSheet } from 'react-native';
import themes from '../../theme/themes';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginVertical: 20,
      
  
    },
    background:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight,
        alignItems: 'center', 
        justifyContent: 'center',  
        
          
    },
    innerContainer:{
       
    },
    category:{
        fontFamily: themes.fonts.balsamiq_700,
        fontSize: 32,
        marginTop:40
    }
})
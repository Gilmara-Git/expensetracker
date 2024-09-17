import { StyleSheet } from 'react-native';
import themes from '../../theme/themes';
import { Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container:{
        // flexDirection: 'row',
        // // justifyContent: 'space-evenly',
        // alignItems: 'center',
        gap: 16,
        marginVertical: 20,
        
  
    },
    background:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: windowHeight,
        // alignItems: 'center', 
        // justifyContent: 'center', 
        // width: windowWidth
        
          
    },
    innerContainer:{
        backgroundColor: themes.colors.jetBlack,
        width: 100,
        

    },
    category:{
        fontFamily: themes.fonts.balsamiq_700,
        fontSize: 32,
        marginTop:40
    },
    form:{
        // alignItems: 'center',
        marginTop: 20,
        // paddingHorizontal: 40
        flex: 1
    }
})
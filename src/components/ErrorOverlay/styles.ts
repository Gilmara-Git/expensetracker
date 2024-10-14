import { StyleSheet } from 'react-native';
import themes from '../../theme/themes'


export const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        gap:30,
        padding: 20
   
    },
    text: {
        color: themes.colors.purple_3 ,
        fontFamily: themes.fonts.balsamiq_400,
        fontSize: 16,
        textAlign: 'center'
    },
    title:{
        fontFamily: themes.fonts.balsamiq_700,
        fontSize: 20
    }
})
import { StyleSheet } from 'react-native';
import themes from '../../theme/themes';


export const styles = StyleSheet.create({
    indicator: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    message: {
        color: themes.colors.purple_1,
        textAlign: 'center'
   }
})
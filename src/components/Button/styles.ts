import { StyleSheet, Platform } from "react-native";
import themes from '../../theme/themes';



export const styles =  StyleSheet.create({
    container: {
        backgroundColor: themes.colors.purple_1,
        borderRadius: 8,
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Platform.OS === 'android' ? 4 : 6
    },
    title:{
        fontFamily: themes.fonts.balsamiq_700,
        fontSize: 16,
        color: themes.colors.yellow_2,
     
    },
    pickLocation: {
        color: themes.colors.warn,
    }
})
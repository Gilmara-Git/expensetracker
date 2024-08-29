import { StyleSheet } from "react-native";
import themes from '../../theme/themes';

export const styles =  StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding:10,
        marginTop: 10,
        backgroundColor: themes.colors.purple_3,
        borderRadius: 8,
    },
    period:{
        color: themes.colors.light_white,
        fontFamily: themes.fonts.balsamiq_400,
        fontSize: 14


    },
    sum: {
        color: themes.colors.light_white,
        fontFamily: themes.fonts.balsamiq_700,
        fontSize: 14

    }
});
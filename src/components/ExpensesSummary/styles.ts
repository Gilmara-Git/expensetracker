import { StyleSheet } from "react-native";
import themes from '../../theme/themes';

export const styles =  StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding:10,
        marginTop: 10,
        backgroundColor: themes.colors.purple_1,
        borderRadius: 8,
    
    },
    period:{
        color: themes.colors.light_white,
        fontFamily: themes.fonts.balsamiq_400,
        fontSize: 14,
        marginLeft: 10


    },
    sum: {
        color: themes.colors.light_white,
        fontFamily: themes.fonts.balsamiq_700,
        fontSize: 14,
        marginRight: 10

    }
});
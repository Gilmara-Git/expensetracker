import { StyleSheet } from "react-native";
import themes  from '../../theme/themes';
import {Dimensions } from 'react-native';
const deviceHeight =  Dimensions.get('window').height;


export const styles =  StyleSheet.create({
    listEmpty:{
        alignItems: 'center',
        justifyContent: 'center',
        height: deviceHeight - 200
    },
    fallback:{
        fontFamily: themes.fonts.balsamiq_700,
        fontSize: 24,
        color: themes.colors.purple_3
    
    }
});

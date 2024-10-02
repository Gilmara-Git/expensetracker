import { StyleSheet } from "react-native";
import themes from '../../theme/themes';

export const styles = StyleSheet.create({
    link:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:10
      },
      user:{
        fontFamily: themes.fonts.balsamiq_400,
        color: themes.colors.purple_1,
        fontSize: 14
      },
      account:{
    
        fontFamily: themes.fonts.balsamiq_700,
        color: themes.colors.yellow_1,
        fontSize: 14
    
      }
});

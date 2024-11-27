import { StyleSheet } from 'react-native';
import themes from '../../theme/themes';


export const styles = StyleSheet.create({
    iconContainer:{
        borderRadius: 50,
        backgroundColor: themes.colors.purple_1,
        maxHeight: 30,
        maxWidth:30,
        padding: 6,
        marginRight: 15,
        alignItems:'center',
        justifyContent: 'center'
    },
   
}
)
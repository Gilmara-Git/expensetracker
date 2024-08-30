import { StyleSheet } from "react-native";
import themes  from '../../theme/themes';

export const styles = StyleSheet.create(
    {
        outerContainer:{
            borderRadius:16,
            marginVertical: 15,
            elevation: 4,
            shadowColor: themes.colors.jetBlack,
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity: .3,
            shadowRadius: 2,
        },
        container:{
            borderRadius:16,
            overflow: 'hidden',
            padding: 40,
            
        },
        background:{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 80,
            alignItems: 'center', 
            justifyContent: 'center',  
              
        },
        itemContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',

            
        },
        iconContainer:{
            borderRadius: 50,
            backgroundColor: themes.colors.purple_1,
            padding: 8,
            marginRight: 15,
        },

        title:{
            fontFamily: themes.fonts.balsamiq_700,
            textAlign: 'center',
            fontSize: 14
        },
        category:{
            fontFamily: themes.fonts.balsamiq_400, 
            textAlign: 'center',
            fontSize: 12
        },
        itemsContainerTop:{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1,
            width: 150,
            maxWidth: 150,
            marginRight: 15
        },
        itemsContainerBottom:{
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1,
            width: 90,
            maxWidth: 90,
          
        },
        pressed:{
            opacity: .75
        }

    }
)
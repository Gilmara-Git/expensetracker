import { View } from 'react-native';
import { styles } from './styles';
import themes from '../../theme/themes';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

type IconContainerProps ={
    iconSize: number;
    category: string;
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap,
}

export const IconContainer = ({iconSize, category}: IconContainerProps)=>{
    return(
        <View style={styles.iconContainer}>
    
        { category === 'Apparel' && 
        <MaterialCommunityIcons  name='shopping' size={iconSize} color={themes.colors.yellow_1}/>
        }

        { category === 'Sports' && 
         <MaterialIcons  name='sports' size={iconSize} color={themes.colors.yellow_1}/>
        }
    
        { category === 'Groceries' && 
            <MaterialIcons  name='local-grocery-store' size={iconSize} color={themes.colors.yellow_1}/>
            }
    </View>
    )
};
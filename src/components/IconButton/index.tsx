import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, View , PressableProps} from 'react-native';
import { styles } from './styles';
import { StackNavProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '@hooks/useUserContext';



type IconButtonProps = PressableProps & {
    iconName: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap,
    size: number,
    color: string | any,
  
}

export const IconButton = ({iconName, size, color , ...rest }: IconButtonProps) => {
    
    const { signOut } = useUserContext();

    const navigation = useNavigation<StackNavProps>();
    
    const handleAction = async ()=>{
        if(iconName === 'add'){
            navigation.navigate('manageExpenses', { id: 'addExpense'});
        }
        if(iconName === 'logout'){
            await signOut();
        }
    }

   

    return (
        <Pressable  style={({pressed})=> pressed && styles.pressed} onPress={handleAction} {...rest}>
            <View style={styles.container}>
                { iconName === 'add' && 
                <Ionicons name={iconName} color={color} size={size}/>

                }
                { iconName === 'logout' && 
                   <MaterialCommunityIcons name={iconName} color={color} size={20}
                   /> 
                }

             {  iconName === 'trash-outline' && 
                   <Ionicons name={iconName} color={color} size={20}
                   /> 
                }
                
            </View>
        </Pressable>
    )
};
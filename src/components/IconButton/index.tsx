import { Ionicons } from '@expo/vector-icons';
import { Pressable, View , PressableProps} from 'react-native';
import { styles } from './styles';
import { StackNavProps } from '@routes/stack.routes';
import { useNavigation } from '@react-navigation/native';


type IconButtonProps = PressableProps &{
    iconName: keyof typeof Ionicons.glyphMap,
    size: number,
    color: string | any,

}

export const IconButton = ({iconName, size, color , ...rest }:IconButtonProps) => {

  

    const navigation = useNavigation<StackNavProps>();
    const handleAddExpenseHandler = ()=>{
        navigation.navigate('manageExpenses', { id: 'addExpense'}); 
    }


    return (
        <Pressable  style={({pressed})=> pressed && styles.pressed} onPress={handleAddExpenseHandler} {...rest}>
            <View style={styles.container}>
            <Ionicons name={iconName} size={size} color={color}/>
            </View>
        </Pressable>
    )
};
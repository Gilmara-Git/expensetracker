import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, View , PressableProps, Alert} from 'react-native';
import { styles } from './styles';
import { StackNavProps } from '@routes/app.routes';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '@hooks/useUserContext';



type IconButtonProps = PressableProps & {
    iconName: keyof typeof Ionicons.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap,
    size: number,
    color: string | any,
    uploadReceipt?: ()=>void,
    loadMap?: ()=>void,
}

export const IconButton = ({iconName, size, color ,uploadReceipt, loadMap, ...rest }: IconButtonProps) => {

    
    const { signOut } = useUserContext();

    const navigation = useNavigation<StackNavProps>();
    
    const handleAction = async ()=>{

        if(iconName === 'receipt-sharp'){
            if(uploadReceipt){
                uploadReceipt()
            }
        }

        if(iconName === 'google-maps'){
            if(loadMap){
                loadMap()
            }

        }
        if(iconName === 'add'){
            navigation.navigate('manageExpenses', { id: 'addExpense'});
        }

        if(iconName === 'exit'){
            Alert.alert('Sign Out','Would you like to Sign Out now?',[
                {text: 'No'},
                {text: 'Yes', style: 'destructive', onPress: async()=> await signOut()}, 
            ])
            
        }
    }

   

    return (
        <Pressable  style={({pressed})=> pressed && styles.pressed} onPress={handleAction} {...rest}>
            <View style={styles.container}>
                { iconName === 'add' && 
                <Ionicons name={iconName} color={color} size={size}/>

                }
                { iconName === 'exit' && 
                   <Ionicons name={iconName} color={color} size={size}
                   /> 
                }

                {  iconName === 'trash-outline' && 
                   <Ionicons name={iconName} color={color} size={size}
                   /> 
                }

                { iconName == 'receipt-sharp' && 
                <Ionicons name={iconName} color={color} size={size}
                /> 
                
                }

            { iconName == 'google-maps' && 
                <MaterialCommunityIcons name={iconName} color={color} size={size}
                /> 
                
                }
                
            </View>
        </Pressable>
    )
};
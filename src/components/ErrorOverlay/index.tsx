import { View, Text } from 'react-native';
import  { styles} from './styles';
import { Button } from '@components/Button'

type ErrorOverlayProps ={
    message: string;
    onConfirm: ()=> void;
    permissionExpired?: boolean;
    onTokenExpired?: ()=> void;
}

export const ErrorOverlay = ({message, onConfirm, onTokenExpired, permissionExpired }: ErrorOverlayProps)=>{
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Error</Text>
            <Text numberOfLines={3} style={styles.text}>{message}</Text>
            <Button title={permissionExpired ? 'Sign out': 'Back'} onPress={permissionExpired ? onTokenExpired : onConfirm}/>
        </View>
    )
};
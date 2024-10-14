import { View, Text } from 'react-native';
import  { styles} from './styles';
import { Button } from '@components/Button'

type ErrorOverlayProps ={
    message: string;
    onConfirm: ()=> void;
}

export const ErrorOverlay = ({message, onConfirm}: ErrorOverlayProps)=>{
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Error</Text>
            <Text numberOfLines={2} style={styles.text}>{message}</Text>
            <Button title='Back' onPress={onConfirm}/>
        </View>
    )
};
import { View, ActivityIndicator, Text} from 'react-native';
import { styles } from './styles';
import themes from '../../theme/themes';

type LoadingProps = {
    message?: string
}
export const Loading = ({ message }: LoadingProps)=>{
    return (
        <View style={styles.indicator}>
            <ActivityIndicator size={24} color={themes.colors.purple_3}/>
            <Text style={styles.message}>{message}</Text>
        </View>
    )
};
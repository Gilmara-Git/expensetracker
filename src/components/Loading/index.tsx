import { View, ActivityIndicator} from 'react-native';
import { styles } from './styles';
import themes from '../../theme/themes';


export const Loading = ()=>{
    return (
        <View style={styles.indicator}>
            <ActivityIndicator size={24} color={themes.colors.purple_3}/>
        </View>
    )
};
import { View, Text, TextInput, TextInputProps} from 'react-native';
import { styles} from './styles';
import themes from '../../theme/themes';

type InputProps = TextInputProps & {
    label: string;
    multiline: boolean
}

export const Input = ({ multiline ,label,...rest}:InputProps)=>{
    const nonMultiline = !multiline;
  
    return (
        <View>
                <Text style={styles.label}>{label}</Text>

                <TextInput 
                    style={[styles.input, multiline && styles.multiline, nonMultiline && styles.nonMultiline]}{...rest}
                    placeholderTextColor={themes.colors.light_purple}
            />
        </View>
    )
};
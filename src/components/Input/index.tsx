import { View, TextInput, Text } from 'react-native';

type InputProps = {
    label: string
}


export const Input = ({label}: InputProps)=>{
    return (
        <View>
            <Text>{label}</Text>
            <TextInput />
        </View>
    )
};
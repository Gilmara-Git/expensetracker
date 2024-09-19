import { View, Text, Pressable } from 'react-native';
import { styles } from './styles';

type SignInSignUpLinkProps = {
    question: string;
    direction: string,
    onClick: ()=>void;
}

export const SignInSingUpLink = ({onClick, question, direction}: SignInSignUpLinkProps)=>{
    return (
        <View style={styles.link}>
            <Text style={styles.user}>{question}</Text>
            <Pressable onPress={onClick}>
                <Text style={styles.account}>{direction}</Text>
            </Pressable>
        </View>
    )
};
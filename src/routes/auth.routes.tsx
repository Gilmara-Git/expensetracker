import { SignIn } from '@screens/SignIn';
import { SignUp } from '@screens/SignUp';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';


type AuthType = {
    signUp: undefined,
    signIn: undefined
}


export type AuthNavProps = NativeStackNavigationProp<AuthType>


const {Screen, Navigator} = createNativeStackNavigator<AuthType>();


export const AuthRoutes = ()=>{
   
    return (

        <Navigator screenOptions={{headerShown: false}}>
            <Screen name='signUp' component={SignUp}/>
            <Screen name='signIn' component={SignIn}/>
        </Navigator>
    )
};
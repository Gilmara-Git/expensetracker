import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import Toast from 'react-native-toast-message';
import { useUserContext } from '@hooks/useUserContext';


export const Routes = ()=>{
    const { user} = useUserContext();
    console.log(user, 'linha10 na index da rota', user.idToken)
    return (
        <NavigationContainer>
           { user.uid ? <AppRoutes/> : <AuthRoutes />} 
            <Toast/>
        </NavigationContainer>
    )
};
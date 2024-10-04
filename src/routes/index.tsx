import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';
import Toast from 'react-native-toast-message';
import { useUserContext } from '@hooks/useUserContext';


export const Routes = ()=>{
    const { user} = useUserContext();
  
    return (
        <NavigationContainer>
           { user.uid ? <AppRoutes/> : <AuthRoutes />} 
            <Toast/>
        </NavigationContainer>
    )
};
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';


export const Routes = ()=>{
    return (
        <NavigationContainer>
            <AuthRoutes />
        </NavigationContainer>
    )
};

import { View } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import { ManageExpense } from '../screens/ManageExpense';
import { PhotoMap} from '@screens/PhotoMap';
import { BottomTabRoutes } from './bottom-tab.routes';
import themes from '../theme/themes';

import { IconButton } from '@components/IconButton';
import { BottomTabTypes } from '@routes/bottom-tab.routes';
import { ExpIdType } from '@contexts/expensesContext';
import { MapViewScreen } from '@screens/MapViewScreen';


export type StackNavigatorTypes = {
    expensesOverview: BottomTabTypes,
    manageExpenses: { id: string  },
    photoMap: { id: ExpIdType , lat?: number , long?: number},
    mapViewScreen: { id: string ,latitude: number, longitude: number}

   
}

export type StackNavProps = NativeStackNavigationProp<StackNavigatorTypes>

const Stack = createNativeStackNavigator<StackNavigatorTypes>();


export const AppRoutes = ()=>{
    return (
    <Stack.Navigator screenOptions={{
        headerTitleStyle:  { fontFamily: themes.fonts.balsamiq_400, fontSize: 18},
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: themes.colors.yellow_1},
            headerTintColor: themes.colors.purple_1, 
            animation: 'fade_from_bottom'
    }}>
        <Stack.Screen name='expensesOverview' component={BottomTabRoutes} options={{ 
            headerTitle: 'Overall Expenses', 
            headerRight: ({tintColor})=> (
                <View style={{ flexDirection: 'row', gap:5, alignItems: 'center'}}>
                    <IconButton iconName='add' size={24} color={tintColor}/>
                    <IconButton iconName='exit' size={24} color={tintColor}/>
                </View>

            )
        }}/>
        <Stack.Screen name='manageExpenses' component={ManageExpense} options={{
            // headerTitle: 'Manage Expenses',
            presentation: 'modal',
            
               
        }}/>
         <Stack.Screen name='photoMap' component={PhotoMap} options={{
            // headerTitle: 'Manage Expenses',
            presentation: 'modal',
            
               
        }}/>

        <Stack.Screen  name='mapViewScreen' component={MapViewScreen} options={{
            // headerTitle: 'Manage Expenses',
            presentation: 'modal',
            
               
        }}/>
    </Stack.Navigator>)
};
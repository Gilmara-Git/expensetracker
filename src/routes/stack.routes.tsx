
import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import { ManageExpense } from '../screens/ManageExpense';
import { BottomTabRoutes } from './bottom-tab.routes';
import themes from '../theme/themes';

import { IconButton } from '@components/IconButton';
import { BottomTabTypes } from '@routes/bottom-tab.routes';
import  {  Ionicons } from '@expo/vector-icons'


export type StackNavigatorTypes = {
    expensesOverview: BottomTabTypes,
    manageExpenses: { id: string  }

   
}

export type StackNavProps = NativeStackNavigationProp<StackNavigatorTypes>

const Stack = createNativeStackNavigator<StackNavigatorTypes>();


export const StackRoutes = ()=>{
    return (
    <Stack.Navigator screenOptions={{
        headerTitleStyle:  { fontFamily: themes.fonts.balsamiq_400, fontSize: 18},
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: themes.colors.yellow_1},
            headerTintColor: themes.colors.purple_1, 
    }}>
        <Stack.Screen name='expensesOverview' component={BottomTabRoutes} options={{ 
            headerTitle: 'Overall Expenses', 
            headerRight: ({tintColor})=> (<IconButton iconName='add' size={24} color={tintColor}/>)
        }}/>
        <Stack.Screen name='manageExpenses' component={ManageExpense} options={{
            // headerTitle: 'Manage Expenses',
            presentation: 'modal',
            
               
        }}/>
    </Stack.Navigator>)
};
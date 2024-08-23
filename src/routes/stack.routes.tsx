
import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import { ManageExpense } from '../screens/ManageExpense';
import { BottomTabRoutes } from './bottom-tab.routes';
import themes from '../theme/themes';


type StackNavigatorTypes = {
    manageExpense: undefined
}

export type StackNavProps = NativeStackNavigationProp<StackNavigatorTypes>

const Stack = createNativeStackNavigator();



export const StackRoutes = ()=>{
    return (
    <Stack.Navigator>
        <Stack.Screen name='ExpensesOverview' component={BottomTabRoutes} options={{ 
            headerTitle: 'Overall Expenses', 
            headerStyle: { backgroundColor: themes.colors.yellow_2},
            headerTintColor: themes.colors.purple_1
            }}/>
        <Stack.Screen name='ManageExpense' component={ManageExpense}/>
    </Stack.Navigator>)
};
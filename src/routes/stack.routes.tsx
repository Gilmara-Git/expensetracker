
import { createNativeStackNavigator, NativeStackNavigationProp} from '@react-navigation/native-stack';
import { ManageExpense } from '../screens/ManageExpense';
import { BottomTabRoutes } from './bottom-tab.routes';


type StackNavigatorTypes = {
    manageExpense: undefined
}

export type StackNavProps = NativeStackNavigationProp<StackNavigatorTypes>

const Stack = createNativeStackNavigator();



export const StackRoutes = ()=>{
    return (
    <Stack.Navigator>
        <Stack.Screen name='ExpensesOverview' component={BottomTabRoutes}/>
        <Stack.Screen name='ManageExpense' component={ManageExpense}/>
    </Stack.Navigator>)
};
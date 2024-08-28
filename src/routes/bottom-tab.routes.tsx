import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { AllExpenses } from "../screens/AllExpenses";
import { RecentExpenses } from "../screens/RecentExpenses";
import  themes  from '../theme/themes';
import {MaterialCommunityIcons} from '@expo/vector-icons';

type BottomTabTypes = {
    allExpenses: undefined,
    recentExpenses: undefined,
}

export type BottomNavProps = BottomTabNavigationProp<BottomTabTypes>;

const { Navigator, Screen } = createBottomTabNavigator();


export const BottomTabRoutes = () => {
  return (
    <Navigator screenOptions={{ 
       headerShown: false,
        tabBarStyle: { 
            backgroundColor: themes.colors.yellow_1,    
        },
        tabBarActiveTintColor: themes.colors.purple_3, 
        }}>
      <Screen name ='recentExpenses' component={RecentExpenses} options={ {
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({ color, size })=>(
            <MaterialCommunityIcons name='shopping-search'color={color} size={size}/>
        ),
        
        
      }}/>
      <Screen name ='allExpenses' component={AllExpenses} 
      options={ {
        title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size })=> (
            <MaterialCommunityIcons name='shopping' color={color} size={size}/>
          ),
        
      }}/>
    </Navigator>
  );
};

import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";

import { AllExpenses } from "../screens/AllExpenses";
import { RecentExpenses } from "../screens/RecentExpenses";

type BottomTabTypes = {
    allExpenses: undefined,
    recentExpenses: undefined,
}

export type BottomNavProps = BottomTabNavigationProp<BottomTabTypes>;

const { Navigator, Screen } = createBottomTabNavigator();

export const BottomTabRoutes = () => {
  return (
    <Navigator>
      <Screen name ='recentExpenses' component={RecentExpenses} />
      <Screen name ='allExpenses' component={AllExpenses} />
    </Navigator>
  );
};


import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavProps } from '@routes/stack.routes';



import themes from '../../theme/themes';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';


// enum IconType {
//     MaterialCommunityIcons,
//     Ionicons,
//     FontAwesomeIcon

// }



type ExpenseItemProps ={
    category: string;
    amount: string;
    description: string;
    date: string;
    iconName?: keyof typeof MaterialCommunityIcons.glyphMap,
    iconSize: number;
    id: string;
    // iconType: string;
//     icon: { value: 
//         { type: IconType.MaterialCommunityIcons, name: keyof typeof MaterialCommunityIcons.glyphMap, color: string} |
//     { type: IconType.FontAwesomeIcon, name: keyof typeof FontAwesome.glyphMap , color: string} |
//     { type: IconType.Ionicons, name: keyof typeof Ionicons.glyphMap, color: string };
// size: number;
// }
};

enum Category {
  Apparel,
  Sports,
  Groceries
}


export const ExpenseItem =({category, description, amount, date, iconSize, id }:ExpenseItemProps) => {


  const navigation = useNavigation<StackNavProps>();

  const handleManageExpense = ()=>{
    navigation.navigate('manageExpenses', {id })
  };

  return (
    <Pressable style={({pressed})=> pressed && styles.pressed} onPress={handleManageExpense}>
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <LinearGradient
          colors={["#f2edf3", "#c199ea"]}
          style={styles.background}
        >
          <View style={styles.itemContainer}>
            <View style={styles.iconContainer}>
                {/* <MaterialCommunityIcons name={icon.iconName} size={16} color={themes.colors.yellow_1}/> */}
            
                { category === 'Apparel' && 
                <MaterialCommunityIcons  name='shopping' size={iconSize} color={themes.colors.yellow_1}/>
                }

                { category === 'Sports' && 
                 <MaterialIcons  name='sports' size={iconSize} color={themes.colors.yellow_1}/>
                }
            
                { category === 'Groceries' && 
                    <MaterialIcons  name='local-grocery-store' size={iconSize} color={themes.colors.yellow_1}/>
                    }
            </View>

            <View >
              <View style={styles.itemsContainerTop}>
                <View>

                <Text numberOfLines={1} style={styles.title}>
               {description}
                </Text>
                <Text style={styles.category}>{category}</Text>
                </View>
              </View>
            </View>

            <View >
              <View style={styles.itemsContainerBottom}>
                <Text numberOfLines={1} style={styles.title}>
               ${amount}
                </Text>
                <Text style={styles.category}>{date}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
    </Pressable>
  );
};

import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavProps } from "@routes/app.routes";
import { IconContainer } from "@components/IconContainer";

type ExpenseItemProps = {
  category: string;
  amount: string;
  description: string;
  date: string;
  iconSize: number;
  id: string;
  vendor_name: string
};

export const ExpenseItem = ({
  category,
  description,
  amount,
  date,
  iconSize,
  id,
  vendor_name

}: ExpenseItemProps) => {
  const navigation = useNavigation<StackNavProps>();

  const handleManageExpense = () => {
    navigation.navigate("manageExpenses", { id });
  };

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={handleManageExpense}
    >
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <LinearGradient
            colors={["#f2edf3", "#c199ea"]}
            style={styles.background}
          >
            <View style={styles.itemContainer}>
              <View>
                <IconContainer iconSize={iconSize} category={category} />
                <Text style={styles.vendor}>{vendor_name}</Text>
              </View>
              <View>
                <View style={styles.itemsContainerTop}>
                  <View>
                    <Text numberOfLines={1} style={styles.title}>
                      {description}
                    </Text>
                    <Text style={styles.category}>{category}</Text>
                  </View>
                </View>
              </View>

              <View>
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

import { useLayoutEffect } from "react";
import { View, Text} from "react-native";
import { styles } from "./styles";
import { StackNavProps } from "@routes/stack.routes";

import { IconButton } from "@components/IconButton";
import { Button } from "@components/Button";
import themes from "../../theme/themes";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useExpense } from "@hooks/useContext";
import { ExpIdType } from "@contexts/context";
import { LinearGradient } from "expo-linear-gradient";
import { InputForm } from '@components/InputForm';

export const ManageExpense = () => {
  const expContext = useExpense();

  const route = useRoute();
  const expId = route.params as ExpIdType;
  const navigation = useNavigation<StackNavProps>();

  const isEditing =  expId.id !== 'addExpense';
 

  useLayoutEffect(() => {
    //instead of setting headerTitle in the route, set it hear conditionally
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const handleConfirm = () => {
    if(isEditing){
      expContext.updateExpense(
        expId,
        {
          description: 'Sneaker',
          amount: 71.00,
          date: new Date('2024-08-31'),
          category: 'Apparel',

        }

       
        
      );
    }else{
      expContext.addExpense({
        description: 'Skate',
        amount: 79.00,
        date: new Date('2024-09-03'),
        category: 'Sports',
      })
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleDelete = (id: ExpIdType) => {
    expContext.deleteExpense(id);
    navigation.goBack();
  };

  return (
       <LinearGradient  colors={["#f2edf3", "#c199ea"]}
          style={styles.background}>
          <View style={styles.form}>
                  <InputForm  expenseId={expId} isEditing={isEditing}/>
          </View>

      
  
      </LinearGradient>
  );
};

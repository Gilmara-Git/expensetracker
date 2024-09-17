import { useLayoutEffect } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { StackNavProps } from "@routes/stack.routes";

import { useNavigation, useRoute } from "@react-navigation/native";
import { useExpense } from "@hooks/useContext";
import { ExpIdType } from "@contexts/context";
import { LinearGradient } from "expo-linear-gradient";
import { InputForm } from "@components/InputForm";
import { FormData } from "@components/InputForm";
import { storeExpenseInDB, updateExpenseInDB, deleteExpenseInDB } from "@services/apiDatabase";


export const ManageExpense = () => {
  const expContext = useExpense();

  const route = useRoute();
  const expId = route.params as ExpIdType;
  const navigation = useNavigation<StackNavProps>();

  const isEditing = expId.id !== "addExpense";

  
  const handleConfirm = async (fields: FormData) => {
    const expense = {
      description: fields.description,
      amount: Number(fields.amount),
      date: new Date(fields.date),
      category: fields.category,
    };
    
    if (isEditing) {
      try{
        expContext.updateExpense(expId, expense);
        await updateExpenseInDB(expId.id, expense);
        
        
      }catch(error){
        console.log(error)
      }finally{
        navigation.goBack();
        
      }
    } else {
      try {
        const id = await storeExpenseInDB(expense);
        expContext.addExpense({...expense, id: id});
        
      } catch (error) {
        console.log(error);
      } finally {
        navigation.goBack();
      }
    }
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const handleDelete = async(expId: ExpIdType) => {
    try{
      await deleteExpenseInDB(expId.id);
      expContext.deleteExpense(expId);
      
      
    }catch(error){
      console.log(error)
    }finally{
      navigation.goBack();
      
    }
    
  };
  useLayoutEffect(() => {
    //instead of setting headerTitle in the route, set it hear conditionally
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);
  
  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      <View style={styles.form}>
        <InputForm
          onDeleteExp={handleDelete}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          expenseId={expId}
          isEditing={isEditing}
        />
      </View>
    </LinearGradient>
  );
};

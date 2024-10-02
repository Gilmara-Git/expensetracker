import { useLayoutEffect , useState} from "react";
import { View } from "react-native";
import { styles } from "./styles";

import { Loading} from '@components/Loading';
import { useExpense } from '@hooks/useExpensesContext';
import { ExpIdType } from "@contexts/expensesContext";
import { FormData } from "@components/InputForm";
import { InputForm } from "@components/InputForm";
import { LinearGradient } from "expo-linear-gradient";
import { ErrorOverlay } from "@components/ErrorOverlay";

import { storeExpenseInDB, updateExpenseInDB, deleteExpenseInDB } from "@services/apiDatabase";

import { StackNavProps } from "@routes/app.routes";
import { useNavigation, useRoute } from "@react-navigation/native";



export const ManageExpense = () => {
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ isErrorMessage, setIsErrorMessage ] = useState('');
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
      setIsSubmitting(true);
      try{
        expContext.updateExpense(expId, expense);
        await updateExpenseInDB(expId.id, expense);
        setIsSubmitting(false);
        
        
      }catch(error){
        console.log(error)
      }finally{
        navigation.goBack();
        
      }
    } else {
      setIsSubmitting(true);
      try {
        const id = await storeExpenseInDB(expense);
        expContext.addExpense({...expense, id: id});
        
      } catch (error) {
        setIsErrorMessage('Could not add expense, try again later.')
        console.log(error);
      } finally {
        setIsSubmitting(false); //
        navigation.goBack();
      }
    }
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const handleDelete = async(expId: ExpIdType) => {
    setIsSubmitting(true);
    try{
      await deleteExpenseInDB(expId.id);
      expContext.deleteExpense(expId);
      navigation.goBack();
      
    }catch(error){
      setIsErrorMessage('Error deleting expenses.')
      console.log(error)
    }
    setIsSubmitting(false); 
    
  };

  const handleClearErrorMessage = ()=>{
    setIsErrorMessage('');
  };

  useLayoutEffect(() => {
    //instead of setting headerTitle in the route, set it here conditionally
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  if(isErrorMessage && !isSubmitting){
    return <ErrorOverlay message={isErrorMessage} onConfirm={handleClearErrorMessage}/>
  }
  
  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      <View style={styles.form}>
        { isSubmitting ? <Loading/> :
        <InputForm
          onDeleteExp={handleDelete}
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          expenseId={expId}
          isEditing={isEditing}
        />
        
      }
      </View>
    </LinearGradient>
  );
};

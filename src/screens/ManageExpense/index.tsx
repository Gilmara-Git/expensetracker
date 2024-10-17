import { useLayoutEffect , useState, useEffect} from "react";
import { View, Alert } from "react-native";
import { styles } from "./styles";

import { Loading} from '@components/Loading';
import { useExpense } from '@hooks/useExpensesContext';
import { ExpIdType } from "@contexts/expensesContext";
import { useUserContext } from "@hooks/useUserContext";
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
  const [ tokenExpired, setTokenExpired ] = useState(false);
  const expContext = useExpense();
  const userContext = useUserContext();

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
      try {
        setIsSubmitting(true);
        const id = await storeExpenseInDB(expense);
        expContext.addExpense({...expense, id: id});
        navigation.goBack();
        
      } catch (error: any) {
        if(error.response?.status === 401 && error.response.data.error === 'Permission denied'){
         
          setIsErrorMessage('You do not have permission to add Expenses. Try again later' )
          setTokenExpired(true)
        }else {
          setIsErrorMessage('An error occurred during fetching expenses.')

        }

        if(error.response){
          console.log('CAUGHT_API_REQUEST_AddingExpense Data=>',error.response.data);
          console.log('CAUGHT_API_REQUEST_AddingExpense Status=>',error.response.status);
          console.log('CAUGHT_API_REQUEST_AddingExpense Headers=>',error.response.headers);
  
        }else if(error.request){
          console.log('CAUGHT_API_REQUEST_AddingExpense Request=>',error.request)
  
        }else{
          console.log('CAUGHT_API_REQUEST_AddingExpense Error Message=>',error.message);
        }
        console.log('CAUGHT_API_REQUEST_EAddingExpense Error Config=>',error.config);
        
        setIsSubmitting(false); 
      } 
    
    }
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const handleDelete = async(expId: ExpIdType) => {
    const deleteExpense = async()=>{
      setIsSubmitting(true);
      await deleteExpenseInDB(expId.id);
      expContext.deleteExpense(expId);
      navigation.goBack();
  
    }
    
    try{
      Alert.alert('Delete Expense','Do you want to remove this expense?',[
     { text: 'No', onPress: handleCancel},{ text: 'Yes', style: 'destructive', onPress: deleteExpense }])

      
    }catch(error:any){
      if(error.response?.status === 401 && error.response.data.error === 'Permission denied'){
         
        setIsErrorMessage('You do not have permission to delete Expenses. Try again later' )
      }else {
        setIsErrorMessage('An error occurred during fetching expenses.')

      }

      if(error.response){
        console.log('CAUGHT_API_REQUEST_AddingExpense Data=>',error.response.data);
        console.log('CAUGHT_API_REQUEST_AddingExpense Status=>',error.response.status);
        console.log('CAUGHT_API_REQUEST_AddingExpense Headers=>',error.response.headers);

      }else if(error.request){
        console.log('CAUGHT_API_REQUEST_AddingExpense Request=>',error.request)

      }else{
        console.log('CAUGHT_API_REQUEST_AddingExpense Error Message=>',error.message);
      }
      console.log('CAUGHT_API_REQUEST_EAddingExpense Error Config=>',error.config);
      // setIsErrorMessage('Error deleting expenses.')
      console.log(error)
    }
    setIsSubmitting(false); 
    
  };

  const handleClearErrorMessage = ()=>{
    setIsErrorMessage('');
  };

  const handleSignOut = ()=>{
    userContext.signOut()
  };

  useLayoutEffect(() => {
    //instead of setting headerTitle in the route, set it here conditionally
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  if(isErrorMessage && !isSubmitting){
    return <ErrorOverlay  permissionExpired={tokenExpired} 
                          message={isErrorMessage} 
                          onConfirm={handleClearErrorMessage}
                          onTokenExpired={handleSignOut}
                          />
  }

  useEffect(()=>{
    if(tokenExpired){
      setTimeout(()=>{
        handleSignOut();
      },4000)
    }
  },[tokenExpired])
  
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

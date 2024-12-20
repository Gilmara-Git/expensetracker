import { useEffect, useState } from 'react';
import { View } from "react-native";


import { styles } from "./styles";
import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { Loading } from '@components/Loading';
import { useExpense } from '@hooks/useExpensesContext';
import { useUserContext } from '@hooks/useUserContext';
import { getExpensesFromDB } from '@services/apiDatabase';
import { ErrorOverlay } from '@components/ErrorOverlay';

import { AuthNavProps } from '@routes/auth.routes';
import { useNavigation } from "@react-navigation/native";


export const AllExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [ isErrorMessage, setIsErrorMessage] = useState<string>('');
  const [ tokenExpired, setTokenExpired ] = useState(false);

  const expContext = useExpense();
  const userContext = useUserContext();
  const navigation = useNavigation<AuthNavProps>();

  const handleClearErrorMessage = ()=>{
    setIsErrorMessage('');
  }

  const handleSignOut = ()=>{
    userContext.signOut()
  };

useEffect(()=>{
  const fetchExpenses = async()=>{
    setIsFetching(true);
    try{
      const expenses = await getExpensesFromDB();
      expContext.setExpenses(expenses);
      
    }catch(error:any){
      if(error.response?.status === 401 && error.response.data.error === 'Permission denied'){
        setTokenExpired(true);
        setIsErrorMessage('Session expired. Sign out and Sign in again to see your expenses.')
       
      }else {
        setIsErrorMessage('An error occurred during fetching expenses.')

      }

    }
    setIsFetching(false);
  }

  fetchExpenses();

},[]);


useEffect(()=>{
  if(tokenExpired){
    setTimeout(()=>{
      handleSignOut();
      navigation.navigate("signIn");
      
    },4000)
  }
},[tokenExpired])


  if(isErrorMessage && !isFetching){
    return <ErrorOverlay 
      message={isErrorMessage} 
      permissionExpired={tokenExpired}
      onConfirm={handleClearErrorMessage} 
      onTokenExpired={handleSignOut}/>
  }

  
  return (
    <View style={styles.container}>
      { isFetching ? <Loading /> : 
      <>
      <ExpensesSummary periodName="Total" expensesList={expContext.expenses} />
      <ExpensesOutput data={expContext.expenses} />
      </>
      
      }
    </View>
  );
};

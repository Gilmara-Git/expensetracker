import { useEffect, useState } from 'react';
import { View } from "react-native";


import { styles } from "./styles";
import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { Loading } from '@components/Loading';
import { useExpense } from '@hooks/useContext';
import { getExpensesFromDB } from '@services/apiDatabase';
import { ErrorOverlay } from '@components/ErrorOverlay';


export const AllExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [ isErrorMessage, setIsErrorMessage] = useState<string>('');
  const expContext = useExpense();

  const handleClearErrorMessage = ()=>{
    setIsErrorMessage('');
  }

useEffect(()=>{
  const fetchExpenses = async()=>{
    setIsFetching(true);
    try{
      const expenses = await getExpensesFromDB();
      console.log(expenses, 'expenses')
      expContext.setExpenses(expenses);
      
    }catch(error){
      setIsErrorMessage('An error occurred during fetching expenses.')
      console.log(error)
    }
    setIsFetching(false);
  }

  fetchExpenses();

},[])


  if(isErrorMessage && !isFetching){
    return <ErrorOverlay message={isErrorMessage} onConfirm={handleClearErrorMessage}/>
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

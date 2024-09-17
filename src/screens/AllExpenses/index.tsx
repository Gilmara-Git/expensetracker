import { useEffect, useState } from 'react';
import { View } from "react-native";

import { styles } from "./styles";
import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { Loading } from '@components/Loading';
import { useExpense } from '@hooks/useContext';
import { getExpensesFromDB } from '@services/apiDatabase';


export const AllExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const expContext = useExpense();

useEffect(()=>{
  const fetchExpenses = async()=>{
    setIsFetching(true);
     const expenses = await getExpensesFromDB();
     expContext.setExpenses(expenses);
     setIsFetching(false);
  }

  fetchExpenses();

},[])

  
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

import { useEffect } from 'react';
import { View } from "react-native";

import { styles } from "./styles";
import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { useExpense } from '@hooks/useContext';
import { getExpensesFromDB } from '@services/apiDatabase';


export const AllExpenses = () => {
  const expContext = useExpense();

useEffect(()=>{
  console.log('Cheguei no All Expenses')
  const fetchExpenses = async()=>{
     const expenses = await getExpensesFromDB();
     expContext.setExpenses(expenses)
  }

  fetchExpenses();

},[])

  
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName="Total" expensesList={expContext.expenses} />
      <ExpensesOutput data={expContext.expenses} />
    </View>
  );
};

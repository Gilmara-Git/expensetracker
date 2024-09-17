import { useEffect } from 'react';
import { View } from "react-native";
import { styles } from "./styles";

import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { useExpense } from '@hooks/useContext';


import  {getRecentPastDays } from '@utils/getLast7days';
import { expenseType } from '@contexts/context';
import  { getExpensesFromDB }  from '@services/apiDatabase';



export const RecentExpenses = () => {
  const expContext = useExpense();



  const recentExpenses =  expContext.expenses.filter((expense: expenseType)=>{ 
    const today = new Date();
    const sevenDaysAgo = getRecentPastDays(today, 7);
    
    return (expense.date >= sevenDaysAgo) && (expense.date <= today);
  })

  
  useEffect(()=>{
  
    const fetchExpenses = async()=>{
       const expenses = await getExpensesFromDB();  
       expContext.setExpenses(expenses);

    }
  
    fetchExpenses();
  
  },[])
  


  return (
    <View style={styles.container}>
      <ExpensesSummary periodName="Last 7 Days" expensesList={recentExpenses} />
      <ExpensesOutput data={recentExpenses} />
    </View>
  );
};

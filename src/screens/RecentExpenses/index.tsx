import { useEffect , useState } from 'react';
import { View } from "react-native";
import { styles } from "./styles";

import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { useExpense } from '@hooks/useContext';


import  {getRecentPastDays } from '@utils/getLast7days';
import { expenseType } from '@contexts/context';
import  { getExpensesFromDB }  from '@services/apiDatabase';
import { Loading } from '@components/Loading';



export const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);

  const expContext = useExpense();

  const recentExpenses =  expContext.expenses.filter((expense: expenseType)=>{ 
    const today = new Date();
    const sevenDaysAgo = getRecentPastDays(today, 7);
    
    return (expense.date >= sevenDaysAgo) && (expense.date <= today);
  })

  
  useEffect(()=>{
    const fetchExpenses = async()=>{
      setIsFetching(true)
       const expenses = await getExpensesFromDB();  
       expContext.setExpenses(expenses);
       setIsFetching(false)

    }
  
    fetchExpenses();
  
  },[])
  


  return (
    <View style={styles.container}>
    { isFetching ? <Loading/> :
      <>
      <ExpensesSummary periodName="Last 7 Days" expensesList={recentExpenses} />
      <ExpensesOutput data={recentExpenses} />
      </>
    }
      </View>
  );
};

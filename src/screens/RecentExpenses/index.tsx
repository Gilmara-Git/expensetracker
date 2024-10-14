import { useEffect , useState } from 'react';
import { View } from "react-native";
import { styles } from "./styles";

import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { useExpense } from '@hooks/useExpensesContext';


import  {getRecentPastDays } from '@utils/getLast7days';
import { expenseType } from '@contexts/expensesContext';
import  { getExpensesFromDB }  from '@services/apiDatabase';
import { Loading } from '@components/Loading';
import { ErrorOverlay } from '@components/ErrorOverlay';



export const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [isErrorMessage, setIsErrorMessage] = useState('');

  const expContext = useExpense();

  const recentExpenses =  expContext.expenses.filter((expense: expenseType)=>{ 
    const today = new Date();
    const sevenDaysAgo = getRecentPastDays(today, 7);
    
    return (expense.date >= sevenDaysAgo) && (expense.date <= today);
  })


  const handleClearErrorMessage = ()=>{
    setIsErrorMessage('')
  }
  
  useEffect(()=>{
    const fetchExpenses = async()=>{
      setIsFetching(true);
      try{
        const expenses = await getExpensesFromDB();  
        expContext.setExpenses(expenses);

      }catch(error:any){
        if(error.response?.status === 401 && error.response.data.error === 'Permission denied'){
          setIsErrorMessage('You do not have permission to see the expenses. Logout and Login again.')
        }else {
          setIsErrorMessage('An error occurred during fetching expenses.')

        }


        if(error.response){
          console.log('CAUGHT_API_REQUEST_ERROR_EXPENSES Data=>',error.response.data);
          console.log('CAUGHT_API_REQUEST_ERROR_SIGNUP_EXPENSES Status=>',error.response.status);
          console.log('CAUGHT_API_REQUEST_ERROR_EXPENSES Headers=>',error.response.headers);
  
        }else if(error.request){
          console.log('CAUGHT_API_REQUEST_ERROR_EXPENSES Request=>',error.request)
  
        }else{
          console.log('CAUGHT_API_REQUEST_ERROR_EXPENSES Error Message=>',error.message);
        }
        console.log('CAUGHT_API_REQUEST_ERROR_EXPENSES Error Config=>',error.config);
       
      }
       setIsFetching(false)

    }
  
    fetchExpenses();
  
  },[])
  
  if(isErrorMessage && !isFetching){
    return <ErrorOverlay message={isErrorMessage} onConfirm={handleClearErrorMessage}/>
  }

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

import axios, { AxiosInstance } from 'axios';
import { expenseType } from '@contexts/context';

export const realtimeDB = axios.create({
    baseURL: 'https://expensetracker-61054-default-rtdb.firebaseio.com/'
}) as AxiosInstance;


export const storeExpenseInDB = async (expense: Omit<expenseType, 'id'>)=>{
   const response =  await realtimeDB.post('/expenses.json', expense);
   const id = response.data.name;
   return id;

};


export const getExpensesFromDB = async()=>{

        const response = await realtimeDB.get('/expenses.json');
        const expenses = [];
      
        
        for(const key in response.data){
            const ObjExpense = {
                id: key,
                amount: response.data[key].amount,
                description: response.data[key].description,
                category: response.data[key].category,
                date: new Date(response.data[key].date)
            }
           
            expenses.push(ObjExpense)
        }
        
        return expenses;
    
}

export const updateExpenseInDB = async(id:string, expense: Omit<expenseType, 'id'>)=>{
      await realtimeDB.put(`/expenses/${id}.json`,  expense);

};

export const deleteExpenseInDB = (id:string)=>{
    return realtimeDB.delete(`/expenses/${id}.json`);
};
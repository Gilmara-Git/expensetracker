import axios, { AxiosInstance } from 'axios';
import { expenseType } from '@contexts/expensesContext';
import { getTokenStorage } from '@storage/tokenStorage';
// import  { useUserContext} from '@hooks/useUserContext';


export const realtimeDB = axios.create({
    baseURL: 'https://expensetracker-61054-default-rtdb.firebaseio.com/'
}) as AxiosInstance;


export const storeExpenseInDB = async (expense: Omit<expenseType, 'id'>)=>{
    const {token} = await getTokenStorage();

    const response =  await realtimeDB.post(`/expenses.json?auth=${token}`, expense);
    const id = response.data.name;
    return id;
    
};


export const getExpensesFromDB = async()=>{
    const {token} = await getTokenStorage();
        // It is not possible to call the hook here because hooks need to be called from within a JSX element/function
        //So we are using the token stored in the device
        // const { user } = useUserContext()
        // console.log(user)
       
        const response = await realtimeDB.get(`/expenses.json?auth=${token}`);
        const expenses = [];
      
        
        for(const key in response.data){
            const ObjExpense = {
                id: key,
                amount: response.data[key].amount,
                description: response.data[key].description,
                category: response.data[key].category,
                date: new Date(response.data[key].date),
                vendor_name: response.data[key].vendor_name
            }
           
            expenses.push(ObjExpense)
        }
        
        return expenses;
    
}

export const updateExpenseInDB = async(id:string, expense: Omit<expenseType, 'id'>)=>{
      const {token} = await getTokenStorage();

      await realtimeDB.put(`/expenses/${id}.json?auth=${token}`,  expense);

};

export const deleteExpenseInDB =  async(id:string)=>{
    const {token} = await getTokenStorage();
    return realtimeDB.delete(`/expenses/${id}.json?auth=${token}`);
};
import { createContext, ReactNode, useReducer , useEffect } from "react";


export type ExpIdType = {
    id: string
}


type ExpensesCtxProviderType = {
  children: ReactNode;
};

export type expenseType = {
    id: ExpIdType | string,
    description: string,
    amount: number, 
    date: Date,
    category: string
}

export const ExpensesCtx = createContext({
  expenses: [],
  addExpense: (
    expense: expenseType) => {},
  deleteExpense: (id: ExpIdType) => {},
  updateExpense: (
    id: ExpIdType, expense: Omit<expenseType, 'id'>
  ) => {},
  setExpenses: (expenses: expenseType[])=>{}
});

// const initialState = [
//     {
//         id: 'Exp-' + Math.floor(Math.random() * 1000000),
//         description: 'Shin guards',
//         amount: 22.38,
//         date: new Date('2024-08-29'),
//         category: 'Sports'
//     },
//     {
//         id: 'Exp-' + Math.floor(Math.random() * 1000000),
//         description: 'Rolling blades',
//         amount: 22.38,
//         date: new Date('2024-08-28'),
//         category: 'Sports'
//     },
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'Soccer Ball',
//       amount: 42.50,
//       date: new Date(),
//       category: 'Sports'
//   },
  
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'Bread',
//       amount: 7.50,
//       date: new Date('2024-08-26'),
//       category: 'Groceries'
//   },
  
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'A pair of sandals',
//       amount: 59.00,
//       date: new Date('2024-08-24'),
//       category: 'Apparel'
//   },
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'T-shirt',
//       amount: 59.45,
//       date: new Date('2024-08-21'),
//       category: 'Apparel'
//   },
  
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'Snow boots',
//       amount: 59.00,
//       date: new Date('2024-08-20'),
//       category: 'Sports'
//   },
  
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'Bicycle',
//       amount: 59.00,
//       date: new Date('2024-08-25'),
//       category: 'Sports'

//   },
  
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'Vegetables',
//       amount: 59.00,
//       date: new Date('2024-08-26'),
//       category: 'Groceries'
//   },
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'Bicycle',
//       amount: 159.00,
//       date: new Date('2024-08-20'),
//       category: 'Sports'
//   },
//   {
//       id: 'Exp-' + Math.floor(Math.random() * 1000000),
//       description: 'A pair of shoes',
//       amount: 59.00,
//       date: new Date('2024-08-23'),
//       category: 'Apparel'

//   },
  
// ]
const initialState =  [{}];


const expenseReducer = (state: any, action: any)=>{
    switch(action.type){
        case 'SET':
         const invertDateOrder = action.payload.reverse();
         return invertDateOrder;  
        case 'ADD': 
        const currentExpenses = [...state];
        return [action.payload  , ...currentExpenses];
        case 'UPDATE':
            const expIndex = state.findIndex((expense:expenseType) => expense.id === action.payload.id.id);
            const expense = state[expIndex]
            const updatedExpense = {...expense, ...action.payload.data}
            const updateExpenseStateArray = [...state];
            updateExpenseStateArray[expIndex] = updatedExpense;
            return updateExpenseStateArray;
        case 'DELETE':
            const expenses = [...state];
            const filteredExpenses = expenses.filter(exp => exp.id !== action.payload.id);
            return filteredExpenses
        default: return state;
    }
}
export const ExpensesCtxProvider = ({ children }: ExpensesCtxProviderType) => {

    const [expensesState, dispatch] = useReducer(expenseReducer, initialState);

    const addExpense =(expenseData: Omit<expenseType, 'id'>)=>{
        dispatch( {type: 'ADD', payload: expenseData})
    };


    const updateExpense =(id: ExpIdType, expenseData: Omit<expenseType, 'id'>)=>{ 
        dispatch( {type: 'UPDATE', payload: { id: id, data: expenseData }})
    };

    const deleteExpense =(id: ExpIdType)=>{
        dispatch( {type: 'DELETE', payload: id})
    };

    const setExpenses = (expenses:expenseType[] )=>{
        dispatch({type: 'SET', payload: expenses})
    }

  

    const value ={
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense,
        setExpenses: setExpenses

    }

  return <ExpensesCtx.Provider value={value}>{children}</ExpensesCtx.Provider>;
};

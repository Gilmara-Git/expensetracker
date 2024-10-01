import { useContext } from "react";
import { ExpensesCtx } from '@contexts/expensesContext';

export const useExpense = ()=>{
    const context = useContext(ExpensesCtx);
    return context;
}
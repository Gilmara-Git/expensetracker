import { useContext } from "react";
import { ExpensesCtx } from '@contexts/context';

export const useExpense = ()=>{
    const context = useContext(ExpensesCtx);
    return context;
}
import { useMemo, useState } from 'react';
import { View } from "react-native";
import { data } from "@utils/data";
import { styles } from "./styles";
import { ExpensesSummary } from "@components/ExpensesSummary";
import { ExpensesOutput } from "@components/ExpensesOutput";
import { useExpense } from '@hooks/useContext';


export const AllExpenses = () => {

  const expContext = useExpense();
  
  return (
    <View style={styles.container}>
      <ExpensesSummary periodName="Total" expensesList={expContext.expenses} />
      <ExpensesOutput data={expContext.expenses} />
    </View>
  );
};

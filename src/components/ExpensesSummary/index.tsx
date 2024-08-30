import { View, Text } from "react-native";
import { styles } from "./styles";

export type ExpensesList = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: string;
}[];

export type ExpensesProps = {
  periodName: string;
  expensesList: ExpensesList;
};

export const ExpensesSummary = ({
  periodName,
  expensesList,
}: ExpensesProps) => {

  const sum = expensesList.reduce((current, expense) => {
    return current + expense.amount;
  }, 0);

  return (
  

    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${sum.toFixed(2)}</Text>
    </View>
  
  );
};

import { View , Text } from 'react-native';
import { styles } from './styles';

type ExpensesSummaryProps = {
    periodName: string;
    expensesList: {
        id: string,
        description: string,
        amount: number,
        date: Date
        category: string

    }[];
}



export const ExpensesSummary = ({ periodName, expensesList }:ExpensesSummaryProps)=>{
    
    const sum =  expensesList.reduce((current, expense)=>{
        return current + expense.amount
    },0);
    
    
    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${sum}</Text>

        </View>
    )
};
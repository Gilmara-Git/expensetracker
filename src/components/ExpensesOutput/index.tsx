import { FlatList , View, Text } from "react-native";
import { ExpenseItem } from "@components/ExpenseItem";
import { ExpensesList } from "@components/ExpensesSummary";
import { dateFormat } from "@utils/dateFormat";
import { styles} from './styles';

type ExpensesOutputProps = {
  data: ExpensesList;
};

export const ExpensesOutput = ({ data }: ExpensesOutputProps) => {

// data.map(expense => {console.log(dayjs(expense.date).add(1, 'day').format('MM/DD/YY'))})
// console.log(dayjs('2018-05-05').locale('en-us').format('MM/DD/YY'))

// const d = new Date('2024-8-26')
// console.log(dayjs(d))


// console.log(dayjs('2024-08-12').format('MM/DD/YY'))
// const today = new Date('2024-08-12');
// console.log(today.getUTCDate());


  return (
  
      <FlatList
      contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => (
          <ExpenseItem
            category={item.category}
            description={item.description}
            amount={item.amount.toFixed(2)}
            date={dateFormat(item.date)}
            iconName="shopping"
            iconSize={18}
            id={item.id}
          />
        )}
        ListEmptyComponent={()=>
          <View style={styles.listEmpty}>
          <Text style={styles.fallback}>There are no items to display!</Text>
          </View>}
      />
    
  );
};

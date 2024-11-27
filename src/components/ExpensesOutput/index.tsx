import { FlatList , View, Text } from "react-native";
import { ExpenseItem } from "@components/ExpenseItem";
import { ExpensesList } from "@components/ExpensesSummary";
import { dateFormat } from "@utils/dateFormat";
import { styles} from './styles';

type ExpensesOutputProps = {
  data: ExpensesList;
};

export const ExpensesOutput = ({ data }: ExpensesOutputProps) => {


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
            amount={item.amount?.toFixed(2)}
            date={dateFormat(item.date)}
            iconSize={18}
            id={item.id}
            vendor_name={item.vendor_name}
          />
        )}
        ListEmptyComponent={()=>
          <View style={styles.listEmpty}>
          <Text style={styles.fallback}>There are no expenses yet!</Text>
          </View>}
      />
    
  );
};

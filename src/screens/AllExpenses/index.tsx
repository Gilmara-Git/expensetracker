import { View, FlatList} from 'react-native';
import { data } from '@utils/data';
import { styles } from './styles';
import { ExpenseItem } from '@components/ExpenseItem';
import dayjs from 'dayjs'

export const AllExpenses = ()=>{
    return (<View style={styles.container}>
         <FlatList 
            contentContainerStyle={{ }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item)=>item.id} 
            data={data} 
            renderItem={({item})=>
                

                <ExpenseItem 
                    category={item.category} 
                    description={item.description} 
                    amount={item.amount.toFixed(2)}
                    date={dayjs(item.date).format('MM/DD/YY')} 
                    iconName='shopping'
                    iconSize={18}
                   
                    />
        
        
        }/>
    </View>)
};
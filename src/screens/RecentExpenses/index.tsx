import { View, FlatList } from 'react-native';
import { styles } from './styles';
import { ExpenseItem } from '@components/ExpenseItem';
import { ExpensesSummary } from '@components/ExpensesSummary';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import themes from '../../theme/themes';
import { data } from '@utils/data';
import dayjs from 'dayjs';

const icon = {
   value: {
       type: 'icon',
       name: 'purse',
       color: themes.colors.green_1,
   }, 
   size: 16
    
}


export const RecentExpenses = ()=>{
    return (
    <View style={styles.container}>
         <ExpensesSummary periodName='Total' expensesList={data}/>
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
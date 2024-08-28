import { View, FlatList } from 'react-native';
import { styles } from './styles';
import { ExpenseItem } from '@components/ExpenseItem';
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

data.map((exp)=>{console.log(exp);})



export const RecentExpenses = ()=>{
    return (
    <View style={styles.container}>
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
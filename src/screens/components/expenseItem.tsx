import { View, Text } from 'react-native';
import { data } from '../../utils/data';
import dayjs from 'dayjs';



export const ExpenseItem = ()=>{
    return (
        <View>
            { data.map(exp => <Text key={exp.id}>{dayjs(exp.date).format('MM/DD/YYYY')}</Text>)}
        </View>
    )
}
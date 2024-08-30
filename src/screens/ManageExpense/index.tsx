import { useLayoutEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavProps } from '@routes/stack.routes';



type manageExpenseParams = { id: string}

export const ManageExpense = ()=>{
    const route = useRoute();
    const  expId  = route.params as manageExpenseParams;
    const navigation = useNavigation<StackNavProps>();

   const headerTitle =  expId?.id === 'addExpense' ? 'Add Expense' : 'Edit Expense';

 
    
    useLayoutEffect(()=>{
        //instead of setting headerTitle in the route, set it hear conditionally
        navigation.setOptions({
         title: headerTitle
        });

   },[navigation, headerTitle])
    return (
    <View style={styles.container}>
        <Text>Manage Expense</Text>
    </View>)
};
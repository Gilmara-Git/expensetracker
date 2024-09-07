import { useState } from "react";
import { View,  Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@components/Button";
import { styles } from "./styles";
import { SelectList } from "react-native-dropdown-select-list";

import { Input } from "@components/Input";
import themes from "../../theme/themes";
import { IconContainer } from "@components/IconContainer";
import { IconButton } from "@components/IconButton";
import { useExpense } from "@hooks/useContext";
import { useNavigation } from "@react-navigation/native";

import { StackNavProps } from "@routes/stack.routes";
import { ExpIdType } from "@contexts/context";
import { expenseType } from "@contexts/context";
import { dateFormat } from "@utils/dateFormat";

type FormData = {
  amount: string;
  description: string;
  date: string;
  category: string;
};

const selectListData = [
  { key: 1, value: "Apparel" },
  { key: 2, value: "Sports" },
  { key: 3, value: "Groceries" },
];

type inputFormProps = {
  isEditing: boolean;
  expenseId: ExpIdType;
};

export const InputForm = ({ isEditing, expenseId }: inputFormProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const expContext = useExpense();
  const navigation = useNavigation<StackNavProps>();

  const expToEdit:any = expContext.expenses.find((exp:expenseType) => (exp.id === expenseId.id));
 

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: isEditing && expToEdit ?  expToEdit.amount.toString() : "",
      description: isEditing && expToEdit ?  expToEdit.description : "",
      date: isEditing ? dateFormat(expToEdit.date) : "",
    },
  });
  
  const handleConfirm = (fields: FormData) => {
    const expense = {
      description: fields.description,
      amount: Number(fields.amount),
      date: new Date(fields.date),
      category: fields.category
    }


    if (isEditing) {
      expContext.updateExpense(expenseId, expense);
    } else {
      expContext.addExpense(expense);
    }
    navigation.goBack();
  };
  
  const handleCancel = () => {
    navigation.goBack();
  };
  
  const handleDelete = (id: ExpIdType) => {
    expContext.deleteExpense(id);
    navigation.goBack();
  };
  

  const submit = ( fields: FormData)=>{
 
    const catIndex = selectListData.findIndex(exp => exp.key === Number(selectedCategory))
    console.log(catIndex)
    console.log(selectListData[catIndex].value)
    fields.category = selectListData[catIndex].value
    console.log(fields)

    handleConfirm(fields);
}

  return (
    <>
    <View style={styles.container}>
      <View style={{ flexDirection:'row',justifyContent: 'center',alignItems: 'center'}}>
          <IconContainer iconSize={16} category='Sports'/>

      </View>
      
      
      <View style={styles.group}>
        <View>
          <Controller
            control={control}
            rules={{ required: "Type the amount" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
              label="Amount"
              placeholder="76.99"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              multiline={false}
              />
            )}
            name="amount"
            />
          {errors.amount && <Text>Amount is a required field</Text>}
        </View>

        <View>
          <Controller
            control={control}
            rules={{ required: "Type the date in the suggested format" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
              label="Date"
              placeholder="YYYY-MM-DD"
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              multiline={false}
              />
            )}
            name="date"
            />
          {errors.date && <Text>Date is a required field</Text>}
        </View>
      </View>

      <SelectList
        defaultOption={{ key:2, value: 'Sports'}}
        setSelected={(value: string) => setSelectedCategory(value)}
        data={selectListData}
        // onSelect={handleSelected}
        placeholder="Select a category"
        fontFamily={themes.fonts.balsamiq_400}
        inputStyles={{ color: themes.colors.purple_1, fontSize: 14 }}
        dropdownTextStyles={{ color: themes.colors.purple_1, fontSize: 14 }}
        dropdownStyles={{
          borderWidth: 0,
          backgroundColor: themes.colors.light_white,
        }}
        boxStyles={{
          borderWidth: 0,
          backgroundColor: themes.colors.light_white,
        }}
        maxHeight={140}
        arrowicon={
          <IconButton
          disabled
          iconName="arrow-down-sharp"
          size={18}
          color={themes.colors.purple_1}
          />
        }
        closeicon={
          <IconButton
          disabled
          iconName="close"
          size={18}
          color={themes.colors.purple_1}
          />
        }
        searchicon={
          <IconButton
          disabled
          iconName="search-sharp"
          size={16}
          color={themes.colors.purple_1}
          />
        }
        notFoundText="Category not found, Click here to select a category."
        search={false}
        
        />

      <View>
        <Controller
          control={control}
          rules={{ required: "Type the description" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
            label="Description"
            placeholder="Pair of shoes"
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            multiline={true}
            />
          )}
          name="description"
          />
        {errors.amount && <Text>Amount is a required field</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={handleCancel} />
        <Button title={isEditing ? "Update" : "Add"} onPress={handleSubmit(submit)} />

        {isEditing && (
          <Button
          onPress={handleDelete.bind(this, expenseId)}
          icon={
            <IconButton
            disabled
            iconName="trash-outline"
            size={20}
            color={themes.colors.yellow_1}
            />
          }
          />
        )}
      </View>
    </View>
        </>
  );
};

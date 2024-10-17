import { useState } from "react";
import { View, Text , Pressable, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@components/Button";
import { styles } from "./styles";
import { SelectList } from "react-native-dropdown-select-list";

import { Input } from "@components/Input";
import themes from "../../theme/themes";
import { IconContainer } from "@components/IconContainer";
import { IconButton } from "@components/IconButton";
import { useExpense } from "@hooks/useExpensesContext";

import { ExpIdType } from "@contexts/expensesContext";
import { expenseType } from "@contexts/expensesContext";
import { dateFormat } from "@utils/dateFormat";
import DateTimePicker , {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { StackNavProps } from "@routes/app.routes";


export type FormData = {
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
  onDeleteExp: (id: ExpIdType) => void;
  onCancel: () => void;
  onConfirm: (fields: FormData) => void;
};

export const InputForm = ({
  onConfirm,
  onCancel,
  onDeleteExp,
  isEditing,
  expenseId,
}: inputFormProps) => {

  const [selectedCategory, setSelectedCategory] = useState("");
  const [invalidCategory, setInvalidCategory] = useState(false);
  const navigation = useNavigation<StackNavProps>();
  
  const expContext = useExpense();
  const expToEdit: any = expContext.expenses.find(
    (exp: expenseType) => exp.id === expenseId.id
  );


  const [date, setDate] = useState<Date>(isEditing && expToEdit ? expToEdit.date : new Date());
  const [showPicker, setShowPicker] = useState(false);

  
  const toggleDatePicker = ()=>{
    setShowPicker(prevState => !prevState)
  };
  
  const onDateChange = (event : DateTimePickerEvent, selectedDate: any )=>{
    // type can be set or dismissed
    setDate(selectedDate)
    if(event.type === 'set' && Platform.OS === 'android'){
      toggleDatePicker();
      setDate(selectedDate);

    }
  };


  const onIosDateChange = ()=>{
    toggleDatePicker()
 }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: isEditing && expToEdit ? expToEdit.amount.toFixed(2) : "",
      description: isEditing && expToEdit ? expToEdit.description : "",
      date: isEditing && expToEdit ? dateFormat(expToEdit.date) : "",
    },
  });

  const submit = (fields: FormData) => {
    let catIndex;

    if (!isEditing) {
      catIndex = selectListData.findIndex(
        (exp) => exp.key === Number(selectedCategory)
      );

      if (catIndex === -1) {
        setInvalidCategory(true);
        return;
      } else {
        setInvalidCategory(false);
        fields.category = selectListData[catIndex].value;
      }
    }

    if (isEditing && !selectedCategory) {
      fields.category = expToEdit.category;
    }

    if (isEditing && selectedCategory) {
      catIndex = selectListData.findIndex(
        (exp) => exp.key === Number(selectedCategory)
      );
      fields.category = selectListData[catIndex].value;
    }

    fields.date = date.toDateString();
   

    onConfirm(fields);
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconContainer
            iconSize={16}
            category={isEditing ? expToEdit?.category : "Empty"}
          />
        </View>

        <View style={styles.group}>
          <View style={{minWidth: '40%'}}>
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
                  errorMessage={errors.amount?.message}
                />
              )}
              name="amount"
            />
          </View>

          <View style={{ minWidth: '40%'}}>

            
            { !showPicker && (
              
              <Pressable onPress={toggleDatePicker}>
                <Input
                      label="Date"
                      placeholder="Pick Date"
                      // onChangeText={onChange}
                      value={dateFormat(date)}
                      // onBlur={onBlur}
                      multiline={false}
                      errorMessage={errors.date?.message}
                      editable={false}
                      onPressIn={toggleDatePicker}
                      />
            </Pressable>
            )}


              { showPicker && (
                <View >

                  <DateTimePicker 
                    mode='date'
                    display={Platform.OS === 'ios' ? 'spinner' : 'default' }
                    value={date}
                    onChange={onDateChange}
                    style={styles.datePickerIOS}
                    accentColor={themes.colors.purple_1}
                    />
                    </View>
              )}
          
              { showPicker && Platform.OS === 'ios' && (
                <View style={styles.iosButtonContainer}>
                  <Button title='Cancel' onPress={toggleDatePicker}/>
                  <Button title='Confirm' onPress={onIosDateChange}/>
                </View>
              )}
        

       </View>
        </View>

        <SelectList
          defaultOption={{
            key: isEditing ? selectedCategory : null,
            value: isEditing && expToEdit.category && expToEdit.category,
          }}
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
        {invalidCategory && (
          <View style={styles.catContainer}>
            <View style={styles.catInnerContainer}></View>
            <Text style={styles.catText}>Pick a category</Text>
          </View>
        )}

        <View>
          <Controller
            control={control}
            rules={{ required: "Describe your item." }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Description"
                placeholder="Pair of shoes"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                multiline={true}
                errorMessage={errors.description?.message}
              />
            )}
            name="description"
          />
        </View>
          
            <Pressable style={ styles.link} onPress={()=>navigation.navigate('photoMap', { id: expenseId})}>
              <Text style={styles.receiptMap}>Upload receipt and location</Text>
            </Pressable>

        <View style={styles.buttonContainer}>
          <Button title="Cancel" onPress={onCancel} />
          <Button
            title={isEditing ? "Update" : "Add"}
            onPress={handleSubmit(submit)}
          />
          {isEditing && (
            <Button
              onPress={onDeleteExp.bind(this, expenseId)}
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

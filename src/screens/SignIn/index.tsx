import { View } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "@routes/auth.routes";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { SignInSingUpLink } from "@components/SignInSignUpLink";

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigation = useNavigation<AuthNavProps>()
  const handleConfirm = () => {};

  const directToSignUn =()=>{
    navigation.navigate('signUp')
  }

  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      <View style={styles.container}>
        <View>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                multiline={false}
                errorMessage={errors.email?.message}
                placeholder="john@example.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />
        </View>

        <View>
          <Controller
            control={control}
            rules={{ required: 'Please enter your e-mail.', 
              pattern:{
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email entry.'
            } }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                multiline={false}
                errorMessage={errors.password?.message}
                placeholder="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="password"
          />
        </View>

        <View style={styles.button}>
          <Button title="Login" onPress={handleSubmit(handleConfirm)} />
        </View>
        <View style={styles.button}>
         <SignInSingUpLink question='New user?' direction='Create account' onClick={directToSignUn}/>
        </View>
      </View>
    </LinearGradient>
  );
};

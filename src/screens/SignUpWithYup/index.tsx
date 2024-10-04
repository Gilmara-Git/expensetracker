import { View} from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { SignInSingUpLink } from "@components/SignInSignUpLink";
import { useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "@routes/auth.routes";

import * as yup from "yup";
import YupPassword from 'yup-password';
require('yup-password')(yup);
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";


const SignUpSchema = yup.object({
  // email: yup.string().email('Invalid email'),
  email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).required('Enter a valid email'),
  password: yup.string().password().minLowercase(1).minNumbers(1).minUppercase().required('Min 8 digits with 1 Capital letter, 1 number, 1 character'),
  confirm_password: yup.string().oneOf([yup.ref('password')], 'Passwords do not match.').required('Confirm password'),
})

type FormData = yup.InferType<typeof SignUpSchema>


export const SignUpWithYup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(SignUpSchema),
    },
  );

  const handleCreateAccount = (fields: FormData) => {
   
  };
  const navigation = useNavigation<AuthNavProps>();

  const directToSignIn = () => {
    navigation.navigate("signIn");
  };

  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      <View style={styles.container}>
        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                multiline={false}
                errorMessage={errors.email?.message}
                placeholder="john@example.com"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize='none'
                selectTextOnFocus
                autoFocus={true}

              />
            )}
            name="email"
          />
        </View>

        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                multiline={false}
                errorMessage={errors.password?.message}
                placeholder="password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
            name="password"
          />
        </View>

        <View>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Confirm Password"
                multiline={false}
                errorMessage={errors.confirm_password?.message}
                placeholder="Retype your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
            )}
            name="confirm_password"
          />
        </View>
        <View style={styles.button}>
          <Button title="Sign Up" onPress={handleSubmit(handleCreateAccount)} />
        </View>

        <View style={styles.button}>
          <SignInSingUpLink question='Already registered?' direction='Login' onClick={directToSignIn}/>
        </View>
      </View>
    </LinearGradient>
  );
};

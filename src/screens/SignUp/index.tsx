import { View} from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { SignInSingUpLink } from "@components/SignInSignUpLink";
import { useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "@routes/auth.routes";



import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form";


const SignUpSchema = z.object({

  email: z.string().email(),
  password: z.string().min(6).max(8),
  confirm_password: z.string()
}).refine(data => data.password === data.confirm_password, {
  message:'Password and Confirm Password must match.',
  path:['confirm_password']
});

type FormData = z.infer<typeof SignUpSchema>


export const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema)
    },
  );

  const handleCreateAccount = (fields: FormData) => {
    console.log(fields, 'linha38')
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
                secureTextEntry={true}
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

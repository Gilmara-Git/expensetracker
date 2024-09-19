import { View, Text, Pressable } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import { Controller, useForm } from "react-hook-form";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { SignInSingUpLink } from "@components/SignInSignUpLink";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "@routes/auth.routes";

export const SignUp = () => {
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

  const handleCreateAccount = () => {};
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
            rules={{ required: true }}
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
          <Button title="Sign Up" onPress={handleSubmit(handleCreateAccount)} />
        </View>

        <View style={styles.button}>
          <SignInSingUpLink question='Already registered?' direction='Login' onClick={directToSignIn}/>
        </View>
      </View>
    </LinearGradient>
  );
};

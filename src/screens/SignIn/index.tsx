import { useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "@routes/auth.routes";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { SignInSingUpLink } from "@components/SignInSignUpLink";

import themes from "../../theme/themes";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useUserContext } from "@hooks/useUserContext";
import Toast from "react-native-toast-message";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(8),
});

type FormData = z.infer<typeof SignInSchema>;

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignInSchema),
  });

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<AuthNavProps>();
  const { signIn } = useUserContext();

  const showToast = (errorMessage: string) => {
    Toast.show({
      type: "error",
      text1: errorMessage ? JSON.stringify(errorMessage) : "Try again later.",
      text2: '"Verify your email and password"',
      text1Style: {
        color: themes.colors.purple_1,
        fontSize: 14,
        fontFamily: themes.fonts.balsamiq_700,
      },
      text2Style: {
        color: themes.colors.warn,
        fontSize: 14,
        fontFamily: themes.fonts.balsamiq_400,
      },
      position: "top",
      autoHide: true,
      visibilityTime: 4000,
      topOffset: 140,
    });
  };

  const handleToggleReviewPassword = () => {
    setShowPassword((preState) => !preState);
  };

  const handleConfirm = async (fields: FormData) => {
    try {
      setIsAuthenticating(true);
      await signIn(fields.email, fields.password);
    } catch (error: any) {
      if (error.response) {
      
        if (
          error.response.status === 400 &&
          error.response.data.error.message === "INVALID_LOGIN_CREDENTIALS"
        ) {
          showToast(error.response.data.error.message);
        }
        if (error.response.data.error.message) {
          console.log(
            "CAUGHT_API_REQUEST_ERROR_SIGNIN_SCREEN - Error message",
            error.response.data.error.message
          );
        }

        if (error.response.status) {
          console.log(
            "CAUGHT_API_REQUEST_ERROR_SIGNIN_SCREEN - Status",
            error.response.status
          );
        }
        console.log(
          "CAUGHT_API_REQUEST_ERROR_SIGNIN_SCREEN - Headers",
          error.response.headers
        );
      } else if (error.request) {
        console.log(
          "CAUGHT_API_REQUEST_ERROR_SIGNIN_SCREEN - Error request",
          error.request
        );
      } else {
        console.log(
          "CAUGHT_API_REQUEST_ERROR_SIGNIN_SCREEN - Error message",
          error.message
        );
      }
      console.log(
        "CAUGHT_API_REQUEST_ERROR_SIGNIN_SCREEN - Error config",
        error.config
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const directToSignUn = () => {
    navigation.navigate("signUp");
  };

  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      {isAuthenticating ? (
        <Loading message="Login in process.." />
      ) : (
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
                  autoCapitalize="none"
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
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit(handleConfirm)}
                  secureTextEntry={!showPassword}
                  passwordField={true}
                  shouldReviewPassword={handleToggleReviewPassword}
                  showPassword={showPassword}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              )}
              name="password"
            />
          </View>
          <View style={styles.button}>
            <Button title="Login" onPress={handleSubmit(handleConfirm)} />
          </View>
          <View style={styles.button}>
            <SignInSingUpLink
              question="New user?"
              direction="Create account"
              onClick={directToSignUn}
            />
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

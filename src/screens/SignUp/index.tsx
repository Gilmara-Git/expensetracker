import { useState } from 'react';
import { View} from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";


import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Loading  } from "@components/Loading";
import { SignInSingUpLink } from "@components/SignInSignUpLink";
import { useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "@routes/auth.routes";

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form";
import { userSignUp} from '@services/authenticateUser'


// firebase requires a password min length of 6 characters
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
  const [ showPassword, setShowPassword ] = useState(false);
  const [ isAuthenticating, setIsAuthenticating ] = useState(false);


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpSchema)
    },
  );
  const navigation = useNavigation<AuthNavProps>();

  const handleCreateAccount = async (fields: FormData) => {
    try{
      setIsAuthenticating(true);
      await userSignUp(fields.email, fields.password);
     

    }catch(error:any){
      if(error.response){
        console.log(error.response.data, 'linha 56');
        console.log(error.response.status, 'linha 57');
        console.log(error.response.headers, 'linha 58');

      }else if(error.request){
        console.log(error.request, 'linha61')

      }else{
        console.log('Error', error.message, 'linha64');
      }
      console.log(error.config, 'linha66');
     
    }finally{
      setIsAuthenticating(false)
    }
  };

  const directToSignIn = () => {
    navigation.navigate("signIn");
  };

  const handleToggleReviewPassword = ()=>{
    setShowPassword((preState)=> !preState);

  }
  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
        { isAuthenticating ? <Loading  message='Creating user...'/> :
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
                    secureTextEntry={!showPassword}
                    passwordField={true}
                    shouldReviewPassword={handleToggleReviewPassword}
                    showPassword={showPassword}
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
                  secureTextEntry={!showPassword}
                  passwordField={true}
                  shouldReviewPassword={handleToggleReviewPassword}
                  showPassword={showPassword}
                  onSubmitEditing={handleSubmit(handleCreateAccount)}
                  returnKeyType='send'
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
        }
    
    </LinearGradient>
  );
};

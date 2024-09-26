import { useState} from 'react';
import { View , Alert} from "react-native";
import { styles } from "./styles";
import { LinearGradient } from "expo-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { AuthNavProps } from "@routes/auth.routes";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Loading } from '@components/Loading';
import { SignInSingUpLink } from "@components/SignInSignUpLink";
import { userSignIn } from "@services/authenticateUser";

import { z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from "react-hook-form";

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(8)
})

type FormData = z.infer<typeof SignInSchema>

export const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignInSchema)
  });

  const [ isAuthenticating, setIsAuthenticating] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
 

  const navigation = useNavigation<AuthNavProps>();
  
  const handleToggleReviewPassword = ()=>{
    setShowPassword((preState)=> !preState);

  }

  const handleConfirm = async (fields: FormData) => {
    console.log(fields)
    try{
      setIsAuthenticating(true);
      await userSignIn(fields.email, fields.password);
     
    }catch(error:any){
      if(error.response){
        if(error.response.status === 400 && error.response.data.error.message === 'INVALID_LOGIN_CREDENTIALS'){
          Alert.alert('Credentials invalid.','Verify your email and password!')
         
        }
        console.log(error.response.data.error.message, 'linha 37');
        console.log(error.response.status, 'linha 38');
        console.log(error.response.headers, 'linha 39');

      }else if(error.request){
        console.log(error.request, 'linha42')

      }else{
        console.log('Error', error.message, 'linha45');
      }
      console.log(error.config, 'linha47');
     
    }finally{
      setIsAuthenticating(false)
    }
  };

  const directToSignUn =()=>{
    navigation.navigate('signUp')
  }

  return (
    <LinearGradient colors={["#f2edf3", "#c199ea"]} style={styles.background}>
      { isAuthenticating ? <Loading message='Login in process..'/>  :
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
                returnKeyType='send'
                onSubmitEditing={handleSubmit(handleConfirm)}
                secureTextEntry={!showPassword}
                passwordField={true}
                shouldReviewPassword={handleToggleReviewPassword}
                showPassword={showPassword}
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
      }
    </LinearGradient>
  );
};

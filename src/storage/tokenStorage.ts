import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { TOKEN_CONFIG } from './storage.config';


export const setTokenStorage = async (token: string, refresh_token: string)=>{
    await AsyncStorage.setItem(TOKEN_CONFIG, JSON.stringify({token, refresh_token}));
};

export const getTokenStorage = async ()=>{
   const storage =  await AsyncStorage.getItem(TOKEN_CONFIG);
   const token_RefreshToken  = storage ? JSON.parse((storage)) : {};
   return token_RefreshToken;
};

export const removeTokenStorage = async ()=>{
    await AsyncStorage.removeItem(TOKEN_CONFIG);
};
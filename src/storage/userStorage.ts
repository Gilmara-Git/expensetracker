import  AsyncStorage  from "@react-native-async-storage/async-storage"
import { USER_CONFIG } from './storage.config';
import { UserType } from "@contexts/authContext";

export const setUserStorage = async (user: UserType)=>{
    await AsyncStorage.setItem(USER_CONFIG, JSON.stringify(user))
};

export const getUserStorage = async ()=>{
    const storage = await AsyncStorage.getItem(USER_CONFIG);
    const user : UserType = storage ? JSON.parse(storage):  {};
    return user;
};

export const removeUserStorage = async ()=>{
    await AsyncStorage.removeItem(USER_CONFIG);
};
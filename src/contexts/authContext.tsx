import { createContext,  ReactNode, useState } from "react";
import axios from 'axios';
import { API_KEY } from '@env';
import { userBackend } from "@services/authenticateUser";

const baseUrl = userBackend.getUri();


type UserType = {
    email: string,
    idToken: string,
    refreshToken : string,
    expiresIn: string,
    uid: string,
    registered: boolean;
}

type AuthContextDataProps = {
    user: UserType,
    signIn: (email: string, password: string)=>Promise<void>,
    signUp: (email: string, password: string)=>Promise<void>
    signOut:()=>Promise<void>
}

type AuthContextProvider = {
    children: ReactNode;
}
export const AuthContext = createContext<AuthContextDataProps>({}as AuthContextDataProps);


export const AuthContextProvider = ({children}: AuthContextProvider)=>{
    const [ user, setUser ] = useState<UserType>({} as UserType );


    const signUp = async (email: string, password: string)=> {

        try{
            const response = await axios.post(`${baseUrl}signUp?key=${API_KEY}`, 
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                },
                { headers: {'Content-Type': 'application/json' }
            } 
        )
        
        const userDetails =  {
            email: response.data.email,
            idToken: response.data.idToken,
            refreshToken : response.data.refreshToken,
            expiresIn: response.data.expiresIn,
            uid: response.data.localId,
            registered: true   
        }
    
        setUser(userDetails)

        }catch(error){
            throw error;
        }
  
    };

    const signIn = async (email: string, password: string)=>{

        try{
            const response =  await axios.post(`${baseUrl}signInWithPassword?key=${API_KEY}`, {
                email: email,
                password: password,
                returnSecureToken: true
            })
        
            const userDetails =  {
                email: response.data.email,
                idToken: response.data.idToken,
                refreshToken : response.data.refreshToken,
                expiresIn: response.data.expiresIn,
                uid: response.data.localId,
                registered: response.data.registered
            }
           
            setUser(userDetails)


        }catch(error){ 
            throw error;
        }
    }

    const signOut = async()=>{
        try{
            setUser({}as UserType)
        }catch(error){
            throw error;
        }
    }



    return (
        <AuthContext.Provider value={{user, signIn, signUp, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}
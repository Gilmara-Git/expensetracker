import { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { API_KEY } from "@env";
import { userBackend } from "@services/authenticateUser";
import {
  setUserStorage,
  getUserStorage,
  removeUserStorage,
} from "@storage/userStorage";
import {
  setTokenStorage,
  removeTokenStorage,
} from "@storage/tokenStorage";

const baseUrl = userBackend.getUri();

export type UserType = {
  email: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
  uid: string;
  registered: boolean;
};

type AuthContextDataProps = {
  user: UserType;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

type AuthContextProvider = {
  children: ReactNode;
};
export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export const AuthContextProvider = ({ children }: AuthContextProvider) => {
  const [user, setUser] = useState<UserType>({} as UserType);

  const signUp = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}signUp?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      // axios.defaults.headers.common["Authorization"] = response.data.idToken
      // axios.interceptors.response.use

      const userDetails: UserType = {
        email: response.data.email,
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        uid: response.data.localId,
        registered: true,
      };

      await setUserStorage(userDetails);
      await setTokenStorage(userDetails.idToken, userDetails.refreshToken);
      //adding token to the requests headers, it contains the user.id
      userBackend.defaults.headers.common['Authorization'] = `Bearer ${userDetails.idToken}`;
      setUser(userDetails);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}signInWithPassword?key=${API_KEY}`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      );

      const userDetails: UserType = {
        email: response.data.email,
        idToken: response.data.idToken,
        refreshToken: response.data.refreshToken,
        expiresIn: response.data.expiresIn,
        uid: response.data.localId,
        registered: response.data.registered,
      };

      await setUserStorage(userDetails);
      await setTokenStorage(userDetails.idToken, userDetails.refreshToken);
      //adding token to the requests headers, it contains the user.id
      userBackend.defaults.headers.common['Authorization'] = `Bearer ${userDetails.idToken}`;
      setUser(userDetails);
    
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setUser({} as UserType);
      removeUserStorage();
      removeTokenStorage();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    //sending the signOut function to the api/userBackend so we can use it on the 'intercepting the backend response'
    const subscribe = userBackend.registerInterceptTokenManager(signOut);

    // cleanup function after application loads
    return () => {
      subscribe();
    };
  }, [signOut]);

  useEffect(() => {
    const getUserDetails = async () => {
      const userInStorage = await getUserStorage();
      setUser(userInStorage);
    };
    getUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

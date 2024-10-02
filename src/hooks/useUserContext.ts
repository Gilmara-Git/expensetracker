import { useContext } from "react";
import { AuthContext } from "@contexts/authContext";

export const useUserContext = ()=>{
    const context =  useContext(AuthContext);
    return context;
};


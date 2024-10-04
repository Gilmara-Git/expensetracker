import { useUserContext } from "@hooks/useUserContext"

export const checkTokenExpiration = ()=>{
    setTimeout(()=>{
        const {tokenExpiration} = useUserContext();
        // console.log(tokenExpiration, 'linha5 token expiration')

    },2000)
}

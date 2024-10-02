import  axios  from 'axios';

export const userBackend = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:'
})

// All below transferred to authContext.tsx
// const url = userBackend.getUri();
               
// export const userSignUp = async (email: string, password: string)=> {
//     const response = await axios.post(`${url}signUp?key=${API_KEY}`, 
//         {
//             email: email,
//             password: password,
//             returnSecureToken: true
//         },
//         { headers: {'Content-Type': 'application/json' }
//     } 
// )


// const userDetails =  {
//     email: response.data.email,
//     idToken: response.data.idToken,
//     refreshToken : response.data.refreshToken,
//     expiresIn: response.data.expiresIn,
//     uid: response.data.localId
// }
// console.log(userDetails, 'linha30')
// };

// export const userSignIn =  async (email:string, password: string) => {
//     console.log(userBackend.getUri(), 'line 8')
//     console.log(email, password, 'email and password passing on the signIn')
//     const response =  await axios.post(`${url}signInWithPassword?key=${API_KEY}`, {
//         email: email,
//         password: password,
//         returnSecureToken: true
//     })

//     const userDetails =  {
//         email: response.data.email,
//         idToken: response.data.idToken,
//         refreshToken : response.data.refreshToken,
//         expiresIn: response.data.expiresIn,
//         uid: response.data.localId,
//         registered: response.data.registered
//     }
//     console.log(userDetails.idToken === null, userDetails.idToken)


//     console.log(userDetails, 'Response na SignINUSER')
// }
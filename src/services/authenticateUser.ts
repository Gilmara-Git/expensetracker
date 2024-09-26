import  axios , { AxiosInstance}  from 'axios';

const authenticateUser = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:',
    
}) as AxiosInstance;

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


export const signUpUser = async (email: string, password: string)=> {
    console.log('signUp?key=' + 'AIzaSyD-AKQayF1DP8xtx2W8BiXJ2jHtmvGmsTg')
    console.log(email, password, 'email and password passing to SignUp')
    const response = await authenticateUser.post('signUp?key=' + 'AIzaSyD-AKQayF1DP8xtx2W8BiXJ2jHtmvGmsTg', {
        email: email,
        password: password,
        returnSecureToken: true
    })
    console.log(response, 'response from  SignUpUser')
};

export const signInUser =  async (email:string, password: string) => {
    await authenticateUser.post(`signInWithPassword?key=${process.env.API_KEY}`, {
        email: email,
        password: password
    })
}
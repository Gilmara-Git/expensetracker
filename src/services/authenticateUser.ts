import axios, { AxiosInstance, AxiosError } from "axios";
import { AppError } from "@utils/AppError";
import { getTokenStorage, setTokenStorage } from "@storage/tokenStorage";
import { API_KEY } from "@env";

type signOut = () => void;

type ApiInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: signOut) => () => void;
};

type RequestQueueType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

const userBackend = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts:",
}) as ApiInstanceProps;

// All below transferred to authContext.tsx
export const api = userBackend.getUri();

// This would be intercepting the request
// axios.interceptors.request.use((config)=>{
//     console.log(config)
//     return config
// }, (error)=>{
//     return Promise.reject(error)
// })

//Below we are intercepting the response fro the backend
// so when user signs in throughout axios.interceptors we are able to retrieve the request and response
/// But we're interested in the response

let requestsQueue: Array<RequestQueueType> = [];
let isRefreshingToken = false;

userBackend.registerInterceptTokenManager = (signOut) => {
  const interceptTokenManager = axios.interceptors.response.use(
    async (response) => {
      // we are going to work with the request
      return response;
    },
    async (requestError) => {
      // console.log('Error status on authenticateUser', requestError.response.status)
      if (
        requestError.response.status === 400  || requestError.response.status === undefined &&
        requestError.response.data.error.message === "INVALID_LOGIN_CREDENTIALS"
      ) {
        throw requestError;
      }

      if (
        requestError.response.status === 400 &&
        requestError.response.data.error.message ===
          "TOO_MANY_ATTEMPTS_TRY_LATER"
      ) {
        throw requestError;
      }

      if (requestError?.response?.status === 401) {
        console.log(requestError.response.data.status, 'Error on authenticateUser')
        console.log(requestError.response.data.message,'Error on authenticateUser') 
        // if (
        //   requestError.response.data.message === "INVALID_CUSTOM_TOKEN" ||
        //   requestError.response.data.message === "TOKEN_EXPIRED" ||
        //   requestError.response.data.message === "INVALID_REFRESH_TOKEN" ||
        //   requestError.response.data.message === "INVALID_GRANT_TYPE"
        // ) {
          const { refresh_token } = await getTokenStorage();

          console.log('REFRESH TOKEN authenticateUser', refresh_token)
        
          if (!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }

          // if there is refreshToken push a requisition to the queue
          // But first get the Original requisition config and update the header with the token
          const originalRequestConfig = requestError.response.config;

          if (isRefreshingToken) {
            const agora =  new Date()
            console.log('Refresh_token on authenticatedUser',  agora.getDate(), agora.getHours(), agora.getMinutes(),)
            return new Promise((resolve, reject) => {
              requestsQueue.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(userBackend(originalRequestConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            });
          }

          // when passing here for the first time, isRefreshingToken is false, se we set it to true
          // for future requests handling
          isRefreshingToken = true;

          // requesting a new token and refresh_token

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await axios.post(
                `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
                {
                  grant_type: "refresh_token",
                  refresh_token: refresh_token,
                }
              );
              const agora =  new Date()
              console.log('Refresh_token on authenticatedUser',  agora.getDate(), agora.getHours(), agora.getMinutes())
              console.log('Data on authenticatedUser', data)
              
              await setTokenStorage(data.idToken, data.refresh_token);

              if (originalRequestConfig.data) {
                originalRequestConfig.data = JSON.parse(
                  originalRequestConfig.data
                );
              }

              // update header of current request and the next ones with new token
              //current request
              originalRequestConfig.headers = {
                Authorization: `Bearer ${data.idToken}`,
              };
              //next requests
              userBackend.defaults.headers.common[
                "Authorization"
              ] = `Bearer ${data.idToken}`;

              //process requests on queue
              requestsQueue.forEach((request) => {
                request.onSuccess(data.idToken);
              });

              console.log('Workflow to update token is completed')
              resolve(userBackend(originalRequestConfig));
            } catch (error) {
              reject(requestError);
              signOut();

              //process error in queue
              requestsQueue.forEach((requests) => {
                requests.onFailure(requestError);
              });
            } finally {
              requestsQueue = [];
              isRefreshingToken = false;
            }
          });
        }
        signOut();
      // }

      if (requestError.response && requestError.response.data) {
        return Promise.reject(new AppError(requestError.response.data.message));
      } else {
        return Promise.reject(requestError);
      }
    }
  );

  return () => userBackend.interceptors.response.eject(interceptTokenManager);
};

export { userBackend };

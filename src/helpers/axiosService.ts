// import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
// import Config from 'react-native-config';

// export const AXIOS_INSTANCE = Axios.create({
//     // baseURL: 'https://razvrstaj.zagreb.hr/',
//     baseURL: Config.API_URL,
// }); // use your own URL here or environment variable

// export const customAxiosInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
//     const source = Axios.CancelToken.source();
//     const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(({ data }) => data);
//     // @ts-ignore
//     promise.cancel = () => {
//         source.cancel('Query was cancelled');
//     };

//     return promise;
// };

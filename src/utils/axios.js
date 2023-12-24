import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://dist.nd.ru/api/',
})

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken')
    if(token)  {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

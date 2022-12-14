import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    withCredentials: true,
});
// axios.defaults.withCredentials = true;
instance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    // error => {
    //     if (error.response && 419 === error.response.status) {
    //         window.location.reload()
    //     }

    //     return Promise.reject(error)
    // },
    
);

export default instance;
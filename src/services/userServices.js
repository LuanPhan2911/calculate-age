import axios from "../axios";
const handleUserLogin = async(user) => {
    return axios.post('/api/login', user);
}
const handleUserRegister = (user) => {
    return axios.post('/api/register', user);
}
const handleVerifyToken =()=>{
    return axios.get('/sanctum/csrf-cookie', {
        withCredentials:true
    });
}
export {
    handleUserLogin,
    handleUserRegister,
    handleVerifyToken,
}
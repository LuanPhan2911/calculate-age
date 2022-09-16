import axios from "../axios";
const handleUserLogin = (user) => {
    return axios.post('/api/login', user);
}
const handleUserRegister = (user) => {
    return axios.post('/api/register', user);
}
export {
    handleUserLogin,
    handleUserRegister,
}
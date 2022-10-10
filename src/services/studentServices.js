import axios from "../axiosStudent";
const handleGetStudentService =()=>{
    return axios.get('/student');
}
export {
    handleGetStudentService,
}
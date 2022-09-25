import axios from '../axios';
const handleGetCategoryService =(data)=>{
    return axios.get('/api/category', {
        params:data
    })
}
export {
    handleGetCategoryService,
}
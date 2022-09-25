import axios from "../axios";
const handleGetPostService = () => {
    return axios.get('/api/post');
}
const handleAddPostService = (data) => {
    return axios.post('/api/post/store', data);
}
const handleShowPostService = (data) => {
    return axios.get('/api/post/show', {
        params: data
    });
}

export {
    handleGetPostService,
    handleShowPostService,
    handleAddPostService,
}
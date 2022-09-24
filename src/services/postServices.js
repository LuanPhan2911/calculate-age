import axios from "../axios";
const handleGetPostService = () => {
    return axios.get('/api/post');
}
const handleShowPostService = (data) => {
    return axios.get('/api/post/show', {
        params: data
    });
}

export {
    handleGetPostService,
    handleShowPostService,
}
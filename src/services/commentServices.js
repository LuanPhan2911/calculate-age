import axios from "../axios";
const handleAddCommentService = (data) => {
    return axios.post('/api/comment/store', data);
}
const handleGetCommentService = (data) => {
    return axios.get('/api/comment', {
        params: data
    })
}
const handleAddReplyCommentService = (data) => {
    return axios.post('/api/comment/reply/store', data);
}
export {
    handleAddCommentService,
    handleGetCommentService,
    handleAddReplyCommentService,
}
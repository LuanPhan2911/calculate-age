import axios from "../axios";
const handleAddPostCommentService = (data) => {
    return axios.post('/api/post/comment/store', data);
}
const handleGetPostCommentService = (data) => {
    return axios.get('/api/post/comment', {
        params: data
    })
}
const handleAddPostReplyCommentService = (data) => {
    return axios.post('/api/post/comment/reply/store', data);
}
export {
    handleAddPostCommentService,
    handleGetPostCommentService,
    handleAddPostReplyCommentService,
}
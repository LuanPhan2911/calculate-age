import axios from "../axios";
const handleAddTodoService = (data) => {
    return axios.post('/api/todolist/create', data)
}
const handleGetAllTodoService = (data) => {
    return axios.get('/api/todolist/index', {
        params: data
    });
}
const handleDeleteTodoService = (data) => {
    return axios.delete('/api/todolist/delete', {
        params: data
    });
}
export {
    handleAddTodoService,
    handleGetAllTodoService,
    handleDeleteTodoService,
}
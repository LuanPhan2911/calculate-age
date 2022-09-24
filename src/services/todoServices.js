import axios from "../axios";
const handleAddTodoService = (data) => {
    return axios.post('/api/todolist/create', data)
}
const handleGetAllTodoService = (data) => {
    return axios.get('/api/todolist/index', {
        params: data
    });
}
const handleGetDeletedTodoService = (data) => {
    return axios.get('/api/todolist/deleted-list', {
        params: data
    });
}
const handleDeleteTodoService = (data) => {
    return axios.delete('/api/todolist/delete', {
        params: data
    });
}
const handleRestoreTodoService = (data) => {
    return axios.patch('/api/todolist/restore-todo', data);
}
const handleEditTodoService = (data) => {
    return axios.patch('/api/todolist/edit', data);
}


export {
    handleAddTodoService,
    handleGetAllTodoService,
    handleDeleteTodoService,
    handleGetDeletedTodoService,
    handleRestoreTodoService,
    handleEditTodoService,
}
import './TodoList.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { injectIntl } from 'react-intl';
import { handleAddTodoService, handleDeleteTodoService, handleGetAllTodoService } from '../services/todoServices';
import { useSelector } from "react-redux";
const TodoList = (props) => {
    const { intl } = props;
    const userId = useSelector(state => state.user.id);
    const language = useSelector(state => state.app.language);
    const [todoList, setTodoList] = useState([]);
    const todoInit = {
        title: '',
        description: '',
    };
    const [todo, setTodo] = useState({
        ...todoInit
    });
    useEffect(() => {
        fetchData();

    }, []);
    const fetchData = async () => {
        try {
            let res = await handleGetAllTodoService({
                user_id: userId,
                language
            });
            if (res && res.success) {
                setTodoList(res.data);
            }
        } catch (error) {
            console.log(error);
        }

    }
    const handleFillData = (event) => {
        let { name, value } = event.target;
        let todoCopy = todo;

        todoCopy[name] = value;
        setTodo({ ...todoCopy });
    }
    const handleAddTodo = async () => {
        let { title, description } = todo;
        if (title.length > 0 && description.length > 0) {
            try {
                let res = await handleAddTodoService(
                    {
                        title,
                        description,
                        user_id: userId,
                        language
                    }
                );
                if (res && res.success) {
                    setTodo({
                        ...todoInit,
                    })
                    toast.success(res.message);
                    fetchData();
                }
            } catch (error) {
                let { status, data } = error.response;
                if (status === 400) {
                    let { errors } = data;
                    for (const key in errors) {
                        if (Object.hasOwnProperty.call(errors, key)) {
                            errors[key].forEach((item) => {
                                toast.error(item);
                            })

                        }
                    }
                }
            }

            return;
        }
        let errorMessage = intl.formatMessage({ id: 'todo.error' });
        toast.error(errorMessage);
    }
    const handleDeleteTodo = async (todo) => {
        let user_id = todo.user_id;
        let todo_id = todo.id;
        if (user_id && todo_id) {
            try {
                let res = await handleDeleteTodoService({
                    user_id,
                    todo_id,
                    language,
                });
                if (res && res.success) {
                    let { message } = res;
                    toast.success(message);
                    await fetchData();
                } else {
                    let { message } = res;
                    toast.error(message);
                }
            } catch (error) {
                let { status, data } = error.response;
                if (status === 400) {
                    let { errors } = data;
                    for (const key in errors) {
                        if (Object.hasOwnProperty.call(errors, key)) {
                            errors[key].forEach((item) => {
                                toast.error(item);
                            })

                        }
                    }
                }
            }


        }
    }
    return (
        <div className="todolist-container">
            <div className="todolist-header">
                Todo list
            </div>
            <div className="todolist-body">
                <div className='add-todo-title form-group col-6'>
                    <label>Title</label>
                    <input
                        className='form-control'
                        name='title' value={todo.title}
                        onChange={(event) => handleFillData(event)}
                    />
                </div>
                <div className='add-todo-description form-group col-6'>
                    <label>Description</label>
                    <textarea
                        className='form-control'
                        value={todo.description}
                        onChange={(event) => handleFillData(event)}
                        name='description'
                    ></textarea>
                </div>
                <div className='add-todo-submit'>
                    <button
                        className='btn btn-primary'
                        onClick={() => handleAddTodo()}
                    >Add</button>
                </div>
                <table className="table table-dark table-hover table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>TodoList</th>
                            <th>Configs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList && todoList.length > 0
                            && todoList.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>
                                            <div className='todolist-content'>
                                                <div className='todolist-title'>
                                                    {item.title}
                                                </div>
                                                <div className='todolist-description'>
                                                    {item.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='todolist-update'>
                                                <button className='btn btn-primary'>Edit</button>
                                                <button
                                                    className='btn btn-danger'
                                                    onClick={() => handleDeleteTodo(item)}
                                                >Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                    </tbody>
                </table>


            </div>
            <div className="todolist-footer">

            </div>
        </div>
    )
}
export default injectIntl(TodoList)
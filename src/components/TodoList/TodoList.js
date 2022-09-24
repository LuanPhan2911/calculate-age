import './TodoList.scss';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FormattedMessage, injectIntl } from 'react-intl';
import { handleAddTodoService, handleDeleteTodoService, handleEditTodoService, handleGetAllTodoService, handleGetDeletedTodoService } from '../../services/todoServices';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { path, TIME_FORMAT } from '../../utils';
import moment from 'moment';
const TodoList = (props) => {
    const { intl } = props;
    const userId = useSelector(state => state.user.id);
    const language = useSelector(state => state.app.language);
    const [todoList, setTodoList] = useState([]);
    const todoInit = {
        title: '',
        description: '',
        todo_id: '',
    };
    const [todo, setTodo] = useState({
        ...todoInit
    });
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData();
    }, [language])
    const fetchData = async () => {
        try {
            let res = await handleGetAllTodoService({
                user_id: userId,
                language
            });
            if (res && res.success) {
                let data = handleFormatTime(res.data);
                setTodoList(data);
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
    const handleSaveTodo = async () => {
        let { title, description, todo_id } = todo;
        if (title.length > 0 && description.length > 0) {
            if (isEdit) {

                try {

                    let res = await handleEditTodoService({
                        title,
                        description,
                        todo_id,
                        user_id: userId,
                        language,
                    })
                    if (res && res.success) {
                        setTodo({
                            ...todoInit,
                        })
                        setIsEdit(false);
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

            } else {


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
    const handleFormatTime = (data) => {
        let result = [];
        data && data.length > 0 && data.map((item) => {
            let { updated_at } = item;
            let obj = {};
            let format = language === 'vi' ? TIME_FORMAT.VI : TIME_FORMAT.EN;
            updated_at = moment(updated_at).format(format);
            obj = { ...item, updated_at: updated_at };
            result.push(obj);
            return item;
        });
        return result;
    }
    const handleEditTodo = (item) => {
        setIsEdit(true);
        let { title, description, id } = item;
        setTodo({
            title,
            description,
            todo_id: id,
        })
    }
    const handleStopEditTodo = () => {
        setIsEdit(false);
        setTodo({
            ...todoInit
        });
    }
    return (
        <div className="todolist-container">
            <div className="todolist-header">
                <FormattedMessage id='menu.todolist' />
            </div>
            <div className="todolist-body">
                <div className='row'>
                    <div className='add-todo col-6'>
                        <div className='add-todo-title form-group'>
                            <label>
                                <FormattedMessage id='todo.title' />
                            </label>
                            <input
                                className='form-control'
                                name='title' value={todo.title}
                                onChange={(event) => handleFillData(event)}
                            />
                        </div>
                        <div className='add-todo-description form-group'>
                            <label>
                                <FormattedMessage id='todo.description' />
                            </label>
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
                                onClick={() => handleSaveTodo()}
                            >
                                <FormattedMessage id='todo.save' />
                            </button>
                            {
                                isEdit &&
                                <button
                                    className='btn btn-info'
                                    onClick={() => handleStopEditTodo()}
                                >
                                    <FormattedMessage id='todo.stop' />
                                </button>
                            }
                        </div>
                    </div>
                    <div className='history col-6'>
                        <h5>
                            <FormattedMessage id='todo.find-todo' />
                        </h5>

                        <Link to={path.TODOLIST_HISTORY}>
                            <button className='btn btn-warning'>
                                {<FormattedMessage id='menu.todo.history' />}
                            </button>
                        </Link>

                    </div>
                </div>


                <table className="table table-dark table-hover table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>
                                <FormattedMessage id='menu.todolist' />
                            </th>
                            <th>
                                <FormattedMessage id='todo.created-at' />
                            </th>
                            <th>
                                <FormattedMessage id='todo.config' />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList && todoList.length > 0
                                ? todoList.map((item, index) => {
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
                                                {item.updated_at}
                                            </td>
                                            <td>
                                                <div className='todolist-update'>
                                                    <button
                                                        className='btn btn-primary'
                                                        onClick={() => handleEditTodo(item)}
                                                    >
                                                        <FormattedMessage id='todo.edit' />
                                                    </button>
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => handleDeleteTodo(item)}
                                                    >
                                                        <FormattedMessage id='todo.delete' />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                                :
                                <h4><FormattedMessage id='todo.empty' /></h4>
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
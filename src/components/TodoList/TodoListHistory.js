import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { handleGetDeletedTodoService, handleRestoreTodoService } from "../../services/todoServices";
import './TodoListHistory.scss';
import moment from "moment";
import { TIME_FORMAT } from "../../utils";
const TodoListHistory = (props) => {
    const userId = useSelector(state => state.user.id);
    const language = useSelector(state => state.app.language);
    const [todoList, setTodoList] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        fetchData();
    }, [language]);
    const fetchData = async () => {
        try {
            let res = await handleGetDeletedTodoService({
                user_id: userId,
                language
            });
            if (res && res.success) {
                let data = handleFormatTime(res.data);
                setTodoList(data);
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
    const handleFormatTime = (data) => {
        let result = [];
        data && data.length > 0 && data.map((item) => {
            let { deleted_at } = item;
            let obj = {};
            let format = language === 'vi' ? TIME_FORMAT.VI : TIME_FORMAT.EN;
            deleted_at = moment(deleted_at).format(format);
            obj = { ...item, deleted_at: deleted_at };
            result.push(obj);
            return item;
        });
        return result;
    }
    const handleRestoreTodo = async (item) => {
        let { id } = item;
        if (id) {
            try {
                let res = await handleRestoreTodoService({
                    user_id: userId,
                    language,
                    todo_id: id
                });
                if (res && res.success) {
                    toast.success(res.message);
                    await fetchData();
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
        <div className="todo-list-history-container">
            <div className="todo-list-history-header">
                <h5>Lich su da xoa</h5>

            </div>
            <div className="todo-list-history-body">
                <div className="back-todo-list">
                    <Link
                        className="btn btn-primary"
                        to={'/todolist'}
                    >Back to TodoList</Link>
                </div>
            </div>
            <table className="table table-dark table-hover table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>TodoList</th>
                        <th>Deleted at</th>
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
                                        <div className='todolist-deleted-at'>
                                            {item.deleted_at}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleRestoreTodo(item)}
                                        >
                                            Restore
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }

                </tbody>
            </table>
            <div className="todo-list-history-footer">

            </div>
        </div>
    )
}
export default TodoListHistory;
import './TodoItem.css';
import {Link} from 'react-router-dom';
import {ExclamationCircleFill, PencilSquare, Trash} from 'react-bootstrap-icons';
import todoService from '../../services/todosService';
import React, {FC} from 'react';
import {Todo} from '../../models/Todo';

const TodoComponent: FC<TodoProps> = ({todo, setTodos, userId}) => {

    const handleChecked = () => {
        todoService
            .updateTodo(
                {
                    userId: todo.userId,
                    description: todo.description,
                    priority: todo.priority,
                    completed: !todo.completed,
                },
                todo._id
            )
            .then(() => {
                todoService
                    .getTodosByUserId(userId)
                    .then((res) => {
                        setTodos(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function deleteTodo() {
        todoService
            .deleteTodoById(todo._id)
            .then(() => {
                todoService
                    .getTodosByUserId(userId)
                    .then((res) => {
                        setTodos(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <tr>
            <td className={'td-done'}>
                <input type={'checkbox'} checked={todo.completed} onChange={handleChecked}/>
            </td>
            <td className={todo.completed ? 'completed td-desc' : 'td-desc'}>{todo.description}</td>
            <td className={'actions'}>
                <label>
                    {todo.priority}
                    {
                        todo.priority === 'high' ? <ExclamationCircleFill className={'priority'} color={'#f56464'}/>
                            : todo.priority === 'medium' ?
                                <ExclamationCircleFill className={'priority'} color={'#f5dd64'}/>
                                : todo.priority === 'low' ?
                                    <ExclamationCircleFill className={'priority'} color={'#989898'}/> :
                                    <ExclamationCircleFill className={'priority'} color={'#989898'}/>
                    }
                </label>
            </td>
            <td className={'actions'}>
                <Link className={'edit-icons'} to={'/edit/' + todo._id} state={{userId: todo.userId}}>
                    <PencilSquare/>
                </Link>
                <Trash color={'#e51616'} className={'trash-icon'} onClick={deleteTodo}/>
            </td>
        </tr>
    );
};

interface TodoProps {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    userId: string;
}

export default TodoComponent;

import {SaveFill, TrashFill} from 'react-bootstrap-icons';
import React, {FC, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './EditTodo.css';
import {toast} from 'react-toastify';
import todoService from '../../services/todosService';
import {Todo} from '../../models/Todo';

const EditTodo: FC = () => {

    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [todo, setTodo] = useState<Todo>({
        userId: '',
        description: '',
        priority: 'medium',
        completed: false,
    });

    useEffect(() => {
        todoService
            .getTodoById(id)
            .then((res) => {
                setTodo({
                    completed: res.data.completed,
                    description: res.data.description,
                    priority: res.data.priority,
                    userId: id,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const onChangeTodoDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            description: e.target.value,
        });
    };

    const onChangeTodoCompleted = () => {
        setTodo({
            ...todo,
            completed: !todo.completed,
        });
    };

    const onChangePriorityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            priority: event.target.value as Todo['priority'],
        });
    };

    const updateTodoById = () => {
        if (todo.description.length > 0) {
            todoService
                .updateTodo(todo, id)
                .then((res) => {
                    console.log('updated Todo successfully!', res);
                    toast.info('updated Todo');
                    navigate('/');
                })
                .catch((err) => {
                    navigate('/');
                    console.log(err);
                    toast.error('error updating todo');
                });
        }
    };

    const deleteTodo = () => {
        todoService
            .deleteTodoById(id)
            .then((res) => {
                console.log('deleted todo:', res.data);
                toast.info('Deleted Todo');
                navigate('/');
            })
            .catch((err) => {
                navigate('/');
                console.log(err);
                toast.error('error deleting todo');
            });
    };

    return (
        <div className={'EditTodo'}>
            <h4>Update Todo:</h4>
            <input
                className={'form-control'}
                type={'text'}
                value={todo.description}
                placeholder='Description'
                onChange={onChangeTodoDescription}/>
            <div className={'radio-group'}>
                <h4>Priority</h4>
                <label>
                    <input
                        type={'radio'}
                        value={'high'}
                        className={'form-check-input radio-btn'}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'high'}/>
                    High
                </label><br/>
                <label>
                    <input
                        type={'radio'}
                        value={'medium'}
                        className={'form-check-input radio-btn'}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'medium'}/>
                    Medium
                </label><br/>
                <label>
                    <input
                        type={'radio'}
                        value={'low'}
                        className={'form-check-input radio-btn'}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'low'}/>
                    Low
                </label><br/>
            </div>
            <label className={'done'}>
                <input
                    className={'form-check-input'}
                    type={'checkbox'}
                    checked={todo.completed}
                    onChange={onChangeTodoCompleted}/>
                mark as done
            </label> <br/>
            <button
                className={'btn btn-danger btn-edit'}
                onClick={deleteTodo}>
                <label>
                    <TrashFill/>
                    Delete
                </label>
            </button>
            <button
                className={'btn btn-primary btn-edit'}
                onClick={updateTodoById}>
                <label>
                    <SaveFill/>
                    Save
                </label>
            </button>
        </div>
    );
};

export default EditTodo;

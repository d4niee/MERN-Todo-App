import React, {FC, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './AddingTodo.css';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Plus, X} from 'react-bootstrap-icons';
import todoService from '../../services/todosService';
import {Todo} from '../../models/Todo';

const AddingTodo: FC = () => {

    const location = useLocation();

    const [todo, setTodo] = useState<Todo>({
        userId: (location.state as LocationState).userId,
        description: '',
        priority: 'medium',
        completed: false
    });

    const navigation = useNavigate();

    /**
     * gets called every time the value for the input
     * field changes
     */
    const onChangeTodoDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            description: e.target.value,
        });
    };

    const onChangePriorityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodo({
            ...todo,
            priority:
                event.target.value === 'high' ? 'high'
                    : event.target.value === 'medium' ? 'medium'
                        : event.target.value === 'low' ? 'low' : 'medium',
        });
    };

    /**
     * Add a new To do with the current value of the
     * input field
     */
    const addNewTodo = () => {
        todoService.addTodo(todo)
            .then(() => {
                toast.success('Added Todo!');
                navigation('/');
            }).catch((err: Error) => {
            console.log(err);
            toast.error(err.message);
            navigation('/');
        });
    };


    const abort = () => {
        navigation('/');
        toast.warn('canceled creating Todo');
    };

    return (
        <div className={'AddingTodo'}>
            <h3>Add a new Todo</h3>
            <input
                className={'form-control'}
                type={'text'}
                placeholder={'description'}
                onChange={onChangeTodoDescription}/>
            <div className={'radio-group'}>
                <h3>Priority</h3>
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
            <button
                disabled={todo.description.trim() === ''}
                className={'btn btn-primary btn-add'}
                onClick={addNewTodo}>
                <label>
                    <Plus/>
                    Create Todo
                </label>
            </button>
            <button
                className={'btn btn-warning btn-add'}
                onClick={abort}>
                <label>
                    <X/>
                    Cancel
                </label>
            </button>
        </div>
    );
};

interface LocationState {
    userId: string;
}

export default AddingTodo;
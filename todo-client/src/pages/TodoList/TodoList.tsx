import React, {FC, useEffect, useState} from 'react';
import './TodoList.css';
import TodoComponent from '../../components/TodoItem/TodoItem';
import {toast, ToastContainer} from 'react-toastify';
import Table from '../../components/Table/Table';
import EmptyTodos from '../../components/EmptyTable/EmptyTodos';
import NavigationBar from '../NavigationBar/NavigationBar';
import todoService from '../../services/todosService';
import {User} from '../../models/User';
import {Todo} from '../../models/Todo';

const TodoList: FC<TodoListProps> = ({user, setLoginUser}: TodoListProps) => {

    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        todoService.getTodosByUserId(user._id)
            .then(res => {
                console.log(res.data);
                setTodos(res.data);
            })
            .catch((err: Error) => {
                console.log(err);
                toast.error(err.message);
            });
    }, [user._id]);

    const todoList = () => todos.map((todo) => (
        <TodoComponent
            key={todo._id}
            todo={todo}
            userId={user._id}
            setTodos={setTodos}
        />
    ));

    return (
        <div className='App'>
            <NavigationBar user={user} setLoginUser={setLoginUser}/>
            <div className={todos.length > 0 ? 'not-empty' : ''}>
                <EmptyTodos user={user}/>
            </div>
            <Table label={'ToDo\'s von ' + user.username}
                   todoLength={todos.length}
                   todoList={todoList}/>
            <ToastContainer
                position='bottom-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme='colored'
            />
        </div>
    );
};

interface TodoListProps {
    user: User;
    setLoginUser: React.Dispatch<React.SetStateAction<User>>;
}

export default TodoList;
import React, {useEffect, useState} from "react";
import './TodoList.css'
import Todo from "../../components/TodoItem/TodoItem";
import {toast, ToastContainer} from "react-toastify";
import Table from "../../components/Table/Table";
import EmptyTodos from "../../components/EmptyTable/EmptyTodos";
import NavigationBar from "../NavigationBar/NavigationBar";
import todoService from "../../services/todosService";

export default function TodoList({user, setLoginUser}) {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
        todoService.getTodosByUserId(user['_id'])
            .then(res => {
                setTodos(res.data);
            })
            .catch(err => {
                console.log(err)
                toast.error(err.message)
            });
    });

    const todoList = () => todos
        .map(
            (todo) => <Todo
                todo={todo}
                userId={user['_id']}
                setTodos={setTodos}/>
        );

    return (
        <div className="App">
            <NavigationBar user={user} setLoginUser={setLoginUser}/>
            <div className={todos.length > 0 ? 'not-empty' : ''}>
                <EmptyTodos user={user}/>
            </div>
            <Table label={"ToDo's von " + user.username}
                   todoLength={todos.length}
                   todoList={todoList}/>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                theme="colored"
            />
        </div>
    );
}
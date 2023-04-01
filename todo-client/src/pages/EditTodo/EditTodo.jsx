import {SaveFill, TrashFill} from "react-bootstrap-icons";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './EditTodo.css';
import {toast} from "react-toastify";
import todoService from "../../services/todosService";

export default function EditTodo() {

    // extract the id from the url /edit/:id
    const {id} = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState({
        userId: '',
        description: '',
        priority: 'medium',
        completed: false
    })

    /**
     * load the to do from the backend with the given id in
     * the url
     */
    useEffect(() => {
        todoService.getTodoById(id)
            .then(res => {
                setTodo({
                    userId: id,
                    description: res["data"].description,
                    priority: res["data"].priority,
                    completed: res["data"].completed
                })
            }).catch(err => {
            console.log(err)
        })
    }, [id])

    const onChangeTodoDescription = (e) => {
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

    const onChangePriorityHandler = event => {
        setTodo({
            ...todo,
            priority: event.target.value,
        });
    };


    const updateTodoById = () => {
        if (todo.description.length > 0) {
            todoService.updateTodo(todo, id)
                .then(res => {
                    console.log("updated Todo successfully!", res)
                    toast.info("updated Todo")
                    navigate('/')
                }).catch(err => {
                navigate('/')
                console.log(err)
                toast.error(err.message)
            });
        }
    }

    const deleteTodo = () => {
        todoService.deleteTodoById(id)
            .then(res => {
                console.log('deleted todo:', res.data);
                toast.info('Deleted Todo')
                navigate('/');
            })
            .catch(err => {
                navigate('/')
                console.log(err)
                toast.error(err.message)
            });
    }

    return (
        <div className={"EditTodo"}>
            <h4>Update Todo:</h4>
            <input
                className={"form-control"}
                type={"text"}
                value={todo.description}
                placeholder="Description"
                onChange={onChangeTodoDescription}/>
            <div className={"radio-group"}>
                <h4>Priority</h4>
                <label>
                    <input
                        type={"radio"}
                        value={"high"}
                        className={"form-check-input radio-btn"}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'high'}/>
                    High
                </label><br/>
                <label>
                    <input
                        type={"radio"}
                        value={"medium"}
                        className={"form-check-input radio-btn"}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'medium'}/>
                    Medium
                </label><br/>
                <label>
                    <input
                        type={"radio"}
                        value={"low"}
                        className={"form-check-input radio-btn"}
                        onChange={onChangePriorityHandler}
                        checked={todo.priority === 'low'}/>
                    Low
                </label><br/>
            </div>
            <label className={"done"}>
                <input
                    className={"form-check-input"}
                    type={"checkbox"}
                    checked={todo.completed}
                    onChange={onChangeTodoCompleted}/>
                mark as done
            </label> <br/>
            <button
                className={"btn btn-danger btn-edit"}
                onClick={deleteTodo}>
                <label>
                    <TrashFill/>
                    Delete
                </label>
            </button>
            <button
                className={"btn btn-primary btn-edit"}
                onClick={updateTodoById}>
                <label>
                    <SaveFill/>
                    Save
                </label>
            </button>
        </div>
    );
}
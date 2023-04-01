import './TodoItem.css';
import {Link} from "react-router-dom";
import {ExclamationCircleFill, PencilSquare, Trash} from "react-bootstrap-icons";
import todoService from "../../services/todosService";

export default function Todo({todo, setTodos, userId}) {

    /**
     * gets an icon corresponding to the given priority
     * @param priority high medium or low
     * @returns {JSX.Element} label with the correct icon
     */
    const getIconForPriorityLevel = (priority) => {
        if (priority === "high") {
            return (
                <label>
                    high
                    <ExclamationCircleFill className={"priority"} color={"#f56464"}/>
                </label>
            );
        } else if (priority === "medium") {
            return (
                <label>
                    medium
                    <ExclamationCircleFill className={"priority"} color={"#f5dd64"}/>
                </label>
            );
        } else {
            return (
                <label>
                    low
                    <ExclamationCircleFill className={"priority"} color={"#989898"}/>
                </label>
            );
        }
    }

    const handleChecked = () => {
        todoService.updateTodo({
            userId: todo.userId,
            description: todo.description,
            priority: todo.priority,
            completed: !todo.completed
        }, todo["_id"]).then(() => {
            todoService.getTodosByUserId(userId)
                .then(res => {
                    setTodos(res.data)
                })
        })
    }

    const deleteTodo = () => {
        todoService.deleteTodoById(todo["_id"])
            .then(() => {
                todoService.getTodosByUserId(userId).then(res => {
                    setTodos(res.data)
                })
            })
    }

    return (
        <tr>
            <td className={"td-done"}>
                <input
                    type={"checkbox"}
                    checked={todo.completed}
                    onChange={handleChecked}/>
            </td>
            <td className={todo.completed
                ? 'completed td-desc' : 'td-desc'}>
                {todo.description}
            </td>
            <td className={"actions"}>
                {getIconForPriorityLevel(todo.priority)}
            </td>
            <td className={"actions"}>
                <Link
                    className={"edit-icons"}
                    to={"/edit/" + todo["_id"]}
                    state={{userId: todo.userId}}>
                    <PencilSquare/>
                </Link>
                <Trash
                    color={"#e51616"}
                    className={"trash-icon"}
                    onClick={deleteTodo}
                />
            </td>
        </tr>
    );
}
import React from "react";
import './Table.css'

/**
 * Table holds the To-do items
 * @param props todoList: list of to-do table entries
 * @returns {JSX.Element}
 */
export default function Table(props) {

    return (
        <div className={props.todoLength > 0 ? 'table-todo' : 'not-empty table-todo'}>
            <h3>{props.label}:</h3>
            <table className={"table table-striped"}>
                <thead>
                <tr>
                    <th>Done</th>
                    <th className={"desc-heading"}>Description</th>
                    <th className={"priority-heading"}>Priority</th>
                    <th className={"action-heading"}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {props.todoList()}
                </tbody>
            </table>
        </div>
    );
}
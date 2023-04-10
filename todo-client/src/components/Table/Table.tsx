import React, {FC} from 'react';
import './Table.css';

/**
 * Table holds the To-do items
 * @param props todoList: list of to-do table entries
 * @returns {JSX.Element}
 */
const Table: FC<TableProps> = ({todoLength, label, todoList}) => {

    return (
        <div className={todoLength > 0 ? 'table-todo' : 'not-empty table-todo'}>
            <h3>{label}:</h3>
            <table className={'table table-striped'}>
                <thead>
                <tr>
                    <th>Done</th>
                    <th className={'desc-heading'}>Description</th>
                    <th className={'priority-heading'}>Priority</th>
                    <th className={'action-heading'}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {todoList()}
                </tbody>
            </table>
        </div>
    );
};

interface TableProps {
    todoLength: number;
    label: string;
    todoList: () => JSX.Element[];
}

export default Table;
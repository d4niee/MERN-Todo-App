import React from "react";
import {Link} from "react-router-dom";
import './EmptyContainer.css'
import {EmojiNeutral} from "react-bootstrap-icons";

/**
 * shown if no to-do elements are found
 * @returns {JSX.Element}
 */
export default function EmptyTodos({user}) {

    return(
        <div className={"empty-container"}>
            <EmojiNeutral id={"emoji-neutral"}/>
            <h1>Nothing to see here ...</h1>
            <div className={"add-new-container"}>
                <h3>Add your first Todo:</h3>
                <Link to={"/add"} state={{userId: user._id}}>
                    <button className={"btn btn-primary btn-add-first"}>
                        Add new Todo
                    </button>
                </Link>
            </div>
        </div>
    );
}
import express, {Request, Response} from 'express';
import TodoModel, {Todo} from '../models/todo.model';
import {CallbackError} from "mongoose";

const todoRoutes = express.Router();

/**
 * Get all To-Dos for a user
 * query: GET localhost:8080/todos/user/{id}
 */
todoRoutes.route('/user/:userId').get((request: Request, response: Response) => {
    TodoModel.find({userId: request.params.userId}, (err: CallbackError, todos) => {
        if (err) {
            console.log(err);
            response.json(err);
        } else {
            response.json(todos);
        }
    });
});


/**
 * Get a To-Do with a specific ID
 * query: GET localhost:8080/todos/{id}
 */
todoRoutes.route('/:id').get((request: Request, response: Response) => {
    const id = request.params.id;
    TodoModel.findById(id, (err: Error, todo: Todo) => {
        response.json(todo);
    });
});

/**
 * Add a new To-do Entry
 * query: POST localhost:8080/todos/
 * body:
 * {
 *     "userId": "<userid>"
 *     "description": "work",
 *     "completed": false
 * }
 */
todoRoutes.route('/add').post((request: Request, response: Response) => {
    const todo = new TodoModel(request.body);
    todo.save()
        .then(todo => {
            console.log(`added new todo: ${todo}`)
            response.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            console.log(`adding new todo failed: ${err}`)
            response.status(400).send('adding new todo failed');
        });
});

/**
 * Updating an existing To do. used to update
 * the completion status or the description
 * query: POST localhost:8080/todos/update/{id}
 */
todoRoutes.route('/update/:id').post((request: Request, response: Response) => {
    TodoModel.findById(request.params.id, (err: Error, todo: any) => {
        if (!todo) {
            response.status(404).send(`Todo is not found!`)
        } else {
            todo.description = request.body.description;
            todo.completed = request.body.completed;
            todo.priority = request.body.priority;
            todo.save().then(() => {
                response.status(200).json({'todo': 'todo updated successfully'});
            }).catch((err: Error) => {
                response.status(400).send(err);
            })
        }
    })
})

/**
 * Deleting a To-Do Entry by ID
 * query: DELETE localhost:8080/todos/{id}
 */
todoRoutes.route('/:id').delete((request: Request, response: Response) => {
    TodoModel.findByIdAndRemove(request.params.id)
        .then((todo) => {
            console.log(`removed todo with id <${todo?.id}>`)
            response.json('Todo deleted successfully');
        })
        .catch(err => {
            console.log(`removing todo failed with error <${err}>`)
            response.status(400).send('Error deleting todo');
        });
});

export default todoRoutes;

const express = require("express");
const Todo = require('../models/todo.model');

const todoRoutes = express.Router();

/**
 * Get all To-Dos for a user
 * query: GET localhost:8080/todos
 */
todoRoutes.route('/user/:userId').get((request, response) => {
    Todo.find({userId: request.params.userId}, (err, todos) => {
        if (err)
            console.log(err);
        else {
            response.json(todos);
        }
    });
});


/**
 * Get a To-Do with a specific ID
 * query: GET localhost:8080/todos/{id}
 */
todoRoutes.route('/:id').get((request, response) => {
    const id = request.params.id;
    Todo.findById(id, (err, todo) => {
        response.json(todo);
    });
});

/**
 * Add a new To-do Entry
 * query: POST localhost:8080/todos/
 * body:
 * {
 *     "description": "work",
 *     "todo_completed": false
 * }
 */
todoRoutes.route('/add').post((request, response) => {
    const todo = new Todo(request.body);
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
todoRoutes.route('/update/:id').post((request, response) => {
    Todo.findById(request.params.id, (err, todo) => {
        if (!todo) {
            response.status(404).send(`Todo is not found!`)
        } else {
            todo.description = request.body.description;
            todo.completed = request.body.completed;
            todo.priority = request.body.priority;
            todo.save().then(() => {
                response.status(200).json({'todo': 'todo updated successfully'});
            }).catch(err => {
                response.status(400).send("Cant update the Todo:", err)
            })
        }
    })
})

/**
 * Deleting a To-Do Entry
 * query: DELETE localhost:8080/todos/{id}
 */
todoRoutes.route('/:id').delete((request, response) => {
    Todo.findByIdAndRemove(request.params.id)
        .then((todo) => {
            console.log(`removed todo with id <${todo.id}>`)
            response.json('Todo deleted successfully');
        })
        .catch(err => {
            console.log(`removing todo failed with error <${err}>`)
            response.status(400).send('Error deleting todo');
        });
});

module.exports = todoRoutes;
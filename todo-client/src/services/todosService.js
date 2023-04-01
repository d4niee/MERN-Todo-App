/**
 * This file contains all HTTP REST Methods
 */
import axios from "axios";

/**
 * Base URL
 * @type {string}
 */
const TODOS_API_BASE_URL = 'http://localhost:3001/todos/'

class TodosService {
    /**
     * returns a list of all Todos from a user
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async getTodosByUserId(userId) {
        return await axios.get(TODOS_API_BASE_URL + '/user/' + userId)
    }

    /**
     * get a single To-Do by ID
     * @param objectId the mongoDB Object ID
     * @returns {Promise<void>}
     */
    async getTodoById(objectId) {
        return await axios.get(TODOS_API_BASE_URL + objectId)
    }

    /**
     *
     * @returns {Promise<axios.AxiosResponse<any>>}
     * @param todo
     */
    async addTodo(todo) {
        console.log(todo)
        return await axios.post(TODOS_API_BASE_URL + 'add',
            {
                userId: todo.userId,
                description: todo.description,
                priority: todo.priority,
                // default is always false
                completed: todo.completed
            }
        )
    }

    /**
     * update an existing To-Do
     * @param todo Object
     * @param objectId The ID of the To-Do
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async updateTodo(todo, objectId) {
        return await axios.post(TODOS_API_BASE_URL + 'update/' + objectId,
            {
                userId: todo.userId,
                description: todo.description,
                priority: todo.priority,
                completed: todo.completed,
            }
        );
    }

    /**
     * Deletes a To-do by its ID
     * @param objectId
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    async deleteTodoById(objectId) {
        return await axios.delete(TODOS_API_BASE_URL + objectId)
    }
}

const todoService = new TodosService()
export default todoService;
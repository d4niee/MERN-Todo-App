/**
 * This file contains all HTTP REST Methods
 */
import axios from 'axios';
import {AxiosResponse} from 'axios';
import {Todo} from '../models/Todo';

/**
 * Base URL
 * @type {string}
 */
const TODOS_API_BASE_URL = 'http://todo-backend:8080/todos/';

class TodosService {
    /**
     * returns a list of all Todos from a user
     * @returns {Promise<axios.AxiosResponse<Todo[]>>}
     */
    async getTodosByUserId(userId: string): Promise<AxiosResponse<Todo[]>> {
        return await axios.get(TODOS_API_BASE_URL + '/user/' + userId);
    }

    /**
     * get a single To-Do by ID
     * @param objectId the mongoDB Object ID
     * @returns {Promise<void>}
     */
    async getTodoById(objectId: string): Promise<AxiosResponse<Todo>> {
        return await axios.get(TODOS_API_BASE_URL + objectId);
    }

    /**
     *
     * @returns {Promise<axios.AxiosResponse<Todo>>}
     * @param todo
     */
    async addTodo(todo: Todo): Promise<AxiosResponse<Todo>> {
        console.log(todo);
        return await axios.post(TODOS_API_BASE_URL + 'add',
            {
                userId: todo.userId,
                description: todo.description,
                priority: todo.priority,
                // default is always false
                completed: todo.completed
            }
        );
    }

    /**
     * update an existing To-Do
     * @param todo Object
     * @param objectId The ID of the To-Do
     * @returns {Promise<axios.AxiosResponse<Todo>>}
     */
    async updateTodo(todo: Todo, objectId: string): Promise<AxiosResponse<Todo>> {
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
     * @returns {Promise<axios.AxiosResponse<Todo>>}
     */
    async deleteTodoById(objectId: string): Promise<AxiosResponse<Todo>> {
        return await axios.delete(TODOS_API_BASE_URL + objectId);
    }
}

const todoService = new TodosService();
export default todoService;
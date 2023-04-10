import axios, {AxiosResponse} from 'axios';
import {User} from '../models/User';

/**

 Base URL
 @type {string}
 */
const LOGIN_API_BASE_URL = 'http://todo-backend:8080/users';

class LoginService {
    /**

     add a new user to the database
     @param user - { username: xy, password: HASH, salt: HASH}
     @returns {Promise<axios.AxiosResponse<User>>}
     */
    async register(user: User): Promise<AxiosResponse<User>> {
        return await axios.post(LOGIN_API_BASE_URL + '/register', user);
    }

    /**

     request to log in a user
     the body contains the username and the plain password
     the verification of the password is handled in the backend
     @param user - { username: xy, password: password }
     @returns {Promise<axios.AxiosResponse<User>>}
     */
    async login(user: User): Promise<AxiosResponse<User>> {
        return await axios.post(LOGIN_API_BASE_URL + '/login', user);
    }
}

const loginService = new LoginService();
export default loginService;
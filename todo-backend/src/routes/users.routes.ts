import express, { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import User, { IUser } from "../models/user.model";

const userRoutes = express.Router();

/**
 * Login an existing user by password and username
 * query: POST localhost:8080/users/login/
 * body:
 * {
 *     "username": "<username>"
 *     "password": "<password>",
 * }
 */
userRoutes.route('/login').post((request: Request, response: Response) => {
    const {username, password} = request.body;
    User.findOne({username: username}, (err: Error, user: IUser) => {
        if (user) {
            /**
             * check if the password is correct then
             * the login is successful
             */
            bcrypt.compare(password, user.password, function (err: Error, result: boolean) {
                if (result) {
                    response.send({message: 'login success', user: user})
                } else {
                    response.status(400).send({message: 'wrong credentials'})
                }
            });
        } else {
            response.status(404).send('not exists');
        }
    })
})

/**
 * Register a new User to the Database
 * body:
 * {
 *     "username": "<username>"
 *     "password": "<password>",
 * }
 */
userRoutes.route('/register').post((request: Request, response: Response) => {
    const {username, password} = request.body;
    User.findOne({username}, (err: Error, user: IUser) => {
        /**
         * If the username or email is already designated in the database
         * abort creating a new user.
         */
        if (user) {
            response.status(400).send({message: 'user already exists!'})
        } else {
            bcrypt.genSalt(10, function (err: Error, salt: string) {
                bcrypt.hash(password, salt, function (err: Error, hash: string) {
                    const user = new User({
                        username: request.body.username,
                        password: hash,
                        salt: salt
                    });
                    user.save()
                        .then((res) => {
                            response.status(200).send(res)
                        })
                })
            });
        }
    })
})

export default userRoutes;
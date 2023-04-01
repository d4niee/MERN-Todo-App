const User = require("../models/user.model");
const express = require("express");
const bcrypt = require('bcryptjs');

const userRoutes = express.Router();

userRoutes.route('/login').post((request, response) => {
    const {username, password} = request.body;
    User.findOne({username: username}, (err, user) => {
        if (user) {
            /**
             * check if the password is correct then
             * the login is successful
             */
            bcrypt.hash(password, user.password, function (err, hash) {
                if (hash === user.password) {
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

userRoutes.route('/register').post((request, response) => {
    const {username, password} = request.body;
    User.findOne({username}, (err, user) => {
        /**
         * If the username or email is already designated in the database
         * abort creating a new user.
         */
        if (user) {
            response.status(400).send({message: 'user already exists!'})
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
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

module.exports = userRoutes;